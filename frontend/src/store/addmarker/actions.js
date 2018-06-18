export const ADD_MARKER = 'ADD_MARKER'

export const addMarker = (pos) => {
    return {
        type : ADD_MARKER,
        pos
    }
}