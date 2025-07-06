import { createSignal } from 'solid-js'
import './App.css'
import { Header } from './Header'
import { translate } from './translator'

function capitaliseFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function getOppositeLang(lang: TranslateLang) {
	return lang === 'american' ? 'english' : 'american'
}

function LanguageName(props: { lang: TranslateLang }) {
	return <span class="language-name">{capitaliseFirstLetter(props.lang)}</span>
}

function App() {
	const [input, setInput] = createSignal('')
	const [output, setOutput] = createSignal('')
	const [error, setError] = createSignal<string | null>(null)
	const [fromLang, setFromLang] = createSignal<TranslateLang>('american')
	const toLang = () => getOppositeLang(fromLang())

	const doTranslate = (e: Event) => {
		e.preventDefault()
		setError(null)

		if (!input().trim()) {
			setError('Please enter a term to translate.')
			setOutput('')
			return
		}

		// const translatedTerm = translateToAmerican(input.value)
		const translatedContent = translate(fromLang(), input())

		if (translatedContent) {
			setOutput(translatedContent)
		} else {
			setError('No translation found.')
			setOutput('')
		}
	}

	return (
		<>
			<Header />

			<h2>
				<p>
					Translating from <LanguageName lang={fromLang()} /> to{' '}
					<LanguageName lang={toLang()} />
				</p>
			</h2>

			<div class="controls">
				<button
					type="button"
					onClick={() => {
						setFromLang(getOppositeLang(fromLang()))
						setOutput('')
					}}
				>
					Swap Languages
				</button>

				<button type="submit" onClick={doTranslate}>
					Translate Pattern
				</button>
			</div>

			{error() && (
				<div class="error-container">
					<strong>Error:</strong> {error()}
				</div>
			)}

			<div class="container">
				<form>
					<textarea
						placeholder="Pattern or URL..."
						onInput={(e) => setInput(e.currentTarget.value)}
					/>
				</form>

				<output>{output() || 'Press the translate button...'}</output>
			</div>
		</>
	)
}

export default App
