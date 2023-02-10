import {getArticles} from "@/utils/contentUtils";
import {getContentProperties} from "@/utils/formatUtils";
import MainTheme from "@/components/MainTheme";

const Home = ({htmlContent}) => {
	const content = htmlContent.map(post => (getContentProperties(post)))

	return (
		<MainTheme>
			<div>I QUIT MY DAY JOB</div>
		</MainTheme>
	)
}

export const getStaticProps = () => getArticles();


export default Home;
