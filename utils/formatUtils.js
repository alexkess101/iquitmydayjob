import {Parser, ProcessNodeDefinitions} from "html-to-react";
import React from "react";

export const toMoney = (amount) => {
    const number = typeof amount === "string" ? parseInt(amount) : amount;
    return number.toLocaleString("en-US", {style: "currency", currency: "USD"});
}

export const toDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${month} / ${day} / ${year}`
}

export const getContentProperties = (htmlContent) => {
    let returnObject = {
        parsedContent: undefined,
        headContent: undefined,
        bodyContent: undefined,
        scriptContent: undefined,
        ctaContent: undefined,
    };

    if (htmlContent) {
        const isValidNode = () => true;

        const processNodeDefinitions = new ProcessNodeDefinitions(React);

        const preprocessingInstructions = [
            {
                shouldPreprocessNode: (node) => node && node.name && node.name === "table",
                preprocessNode: (tableNode) => {
                    preparePreprocessingInstructions(tableNode);
                },
            },
            {
                shouldPreprocessNode: (node) => node?.name === "a",
                preprocessNode: (anchorNode) => {
                    if (anchorNode?.attribs?.href?.startsWith("//") || anchorNode?.attribs?.href?.startsWith("http")) {
                        anchorNode.attribs.target = "_blank";
                        anchorNode.attribs.rel = "noopener";
                    }
                }
            }
        ];

        const processingInstructions = [
            {
                shouldProcessNode: (node) => node.parent && node.parent.name && node.parent.name === "script",
                processNode: (node) => {
                    node.parent.attribs.dangerouslySetInnerHTML = {
                        __html: node.data,
                    };
                },
            },
            {
                shouldProcessNode: () => true,
                processNode: processNodeDefinitions.processDefaultNode,
            },
        ];


        const parsedContent = new Parser().parseWithInstructions(htmlContent, isValidNode, processingInstructions, preprocessingInstructions);
        const headContent = [];
        const scriptContent = [];
        let ctaContent = {};

        const bodyContent = parsedContent.filter((item) => {
            if (item.type === "head") {
                headContent.push(item.props.children);
                return false;
            }

            if (item.type === "script") {
                scriptContent.push(JSON.parse(item.props.dangerouslySetInnerHTML.__html));
                return false;
            }

            if (item.type === "cta") {
                ctaContent = item.props.children;
                return false;
            }

            return true;
        });

        returnObject = {
            parsedContent,
            headContent,
            bodyContent,
            scriptContent,
            ctaContent,
        };
    }

    return returnObject;
};

let tableColumnHeadings = [];
let currentTableIndex = 0;

export const preparePreprocessingInstructions = (tableNode) => {
    if(tableNode) {
        tableColumnHeadings.push({
            tableId: tableColumnHeadings.length + 1,
            labels: [],
        });
        getHeadingNode(tableNode);
        processTableCellNodes(tableNode);
        currentTableIndex++;
    }
};

export const getHeadingNode = (tableNode) => {
    let headingNode = undefined;

    if(tableNode && tableNode.children && tableNode.children.length > 0) {
        tableNode.children.forEach((tableChild) => {
            if(!headingNode && isTag(tableChild, "tr")) {
                headingNode = tableNode;
            } else if(
                !headingNode && (
                    isTag(tableChild, "thead")
                    || isTag(tableChild, "tbody")
                )
            ) {
                headingNode = tableChild;
            }
        });

        if(headingNode && hasChildren(headingNode)) {
            storeHeadingLabels(headingNode);
        }
    }
};

export const hasChildren = (node) => {
    return (node.children && node.children.length > 0);
};

export const isTag = (node, tagName) => {
    return (node.type && node.type === "tag" && node.name === tagName);
};

const extractChildTextNodes = (node, initialValue) => {
    node.children.forEach((nodeChild) => {
        if(nodeChild.type === "tag" && hasChildren(nodeChild)) {
            initialValue += extractChildTextNodes(nodeChild, "");
        } else {
            initialValue += (nodeChild.nodeValue ? nodeChild.nodeValue : "");
        }
    });
    return initialValue;
};

const storeHeadingLabels = (headingNode) => {
    let foundTr = false;
    headingNode.children.forEach((node) => {
        if(!foundTr && isTag(node, "tr") && hasChildren(node)) {
            foundTr = true;
            node.attribs = {
                "data-heading-row": true
            };
            node.children.forEach((trChild) => {
                if(isTag(trChild, "th") || isTag(trChild, "td") && hasChildren(trChild)) {
                    tableColumnHeadings[tableColumnHeadings.length - 1].labels.push(extractChildTextNodes(trChild, ""));
                }
            });
        }
    });
};

const processTableCellNodes = (node) => {
    if(node && hasChildren(node)) {
        node.children.forEach((nodeChild) => {
            if(isTag(node, "tr") && node.attribs && !node.attribs["data-heading-row"]) {
                applyAttributes(node);
            } else if(hasChildren(nodeChild) && !isTag(nodeChild, "table")) {
                processTableCellNodes(nodeChild);
            }
        });
    }
};

const applyAttributes = (node) => {
    let currentTableColumnIndex = 0;
    node.children.forEach((nodeGrandchild) => {
        if(isTag(nodeGrandchild, "td") || isTag(nodeGrandchild, "th")) {
            nodeGrandchild.attribs["data-column-label"] = tableColumnHeadings[currentTableIndex].labels[currentTableColumnIndex++];
            if(currentTableColumnIndex >= tableColumnHeadings[currentTableIndex].labels.length) {
                currentTableColumnIndex = 0;
            }
        }
    });
};
