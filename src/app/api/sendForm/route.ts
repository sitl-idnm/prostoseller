import { NextRequest, NextResponse } from 'next/server'
import { valuesToHtml, sendEmailViaSmtp } from '@/shared/api/mail'
import { sendTelegramMessage, valuesToTelegramText } from '@/shared/api/telegram'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const values: Record<string, string> = body?.values ?? {}
		const to: string = body?.to || process.env.FORM_EMAIL_TO || ''
		const subject: string = body?.subject || 'New form submission'
		const telegramBotToken: string | undefined = body?.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN
		const telegramChatId: string | number | undefined = body?.telegramChatId || process.env.TELEGRAM_CHAT_ID
		if (!to) {
			return NextResponse.json({ ok: false, error: 'No recipient configured' }, { status: 400 })
		}

		const html = valuesToHtml(values)
		const emailRes = await sendEmailViaSmtp({ to, subject, html })

		// Fire Telegram in parallel, but do not fail the whole request if it fails
		let tgRes: { ok: boolean; error?: string } | null = null
		if (telegramBotToken && telegramChatId) {
			const text = `${subject}\n\n${valuesToTelegramText(values)}`
			try {
				tgRes = await sendTelegramMessage({ token: telegramBotToken, chatId: telegramChatId, text })
			} catch (e) {
				tgRes = { ok: false, error: (e as Error).message }
			}
		}

		if (!emailRes.ok) return NextResponse.json({ ...emailRes, telegramOk: tgRes?.ok ?? false, telegramError: tgRes?.error }, { status: 502 })
		return NextResponse.json({ ok: true, emailOk: true, telegramOk: tgRes?.ok ?? false, telegramError: tgRes?.error })
	} catch (err) {
		return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
	}
}
