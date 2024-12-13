import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, services, budget, project_details } = req.body;

    // Check if services is defined and handle it as an array
    const servicesList = Array.isArray(services) 
      ? services.join(', ') 
      : services 
      ? services 
      : 'None';

    // Set up Nodemailer transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Send an email with form data
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `New form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nServices: ${servicesList}\nBudget: ${budget}\nProject Details: ${project_details || 'No details provided'}`,
      });

      // Return success response
      res.status(200).json({ 
        success: true
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).end();
  }
}
