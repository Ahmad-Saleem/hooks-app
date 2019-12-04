import {CHANGE_THEME, FETCH_DATA} from './actions';

export const initialState = {
  user: null,
  theme: {
    mainColor: 'green',
  },
  data: [{
    id: 1,
    text: 'test'
  }],
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case CHANGE_THEME: {
    return {
      ...state,
      theme: action.payload,
    }
  }
  case FETCH_DATA: {
    return {
      ...state,
      data: action.payload,
    }
  }
  default: return state;
  }
}

export default reducer;