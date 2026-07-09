export async function sendEmail(options: { to: string; subject: string; html: string }) {
  console.log(`[Email Mock] To: ${options.to} | Subject: ${options.subject}`);
  return true;
}
