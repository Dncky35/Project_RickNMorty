const { UserInputError } = require("apollo-server");
const Character = require("../../Models/Character");

interface _Character{
    name:string,
    image:string
    location:string,
}

type InputCharacter = Pick<_Character, "name" | "location" | "image">;

module.exports = {
    
    Query:{
        async GetCharacters(parents:undefined, args:{pageNumber:number, limit:number, searchname:string}){
            
            const Char_count = await Character.find({name:{$regex: args.searchname, $options: "i"}}).count();
            const rem = Char_count % 20;
            var quo = (Char_count-rem)/20;

            const Char = await Character.find({name:{$regex: args.searchname, $options: "i"}}).skip((args.pageNumber-1)*20).limit(args.limit);

            const Characters = {
                Info:{
                    currentPage:args.pageNumber,
                    TotalPage:quo
                },
                Result:Char
            }
            return Characters;
        }
    },

    Mutation:{
        async DeleteCharacter(parents:undefined, args:{id:string}){

            const tempChar = await Character.findById(args.id);

            if(!tempChar){
                throw new UserInputError('Character is not exist', {errors:"Character is not exist"})
            }

            await tempChar.delete();

            return `${tempChar.name} has been deleted`
        },

        async EditCharacter(parents:undefined, args:{CharacterID:number, input:InputCharacter}){

            if(args.input.name.trim() === ""){
                throw new UserInputError("name field can not be emtpy");
            }

            if(args.input.location.trim() === ""){
                throw new UserInputError("location field can not be emtpy");
            }

            const tempChar = await Character.findById(args.CharacterID).then((res:any) => {
                
                if(!res){
                    throw new UserInputError('Character is not exist', {errors:"Character is not exist"})
                }
                else{
                    res.name = args.input.name;
                    res.image = args.input.image;
                    res.location.name = args.input.location;
                    res.save();
                    return res
                }
            }); 

            return tempChar
        },

        async CreateCharacter(parents:undefined, args:{input:InputCharacter}){

            if(args.input.name.trim() === ""){
                throw new UserInputError("name field can not be emtpy");
            }

            if(args.input.location.trim() === ""){
                throw new UserInputError("location field can not be emtpy");
            }

            const newCharacter = new Character({
                name:args.input.name,
                image:args.input.image,
                location:{
                    name:args.input.location
                }
            });

            const res = await newCharacter.save();
            return res          
        },
    }
    
}