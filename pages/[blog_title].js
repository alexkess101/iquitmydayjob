import {getContent, generateFilePaths} from "@/utils/contentUtils";
import {getContentProperties} from "@/utils/formatUtils";

const blog_title = ({htmlContent}) => {
    const contentProperties = getContentProperties(htmlContent);

    return (
        <div>{contentProperties.bodyContent}</div>
    )
}

export const getStaticProps = (params) => getContent(params);

export const getStaticPaths = () => generateFilePaths();

export default blog_title;