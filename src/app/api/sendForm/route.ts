import { NextRequest, NextResponse } from 'next/server'
import { valuesToHtml, sendEmailViaSmtp } from '@/shared/api/mail'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const values: Record<string, string> = body?.values ?? {}
		const to: string = body?.to || process.env.FORM_EMAIL_TO || ''
		const subject: string = body?.subject || 'New form submission'
		if (!to) {
			return NextResponse.json({ ok: false, error: 'No recipient configured' }, { status: 400 })
		}

		const html = valuesToHtml(values)
		const res = await sendEmailViaSmtp({ to, subject, html })
		if (!res.ok) return NextResponse.json(res, { status: 502 })
		return NextResponse.json(res)
	} catch (err) {
		return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
	}
}
