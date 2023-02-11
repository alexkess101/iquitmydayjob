import {getArticles} from "@/utils/contentUtils";
import {getContentProperties} from "@/utils/formatUtils";
import MainTheme from "@/components/MainTheme";
import EntryItem from "@/components/EntryItem";

const Home = ({htmlContent}) => {
	const content = htmlContent.map(post => (getContentProperties(post)))

	const sortByDate = (a, b) => (
		new Date(b.scriptContent[0].datePublished) - new Date(a.scriptContent[0].datePublished)
	)

	return (
		<MainTheme>
			<h1>I QUIT MY DAY JOB</h1>

			{content.sort(sortByDate).map((entry, key) => (
				<EntryItem key={key} content={entry.scriptContent[0]}/>
			))}
		</MainTheme>
	)
}

export const getStaticProps = () => getArticles();


export default Home;
