import { AnalysisActionType, ANALYSIS_SET_ERROR, ANALYSIS_SET_SOURCE, ANALYSIS_SET_STATISTICS } from "./analysis-types"

export function setAnalysisResults(tagOccurance: { key: string, value: number }[], commonTagPath: { path: string, value: number }): AnalysisActionType {
    return {
        type: ANALYSIS_SET_STATISTICS,
        payload: {
            tagOccurances: tagOccurance,
            longestMostCommonTagPath: commonTagPath
        }
    };
}

export function setAnalysisError(message: string): AnalysisActionType {
    return { type: ANALYSIS_SET_ERROR, payload: message }
}

export function setAnalysisUrlSource(url: string): AnalysisActionType {
    return { type: ANALYSIS_SET_SOURCE, payload: { type: "url", value: url } }
}

export function setAnalysisFileSource(fileName: string): AnalysisActionType {
    return { type: ANALYSIS_SET_SOURCE, payload: { type: "file", value: fileName } }
}