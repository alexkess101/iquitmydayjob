import styles from "./blogTemplate.module.scss";
import MainTheme from "./MainTheme";
import Content from "./Content";
import {getContentProperties} from "@/utils/formatUtils";
import Spacer from "./Spacer";
import Image from "next/image";

const BlogTemplate = ({htmlContent}) => {
	const contentProperties = getContentProperties(htmlContent)
	const pageContext = contentProperties.scriptContent[0]
	const image = pageContext?.image

	return (
		<MainTheme headContent={contentProperties.headContent}>
			<Content>
				<h1>{pageContext.title}</h1>
				{pageContext?.subTitle && <div className={styles.subTitle}>{pageContext.subTitle}</div>}

				<Spacer amount={"50"}/>

				{image && <Image
					className={styles.headerImage}
					src={image.src}
					alt={image.alt}
					width={image.width}
					height={image.height}
				/>}
				<div className={styles.authorWrapper}>
					<p>{pageContext.author.name}</p>
					<div className={styles.date}>{pageContext.datePublished}</div>
				</div>
			</Content>

			<Content>
				<div className={styles.bodyWrapper}>
					{contentProperties.bodyContent}
				</div>
			</Content>
		</MainTheme>
	);
};

export default BlogTemplate;