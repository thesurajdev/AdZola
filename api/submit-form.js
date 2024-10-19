// /api/submit-form.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, budget, project_details } = req.body;
    const services = JSON.parse(req.body.services || '[]'); // Parse the services array

    // Set up Nodemailer transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER, // Use environment variables
        pass: process.env.GMAIL_PASS, // Gmail password or App Password
      },
    });

    // Send an email with form data
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // Use the sender's email
        to: process.env.GMAIL_USER, // Your email address to receive submissions
        subject: `New form submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Budget: ${budget}
          Project Details: ${project_details}
          Services: ${services.length > 0 ? services.join(', ') : 'None selected'}
        `,
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
