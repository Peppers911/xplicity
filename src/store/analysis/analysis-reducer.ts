import { AnalysisActionType, AnalysisData, ANALYSIS_SET_ERROR, ANALYSIS_SET_SOURCE, ANALYSIS_SET_STATISTICS } from "./analysis-types";


const initialState: AnalysisData = {
    source: null,
    error: null,
    longestMostCommonTagPath: null,
    tagOccurances: null
}

export function analysisReducer(state = initialState, action: AnalysisActionType): AnalysisData {
    switch (action.type) {
        case ANALYSIS_SET_SOURCE:
            return { ...initialState, source: action.payload };
        case ANALYSIS_SET_STATISTICS:
            return { ...state, ...action.payload };
        case ANALYSIS_SET_ERROR:
            return { ...state, error: action.payload };
        default: return state;
    }
}
