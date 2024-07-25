const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const { name, email, words, pdfData, recipientEmail } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: ['abhilash.kusa@avigen.in', 'Murali.sabbineni@avigen.in'],
    subject: 'Avigen Index Form Results',
    text: `Name: ${name}\nEmail: ${email}\nSelected Words: ${words.join(', ')}`,
    attachments: [
      {
        filename: 'AvigenIndexForm.pdf',
        content: pdfData.split('base64,')[1],
        encoding: 'base64'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
