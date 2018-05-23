export const CHANGE_CONTENTS = 'CHANGE_CONTENTS'
export const TOGGLE_COLLAPSED = 'TOGGLE_COLLAPSED'
export const CHANGE = 'CHANGE'
export const TOGGLE = 'TOGGLE'

export const changeContents = (e) => {
  return {
    type: CHANGE_CONTENTS,
    e : e
  }
};

export const toggleCollapsed = (col) => {
  return {
    type: TOGGLE_COLLAPSED,
    col : col
  }
};

export const change = (e) => {
  return {
    type : CHANGE,
    e : e
  }
}
export const toggled = (col) => {
  return {
    type: TOGGLE,
    col : col
  }
}