import path from "path";

const fs = require("fs");

export const generateFilePaths = async (dir = "") => {
    const filepath = path.join(process.cwd(), "content", dir)
    const files = fs.readdirSync(filepath).map(item => ({
        params: {blog_title: item.replace(".html", "")}
    }));

    return {paths: files, fallback: false};
}

export const getContent = async ({params}, dir = "") => {
    const filepath = path.join(process.cwd(), "content" + dir) + "/" + params.blog_title + ".html";
    const fileContent = fs.readFileSync(filepath, "utf8");

    return {
        props: {
            htmlContent: fileContent
        }
    }
}