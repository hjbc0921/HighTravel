export const ADD_MARKER = 'ADD_MARKER'
export const ADDMARKER_SUCCESS = "ADDMARKER_SUCCESS"
export const ADDMARKER_FAIL = "ADDMARKER_FAIL"
export const LOAD_MARKER = "LOAD_MARKER"
export const PATCH_MARKER = "PATCH_MARKER"
export const PATCHMARKER_SUCCESS = "PATCHMARKER_SUCCESS"
export const PATCHMARKER_FAIL = "PATCHMARKER_FAIL"
export const DELETE_MARKER_ROWS = "DELETE_MARKER_ROWS"

export const addMarker = (lat,lng) => {
    return {
        type : ADD_MARKER,
        lat,lng
    }
}

export const addMarkerSuc = () => {
    return {
        type : ADDMARKER_SUCCESS
    }
}

export const addMarkerFail = () => {
    return {
        type : ADDMARKER_FAIL
    }
}

export const loadMarker = (tripMarkers) => {
    return {
        type : LOAD_MARKER,
        tripMarkers
    }
}

export const patchMarker = (updatedRow) => {
    return {
        type : PATCH_MARKER,
        updatedRow
    }
}

export const patchMarkerSuc = () => {
    return {
        type : PATCHMARKER_SUCCESS
    }
}

export const patchMarkerFail = () => {
    return {
        type : PATCHMARKER_FAIL
    }
}

export const deleteMarker = (markIDs) => {
    return {
        type : DELETE_MARKER_ROWS,
        markIDs
    }
}