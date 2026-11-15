import nodemailer from "nodemailer";
import type { CleanLead } from "@/lib/lead";

export type DeliveryResult = {
  configured: string[];
  sent: string[];
  failed: string[];
};

function configuredChannels() {
  const channels: string[] = [];
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) channels.push("telegram");
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.LEAD_EMAIL_FROM &&
    process.env.LEAD_EMAIL_TO
  ) {
    channels.push("email");
  }
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) channels.push("sheets");
  return channels;
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("telegram");
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 3500) }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("telegram");
}

async function sendEmail(lead: CleanLead, text: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.LEAD_EMAIL_FROM;
  const to = process.env.LEAD_EMAIL_TO;
  if (!host || !port || !user || !pass || !from || !to) throw new Error("email");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  await transporter.sendMail({
    from,
    to,
    subject: `Заявка с сайта: ${lead.parentName}`.slice(0, 140),
    text,
  });
}

async function sendSheet(lead: CleanLead, text: string) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) throw new Error("sheets");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ createdAt: new Date().toISOString(), text, ...lead }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("sheets");
}

export async function deliverLead(lead: CleanLead, text: string): Promise<DeliveryResult> {
  const configured = configuredChannels();
  const sent: string[] = [];
  const failed: string[] = [];
  const jobs: Promise<void>[] = [];

  if (configured.includes("telegram")) {
    jobs.push(sendTelegram(text).then(() => void sent.push("telegram"), () => void failed.push("telegram")));
  }
  if (configured.includes("email")) {
    jobs.push(sendEmail(lead, text).then(() => void sent.push("email"), () => void failed.push("email")));
  }
  if (configured.includes("sheets")) {
    jobs.push(sendSheet(lead, text).then(() => void sent.push("sheets"), () => void failed.push("sheets")));
  }

  await Promise.all(jobs);
  return { configured, sent, failed };
}
