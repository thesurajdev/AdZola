// /api/submit-form.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, service, budget, projectDetails } = req.body;

    // Set up Nodemailer transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER, // Use environment variables
        pass: process.env.GMAIL_PASS, // Gmail password or App Password
      },
    });

    // Format the message with all fields
    const message = `
      Name: ${name}
      Email: ${email}
      Services: ${service ? service.join(', ') : 'None'}
      Budget: ${budget}
      Project Details: ${projectDetails || 'No details provided'}
    `;

    // Send an email with form data
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // Use environment variable for sender's email
        to: process.env.GMAIL_USER, // Replace with your email address
        subject: `New form submission from ${name}`,
        text: message,
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error for debugging
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
