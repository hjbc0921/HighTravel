import {initialState} from './selectors'

const addmarker_reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
    return Object.assign({},state,{
    updated: false,
    error : false,
    })
    case 'ADDMARKER_SUCCESS':
    return Object.assign({},state,{
    updated: true,
    error : false,
    })
    case 'ADDMARKER_FAIL':
    return Object.assign({},state,{
    updated: false,
    error : true,
    })
    case 'LOAD_MARKER':
    sessionStorage.setItem('tripMarkers',JSON.stringify(action.tripMarkers))
    return Object.assign({},state,{
    updated: true,
    error : false,
    })
    case 'PATCH_MARKER':
    return Object.assign({},state,{
    updated: false,
    error : false,
    })
    case 'PATCHMARKER_SUCCESS':
    return Object.assign({},state,{
    updated: true,
    error : false,
    })
    case 'PATCHMARKER_FAIL':
    return Object.assign({},state,{
    updated: false,
    error : true,
    })
    case 'DELETE_MARKER_ROWS':
    return Object.assign({},state,{
    updated: false,
    error : false,
    })
    default:
    return state
    }
  };

export default addmarker_reducer
