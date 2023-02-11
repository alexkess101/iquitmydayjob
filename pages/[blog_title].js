import {getContent, generateFilePaths} from "@/utils/contentUtils";
import BlogTemplate from "@/components/BlogTemplate";

const BlogPage = ({htmlContent}) => {
    return (
        <BlogTemplate htmlContent={htmlContent}/>
    )
}

export const getStaticProps = (params) => getContent(params);

export const getStaticPaths = () => generateFilePaths();

export default BlogPage;