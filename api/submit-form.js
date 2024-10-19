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

    // Create a formatted message including all form data
    const servicesList = services ? services.join(', ') : 'No services selected';
    const message = `
      Name: ${name}
      Email: ${email}
      Budget: ${budget}
      Services: ${servicesList}
      Project Details: ${project_details || 'No details provided'}
    `;

    // Send an email with form data
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // Use the sender email from environment variables
        to: process.env.GMAIL_USER, // Replace with your receiving email
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
