import { createSignal } from 'solid-js'
import './App.css'
import { translate } from './translator'
import { Header } from './Header'

function capitaliseFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function getOppositeLang(lang: TranslateLang) {
	return lang === 'american' ? 'english' : 'american'
}

function LanguageName(props: { lang: TranslateLang }) {
	return <span class="languageName">{capitaliseFirstLetter(props.lang)}</span>
}

function App() {
	const [input, setInput] = createSignal('')
	const [output, setOutput] = createSignal('')
	const [fromLang, setFromLang] = createSignal<TranslateLang>('american')
	const toLang = () => getOppositeLang(fromLang())

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
			<Header />

			<h2>
				<p>
					Translate from <LanguageName lang={fromLang()} /> to{' '}
					<LanguageName lang={toLang()} />
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
