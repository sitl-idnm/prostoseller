export function valuesToTelegramText(values: Record<string, string>): string {
	return Object.entries(values)
		.map(([k, v]) => `${k}: ${String(v)}`)
		.join('\n')
}

export async function sendTelegramMessage(params: {
	token: string
	chatId: string | number
	text: string
}): Promise<{ ok: boolean; error?: string }> {
	try {
		const res = await fetch(`https://api.telegram.org/bot${params.token}/sendMessage`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				chat_id: params.chatId,
				text: params.text
			})
		})
		const data = await res.json().catch(() => null)
		if (!res.ok || (data && data.ok === false)) {
			const description = data?.description || res.statusText
			return { ok: false, error: String(description) }
		}
		return { ok: true }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}
