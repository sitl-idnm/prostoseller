import nodemailer from 'nodemailer'

export type SendEmailParams = {
	to: string
	subject: string
	html: string
	from?: string
}

// Resend support removed

export function valuesToHtml(values: Record<string, string>): string {
	return Object.entries(values)
		.map(([k, v]) => `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v))}</p>`)
		.join('')
}

export async function sendEmailViaSmtp({ to, subject, html, from }: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
	const host = process.env.SMTP_HOST
	const portRaw = process.env.SMTP_PORT
	const user = process.env.SMTP_USER
	const pass = process.env.SMTP_PASS
	if (!host || !portRaw || !user || !pass) return { ok: false, error: 'Missing SMTP config' }
	const port = Number(portRaw)
	const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465
	const transporter = nodemailer.createTransport({
		host,
		port,
		secure,
		auth: { user, pass }
	})

	const sender = from || process.env.FORM_EMAIL_FROM || user

	try {
		await transporter.sendMail({ from: sender, to, subject, html })
		return { ok: true }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

function escapeHtml(input: string): string {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}
