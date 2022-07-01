import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import './App.css';
import HeadBar from './Components/HeadBar';
import CharacterList from './Components/CharacterList';
import { Character } from './Models/Characters';

const GET_CHARATERS_QUERY = gql`
  query getCharacters($offset: Int, $limit: Int, $searchname: String){
    GetCharacters (offset: $offset, limit: $limit, searchname: $searchname){
      _id
      name
      image
      location {
        name
      }
    }
}`;

type Result = {
  GetCharacters:Character[]
};

function App() {

  // HOOKS
  const [filterValue, setFilterValue] = useState<string>(() => {
    return " ";
  });
  const [isShownCreateCard, SetIsShownCreateCard] = useState(() => {return false});
  const [isShownEditCard, SetIsShownEditCard] = useState(() => {return false});
  const {data, loading, fetchMore, refetch} = useQuery<Result>(GET_CHARATERS_QUERY, {
    variables:{
      limit:20,
      offset:0,
      searchname:filterValue
    }
  });

  useEffect(() => {
    refetch({offset:0});
  },[filterValue, refetch]);

  const handleReFetch = (offsetVal:number) => {

    const rem = offsetVal % 20;
    var quo = (offsetVal-rem)/20;

    refetch({limit:(quo+1)*20});
  }

  return (
  <div className="App">
    <HeadBar filterValue={filterValue} setFilterValue={setFilterValue} isShownCreateCard={isShownCreateCard}  isShownEditCard={isShownEditCard}
    SetIsShownCreateCard={SetIsShownCreateCard} handleReFetch={handleReFetch} />
    {loading ? (
      <h1>Loading...</h1>
    ):(
      <div>
        <CharacterList CharacterList={data?.GetCharacters || []} handleReFetch={handleReFetch} isShownCreateCard={isShownCreateCard}
        isShownEditCard={isShownEditCard} SetIsShownEditCard={SetIsShownEditCard} 
        OnLoadMore={() => fetchMore({
        variables: {
        offset: data?.GetCharacters.length 
        },
        })}/>
      </div>
    )}
  </div>
  );
}

export default App;
