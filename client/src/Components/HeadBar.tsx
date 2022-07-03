import React from 'react'
import PopUpCard from './PopUpCard';
import "./HeadBar.css"
import {Character} from "../Models/Characters"

interface definer{
    filterValue:string;
    setFilterValue:React.Dispatch<React.SetStateAction<string>>;
    handleReFetch: (offsetVal: number) => void
    isShownCreateCard:boolean;
    isShownEditCard:boolean;
    SetIsShownCreateCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadBar:React.FC<definer> = ({filterValue, setFilterValue, handleReFetch, 
  isShownCreateCard, SetIsShownCreateCard, isShownEditCard}) => {

  const character:Character =  {
        _id: "",
        image:"",
        location:{name:""},
        name:""
  };


  const handleShownCreateCard = () => {
    if(isShownEditCard){
      return
    }
    SetIsShownCreateCard(true);
  } 

  const handleChangeFilterValue = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setFilterValue(event.target.value);
  }

  return (
    <div className='TopBar'>
      <label className="TopHeader">Rick and Morty</label>
      <select name="filter" id="filter"  disabled={isShownCreateCard || isShownEditCard} className="TopFilter" value={filterValue} onChange={(event) => handleChangeFilterValue(event)}>
        <option value="">All Characters</option>
        <option value="Rick">Rick</option>
        <option value="Morty">Morty</option>
      </select>
      <button type='button' className='TopButton' onClick={handleShownCreateCard} >Create A Character</button>
      <div>
      {isShownCreateCard && (
         <div className='PopUp'>
            <PopUpCard character={character} SetIsShown={SetIsShownCreateCard} isCreateCard={true} index={0}
            handleReFetch={handleReFetch} />
       </div>
      )}
      </div>
    </div>
  )
}

export default HeadBar
