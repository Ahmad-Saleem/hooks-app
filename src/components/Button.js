import React, { useContext } from 'react';
import { StoreContext, DispatchContext } from '../contexts';
import {changeTheme} from '../contexts/actions';

export default function Button(props){

  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const {theme} = state;
  return(
    <button style={{backgroundColor: theme.mainColor}} onClick={() => dispatch(changeTheme({
      mainColor: theme.mainColor === 'red' ? 'green' : 'red',
    }))}> {props.children} </button>
  )
}