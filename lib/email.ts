import nodemailer from 'nodemailer';
import { appEnv } from './env';
const transporter = nodemailer.createTransport({ host: appEnv.smtp.host, port: appEnv.smtp.port, secure: appEnv.smtp.port===465, auth: { user: appEnv.smtp.user, pass: appEnv.smtp.pass } });
export const sendNotificationEmail = async (subject: string, lines: string[]) => transporter.sendMail({ from: appEnv.smtp.from, to: appEnv.smtp.to, subject, text: lines.join('\n') });
