import nodemailer from "nodemailer";

export const emailSignUp = async (data) => {
  const { email, name, token } = data;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: '"IT Jobs" <accounts@itjobs.com>',
    to: email,
    subject: '"IT Jobs - Confirm your account',
    text: "Confirm your account in IT Jobs",
    html: `<p>Hi, ${name} confirm your IT Jobs account</p>
            <p>Your account is almost ready, you just have to click on the following link:</p>
            <a href="${process.env.FRONTEND_URL}/confirmaccount/${token}">
              Confirm account
            </a>
            <p>If you didn't create this account, just ignore the message</p>`,
  });
};
