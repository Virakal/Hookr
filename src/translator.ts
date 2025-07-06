import { terms } from './terms'

const SENTINEL = '⁐~⁐'

export function translate(fromLang: TranslateLang, text: string): string {
	const fromKey = fromLang === 'american' ? 1 : 0
	const toKey = fromLang === 'american' ? 0 : 1

	// TODO: is_url(text) - fetch
	// TODO: is_pdf_url(text) - fetch and translate pdf

	for (const term of terms) {
		const fromRegex = new RegExp(`\\b${term[fromKey]}\\b`, 'gi')
		const toReplace = term[toKey].split('').join(SENTINEL)
		text = text.replace(fromRegex, toReplace)
	}

	text = text.replaceAll(SENTINEL, '')
	return text
}
