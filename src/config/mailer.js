import nodemailer from "nodemailer";
import { env } from "./env.js";

const hasSmtpConfig = Boolean(env.MAIL_HOST && env.MAIL_PORT && env.MAIL_USER && env.MAIL_PASS);

const transporter = hasSmtpConfig
    ? nodemailer.createTransport({
          host: env.MAIL_HOST,
          port: Number(env.MAIL_PORT),
          secure: Number(env.MAIL_PORT) === 465,
          auth: {
              user: env.MAIL_USER,
              pass: env.MAIL_PASS
          }
      })
    : nodemailer.createTransport({
          jsonTransport: true
      });

export const sendPasswordResetMail = async ({ to, resetLink }) => {
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Restablecer contraseña</h2>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Este enlace expira en 1 hora.</p>
            <a href="${resetLink}" style="display:inline-block;padding:10px 18px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">Restablecer contraseña</a>
            <p>Si no solicitaste este cambio, podés ignorar este correo.</p>
        </div>
    `;

    return transporter.sendMail({
        from: env.MAIL_FROM,
        to,
        subject: "Recuperación de contraseña",
        html
    });
};
