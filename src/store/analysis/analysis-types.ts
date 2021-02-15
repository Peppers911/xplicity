import { Action } from "redux";

export const ANALYSIS_SET_SOURCE = "ANALYSIS_SET_SOURCE";
export const ANALYSIS_SET_STATISTICS = "ANALYSIS_SET_STATISTICS";
export const ANALYSIS_SET_ERROR = "ANALYSIS_SET_ERROR";

export interface AnalysisSource {
    type: 'file' | 'url',
    value: string
}

export interface AnalysisData {
    source: AnalysisSource | null,
    tagOccurances: { key: string, value: number }[] | null,
    longestMostCommonTagPath: { path: string, value: number } | null,
    error: string | null,
}

interface SetAnalysisDataSource extends Action {
    type: typeof ANALYSIS_SET_SOURCE,
    payload: AnalysisSource
}

interface SetAnalysisResults extends Action {
    type: typeof ANALYSIS_SET_STATISTICS,
    payload: {
        tagOccurances: { key: string, value: number }[],
        longestMostCommonTagPath: { path: string, value: number },
    },
}

interface SetAnalysisError extends Action {
    type: typeof ANALYSIS_SET_ERROR,
    payload: string,
}

export type AnalysisActionType = SetAnalysisResults | SetAnalysisError | SetAnalysisDataSource;