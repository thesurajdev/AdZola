import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, services, budget, project_details } = req.body;

    // Check if services is defined and handle it as an array
    const servicesList = Array.isArray(services) 
      ? services.join(', ') 
      : services 
      ? services 
      : 'None'; // In case services is not selected at all

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
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Change this to your email address
        subject: `New form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nServices: ${servicesList}\nBudget: ${budget}\nProject Details: ${project_details || 'No details provided'}`,
      });

      // Redirect to the thank-you page
      res.writeHead(302, { Location: 'https://www.adzola.in/thank-you.html' });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
