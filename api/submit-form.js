// /api/submit-form.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, project_details, budget, services } = req.body;

    // Set up Nodemailer transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER, // Use environment variables
        pass: process.env.GMAIL_PASS, // Gmail password or App Password
      },
    });

    // Prepare the email content
    const serviceList = services ? services.join(', ') : 'No services selected';
    const message = `Project Details: ${project_details || 'N/A'}
Budget: ${budget || 'N/A'}
Services: ${serviceList}`;

    // Send an email with form data
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // Use the same email used for auth
        to: 'suraj.k@fortune-it.com', // Change this to your email
        subject: `New form submission from ${name}`,
        text: `Message from ${name} (${email}):\n\n${message}`,
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error); // Log error for debugging
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
