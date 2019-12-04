export const CHANGE_THEME = 'CHANGE_THEME';
export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  }
}

export const FETCH_DATA = 'FETCH_DATA';
export const fetchData = (data) => {
  return {
    type: FETCH_DATA,
    payload: data,
  }
}