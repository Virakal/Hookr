import { terms } from './terms'

const SENTINEL = '⁐~⁐'

function isValidUrl(str: string): boolean {
	try {
		const url = new URL(str)
		return Boolean(url.protocol.match(/^https?/i))
	} catch {
		return false
	}
}

export async function translate(
	fromLang: TranslateLang,
	text: string,
): Promise<string> {
	const fromKey = fromLang === 'american' ? 1 : 0
	const toKey = fromLang === 'american' ? 0 : 1

	if (isValidUrl(text.trim())) {
		const url = text.trim()
		const response = await fetch(`https://api.cors.lol/?url=${url}`)
		const responseText = await response.text()
		const ele = document.createElement('html')
		ele.innerHTML = responseText
		text = ele.querySelector('body')?.innerText || 'Failed to find contents'
	}

	// TODO: is PDF url

	for (const term of terms) {
		const fromRegex = new RegExp(`\\b${term[fromKey]}\\b`, 'gi')
		const toReplace = term[toKey].split('').join(SENTINEL)
		text = text.replace(fromRegex, toReplace)
	}

	text = text.replaceAll(SENTINEL, '')
	return text
}
