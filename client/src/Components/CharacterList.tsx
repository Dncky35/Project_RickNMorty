import React, { useRef, useState } from 'react';
import "./CharacterCard.css"
import { Character } from '../Models/Characters';
import CharacterCard from './CharacterCard';
import PopUpCard from './PopUpCard';

type HolderCharacters = {
    CharacterList: Character[];
    OnLoadMore: any;
    handleReFetch: (offsetVal: number) => void
    isShownCreateCard:boolean;
    isShownEditCard: boolean;
    SetIsShownEditCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const CharacterList = ({CharacterList, OnLoadMore, handleReFetch, 
    isShownEditCard, isShownCreateCard, SetIsShownEditCard }:HolderCharacters) => {

    const [character, Setcharacter] = useState<Character>(() => {
        return {
            id: "",
            image:"",
            location:{name:""},
            name:""
        }
    });
    const listInnerRef = useRef() as React.MutableRefObject<HTMLInputElement>; 

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        if (scrollTop + clientHeight === scrollHeight) {
            console.log("reached bottom");
            OnLoadMore();
        }
        }
    };

    return (
    <div className='CardList'>
        <div ref={listInnerRef} onScroll={onScroll} style={{ height: window.innerHeight-50, overflowY: "scroll" }}>
            {CharacterList.map((character, index) => (
                <CharacterCard key={character.id} Character={character} isShownCreateCard={isShownCreateCard} isShownEditCard={isShownEditCard}
                index={index+1} SetIsShown={SetIsShownEditCard} Setcharacter={Setcharacter}
                />
            ))}
        </div>
        {isShownEditCard && (
         <div className='PopUp'>
            <PopUpCard character={character} SetIsShown={SetIsShownEditCard} 
            isCreateCard={false} handleReFetch={handleReFetch}/>
       </div>
      )}
    </div>
    )
}

export default CharacterList


