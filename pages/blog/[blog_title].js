import {getContent, generateFilePaths} from "@/utils/contentUtils";
import {getContentProperties} from "@/utils/formatUtils";

const blog_title = ({htmlContent}) => {
    const contentProperties = getContentProperties(htmlContent);

    return (
        <div>{contentProperties.bodyContent}</div>
    )
}

export const getStaticProps = (params) => getContent(params, "/blog");

export const getStaticPaths = () => generateFilePaths("/blog");

export default blog_title;