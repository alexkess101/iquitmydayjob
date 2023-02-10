import '@/styles/globals.css'
import {Source_Code_Pro} from "@next/font/google";

const sourceCodePro = Source_Code_Pro({subsets: ["latin"]})

export default function App({ Component, pageProps }) {
	return (
		<main className={sourceCodePro.className}>
			<Component {...pageProps} />
		</main>
	)
}
