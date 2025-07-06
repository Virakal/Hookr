export const terms: TermDefinition[] = [
	['double crochet', 'single crochet'],
	['dc', 'sc'],
	['half treble', 'half double crochet'],
	['htr', 'hdc'],
	['treble', 'double crochet'],
	['tr', 'dc'],
	['double treble', 'treble'],
	['dtr', 'tr'],
	['triple treble', 'double treble'],
	['trtr', 'dtr'],
	['miss', 'skip'],
	['tension', 'gauge'],
	['yarn over hook', 'yarn over'],
	['yoh', 'yo'],
]

export function translateToAmerican(
	term: EnglishTerm,
): AmericanTerm | undefined {
	const found = terms.find(([english]) => english === term)
	return found ? found[1] : undefined
}

export function translateToEnglish(
	term: AmericanTerm,
): EnglishTerm | undefined {
	const found = terms.find(([, american]) => american === term)
	return found ? found[0] : undefined
}
