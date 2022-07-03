const { gql } = require("apollo-server");

module.exports = gql`

    type Origin{
        name:String
        url:String
    }

    type Location{
        name:String
        url:String
    }

    type ResultInfo{
        currentPage:Int
        TotalPage:Int
    }

    type Character{
        _id:String!
        id:Int
        name:String!
        
        location:Location
        image:String
    }
    
    type Characters{
        Info:ResultInfo
        Result:[Character]!
    }

    input CharacterInput{
        name:String!
        image:String!
        location:String!
    }

    type Query{
        GetCharacters(pageNumber:Int, limit:Int, searchname:String):Characters!
    }

    type Mutation{
        DeleteCharacter(id:String):String
        EditCharacter(CharacterID:String, input:CharacterInput):Character
        CreateCharacter(input:CharacterInput):Character!
    }

`;