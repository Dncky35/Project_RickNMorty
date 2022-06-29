const { gql } = require("apollo-server-express");

module.exports = gql`
    scalar Upload

    type Origin{
        name:String
        url:String
    }

    type Location{
        name:String
        url:String
    }

    type Character{
        id:Int
        name:String!
        
        location:Location
        image:String
    }

    input CharacterInput{
        name:String!
        image:String!
        location:String!
    }

    type Query{
        GetCharacters(offset:Int, limit:Int, searchname:String):[Character]!
    }

    type Mutation{
        DeleteCharacter(id:Int):String
        EditCharacter(CharacterID:Int, input:CharacterInput):Character
        CreateCharacter(input:CharacterInput):Character!
    }

`;