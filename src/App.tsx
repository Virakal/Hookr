import { createSignal } from 'solid-js'
import './App.css'
import { translate } from './translator'

function getOppositeLang(lang: TranslateLang) {
	return lang === 'american' ? 'english' : 'american'
}

function App() {
	const [input, setInput] = createSignal('')
	const [output, setOutput] = createSignal('')
	const [fromLang, setFromLang] = createSignal<TranslateLang>('american')
	const toLang = () => getOppositeLang(fromLang())

	const capitaliseFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	const doTranslate = (e: Event) => {
		e.preventDefault()

		if (!input().trim()) {
			setOutput('Please enter a term to translate.')
			return
		}

		// const translatedTerm = translateToAmerican(input.value)
		const translatedTerm = translate(fromLang(), input())

		if (translatedTerm) {
			setOutput(`Translated: ${translatedTerm}`)
		} else {
			setOutput('No translation found.')
		}
	}

	return (
		<>
			<h1>Hookr</h1>

			<h2>
				<p>
					Translate from {capitaliseFirstLetter(fromLang())} to{' '}
					{capitaliseFirstLetter(toLang())}
				</p>
				<button
					type="button"
					onClick={() => {
						setFromLang(getOppositeLang(fromLang()))
						setOutput('')
					}}
				>
					Swap
				</button>
			</h2>

			<form>
				<input
					type="text"
					placeholder="Pattern or URL..."
					onInput={(e) => setInput(e.currentTarget.value)}
				/>

				<button type="submit" onClick={doTranslate}>
					Translate
				</button>
			</form>

			<output>{output()}</output>
		</>
	)
}

export default App
