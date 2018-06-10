export const ADD_MARKER = 'ADD_MARKER'

export const addMarker = (pos) => {
    console.log(pos)
    return {
        type : ADD_MARKER,
        pos
    }
}