import React, {useContext, useState, useEffect, useCallback} from 'react';
import Button from '../components/Button';
import List from '../components/List';
import { StoreContext, DispatchContext } from '../contexts';
import {fetchData} from '../contexts/actions';

import {Users, OnlineUsers} from './Users'

const postsApiUrl = 'https://jsonplaceholder.typicode.com/posts';
const todosApiUrl = 'https://jsonplaceholder.typicode.com/todos';

export default function Home(){

  const {data} = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  const [query, setQuery] = useState(todosApiUrl);

  useEffect(() => {
    fetch(query)
      .then(response => response.json())
      .then(data => data.map(elm => {
        return {
          id: elm.id,
          text: elm.title,
        }
      }))
      .then(data => dispatch(fetchData(data)));
      setMemo(++memo)
  }, [query]);
    
  let [memo, setMemo] = useState(0);
  let counter = 0;

  const handleClick = useCallback((e) => {
      counter++;
    console.table(query, counter);
  }, [query, memo]);

  return(
    <div>
      <h1>Home</h1>
        {/* <div>
            <Users />
        </div> */}
        <div>
            <OnlineUsers />
        </div>
      <Button>Test</Button>
      <button onClick={() => setQuery(postsApiUrl)}>Get Posts</button>
      <button onClick={() => setQuery(todosApiUrl)}>Get Todos</button>
      <hr />
      <button onClick={handleClick}>
          Test Callback hook
      </button>
      <h2>TODOs</h2>
      <List data={[...data]} />
    </div>
  )
}