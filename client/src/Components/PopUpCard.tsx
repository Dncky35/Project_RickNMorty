import { gql, useMutation } from '@apollo/client';
import React, { useRef, useState } from 'react'
import { Character } from '../Models/Characters';
import './PopUpCard.css'
import storage from '../firebaseConfig'
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage"


interface Definer{
    character: Character;
    SetIsShown: React.Dispatch<React.SetStateAction<boolean>>;
    isCreateCard: boolean;
    handleReFetch: () => void;
}

const DELETE_CHARACTER = gql`
    mutation DeleteAccount($deleteCharacterId: Int){
        DeleteCharacter(id: $deleteCharacterId)
    }
`;

const CREATE_CHARACTER = gql`
    mutation CreateCharacter($input: CharacterInput){
        CreateCharacter(input: $input) {
        id
        }
    }`
;

const EDIT_CHARACTER = gql`
    mutation EditCharacter($characterId: Int, $input: CharacterInput){
    EditCharacter (CharacterID: $characterId, input: $input){
            name
        }
    }
`;

const PopUpCard = ({character, isCreateCard, SetIsShown, handleReFetch}:Definer) => {

    const [CharacterName, SetCharacterName] = useState(() => {
        return character.name;
    });
    const [LocationName, SetLocationName] = useState(() => {
        return character.location.name;
    });

    const fileRef = useRef<HTMLInputElement>(null);
    
    const[ImageURL, SetImageURL] = useState(() => {
        if(!isCreateCard){
            return character.image
        }
        else{
            return "https://raw.githubusercontent.com/Laboratoria/rick-and-morty-images/master/images/66.jpeg";
        }
    });

    const [DeleteAccount] = useMutation<{DeleteAccount:String}>(DELETE_CHARACTER, {
        variables:{deleteCharacterId:character.id}});
    const [CreateCharacter] = useMutation<{CreateCharacter:Character}>(CREATE_CHARACTER, {
        onError: (err) => window.alert(err),
        variables:{
            input:{
                name:CharacterName,
                image:ImageURL,
                location:LocationName
            }
    }});
    const [EditCharacter] = useMutation<{EditCharacter:Character}>(EDIT_CHARACTER, {
        onError: (err) => window.alert(err),
        variables:{
        characterId:character.id,
        input:{
            name:CharacterName,
            image:ImageURL,
            location:LocationName
        }
    }});

    const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        DeleteAccount();
        SetIsShown(false);
        handleReFetch();
    }

    const handleCreateCharacter = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        CreateCharacter();
        SetIsShown(false);
        handleReFetch();
    }

    const handleEditCharacter = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        EditCharacter();
        handleReFetch();
    }

    const handleUploadImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const Image = event.target.files[0];

            if(Image){
                const storageRef = ref(storage, `/files/${Image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, Image);
    
                uploadTask.on(
                    "state_changed",
                    () => {
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        SetImageURL(url);
                        });
                    },
                    (err) => console.log(err)
                )
            }
            else{
                alert("No Image");
            }
        }
    };

    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => { 
        event.preventDefault();
        fileRef.current?.click();
    };

    return (
        <div className='PopUpCard'>
            <div>
            {!isCreateCard && (
                <button className='PopButton' type='button' value={character.id} onClick={handleDeleteAccount} style={{float:"left"}} >DELETE</button>
            )}
            <button className='PopButton' type='button' onClick={(e) => SetIsShown(false)} style={{float:"right"}}>X</button>
            {!isCreateCard && (
                <img className='PopImage' src={ImageURL} alt="character" />
            )}
            </div>
            {isCreateCard && (
                <img className='PopImage' src={ImageURL} alt="character" />
            )}
    
            <button className='PopButtonImageUpload' onClick={(e) => handleClick(e)}>Upload Image</button>
            <input ref={fileRef} onChange={handleUploadImage} multiple={false} type="file"  accept='image/*' hidden />

            <div className='InputArea'><label className='PopBody'>Name:</label><input className='PopInput' value={CharacterName} onChange={(e) => SetCharacterName(e.target.value)} /></div> 
            <div className='InputArea'><label className='PopBody'>Location:</label><input className='PopInput' value={LocationName} onChange={(e) => SetLocationName(e.target.value)} /></div>
            {!isCreateCard && (
                <button className='PopButtonSave' onClick={handleEditCharacter} >SAVE</button>
            )}
            {isCreateCard && (
            <button className='PopButtonSave' onClick={handleCreateCharacter} >Create A Character</button>
            )}
            
        </div>
    )
}

export default PopUpCard
