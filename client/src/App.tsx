import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import './App.css';
import HeadBar from './Components/HeadBar';
import CharacterList from './Components/CharacterList';
import { Characters } from './Models/Characters';

const GET_CHARATERS_QUERY = gql`
query getChars($pageNumber: Int, $searchname: String, $limit: Int){
  GetCharacters(pageNumber: $pageNumber, limit: $limit,searchname: $searchname) {
   Info {
     currentPage
     TotalPage
   }
   Result {
     _id
     name
     image
     location {
       name
     }
   }
   }
}
`;

type Result = {
  GetCharacters:Characters
};

function App() {

  // HOOKS
  const [filterValue, setFilterValue] = useState<string>(() => {
    return "";
  });

  const [isShownCreateCard, SetIsShownCreateCard] = useState(() => {return false});
  const [isShownEditCard, SetIsShownEditCard] = useState(() => {return false});
  const {data, loading, refetch, fetchMore} = useQuery<Result>(GET_CHARATERS_QUERY, {
    variables:{
      pageNumber:1,
      searchname:filterValue,
      limit:20
    }
  });

  useEffect(() => {
    refetch({pageNumber:1});
  },[filterValue, refetch]);

  const handleReFetch = (offsetVal:number) => {

    const rem = offsetVal % 20;
    var quo = (offsetVal-rem)/20;
    refetch({limit:(quo+1)*20});
  }

  const OnLoadMore = () => {
    if(data && data.GetCharacters.Info.currentPage <= data.GetCharacters.Info.TotalPage)
    fetchMore({variables:{
      pageNumber:data.GetCharacters.Info.currentPage+1
    }});

  };


  return (
  <div className="App">
    <HeadBar filterValue={filterValue} setFilterValue={setFilterValue} isShownCreateCard={isShownCreateCard}  isShownEditCard={isShownEditCard}
    SetIsShownCreateCard={SetIsShownCreateCard} handleReFetch={handleReFetch} />
    {loading ? (
      <h1>Loading...</h1>
    ):(
      <div>
        <CharacterList CharacterList={data?.GetCharacters.Result || []} handleReFetch={handleReFetch} isShownCreateCard={isShownCreateCard}
        isShownEditCard={isShownEditCard} SetIsShownEditCard={SetIsShownEditCard}
        OnLoadMore={OnLoadMore}/>
      </div>
    )}
  </div>
  );
}

export default App;
