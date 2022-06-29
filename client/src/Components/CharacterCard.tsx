import React from 'react'
import { Character } from '../Models/Characters';
import "./CharacterCard.css"

interface Results{
    Character: Character;
    SetIsShown: React.Dispatch<React.SetStateAction<boolean>>;
    Setcharacter: React.Dispatch<React.SetStateAction<Character>>;
    index: number;
    isShownCreateCard:boolean;
    isShownEditCard:boolean;
  }

const CharacterCard = ({Character, index, SetIsShown, Setcharacter, isShownCreateCard, isShownEditCard}:Results) => {

  const handleCardClick = () => {
    if(isShownCreateCard || isShownEditCard){
      return
    }

    SetIsShown(true);
    Setcharacter(Character);
  }

  return (
    <div className="CardColumn">
        <div className='Card' onClick={handleCardClick}> 
          <h1 style={{float:"left"}}><b>#{index}</b></h1>
          <img src={Character.image} alt="character"/> 
          <h4><b>{Character.name}</b></h4>
        </div>
    </div>
  )
}

export default CharacterCard
