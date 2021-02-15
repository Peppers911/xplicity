import { filter, first, flatten, join, orderBy, reduce, toPairs } from "lodash";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../default";
import { setAnalysisError, setAnalysisFileSource, setAnalysisResults, setAnalysisUrlSource } from "./analysis-actions";
import { AnalysisActionType } from "./analysis-types";

export const analysisForUrl = (url: string): ThunkAction<void, RootState, unknown, AnalysisActionType> => async dispatch => {
    dispatch(setAnalysisUrlSource(url));
    try {
        new URL(url);
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`Failed to load url with erro: ${response.statusText}`);

        const text = await response.text();
        const contentType = first(response.headers.get("Content-Type")?.split(';')) as DOMParserSupportedType;
        dispatch(parse(text, contentType));
    } catch (error) {
        dispatch(setAnalysisError(error.message));
    }
}

export const analysisForFile = (file: File): ThunkAction<void, RootState, unknown, AnalysisActionType> => async dispatch => {
    dispatch(setAnalysisFileSource(file.name));
    try {
        const text = await file.text()
        const contentType = file.type as DOMParserSupportedType;
        dispatch(parse(text, contentType));
    } catch (error) {
        dispatch(setAnalysisError(error.message));
    }
}

function parse(data: string, type: DOMParserSupportedType): AnalysisActionType {
    const rootDocument = (new DOMParser()).parseFromString(data, type || 'text/xml');
    const paths = traverse(rootDocument);

    const cache: { [name: string]: number } = {};
    rootDocument.childNodes.forEach(node => uniqueTags(node, cache));

    const tagUsage = orderBy(toPairs(cache).map(prop => ({ key: prop[0], value: prop[1] })), ['value', 'key'], ['desc', 'asc']);
    const mostCommonTag = first(tagUsage)?.key;

    const pathss = paths.map(parts => ({ path: join(parts, '/'), value: filter(parts, part => part == mostCommonTag).length }));

    const longestMostCommonTagPath = reduce(pathss, (result, value) => {
        if (result.value > value.value)
            return result;

        if (result.value < value.value)
            return value;

        return result.path.length > value.path.length ? result : value;
    }, {
        path: "",
        value: 0
    });

    return setAnalysisResults(tagUsage, longestMostCommonTagPath);
}

function uniqueTags(node: ChildNode, cache: { [name: string]: number }): void {
    filter(node.childNodes, child => child.nodeType == Node.ELEMENT_NODE).forEach(child => uniqueTags(child, cache));
    cache[node.nodeName] = (cache[node.nodeName] || 0) + 1;
}

function traverse(node: ChildNode | Document): string[][] {
    const children = filter(node.childNodes, child => child.nodeType == Node.ELEMENT_NODE);
    if (children.length == 0) return [[node.nodeName]];

    const pathsOfEachChild = children.map(traverse);

    const flatListOfPaths = pathsOfEachChild.reduce((flat, branch) => flat.concat(branch));
    return flatListOfPaths.map(path => [node.nodeName].concat(path));
}