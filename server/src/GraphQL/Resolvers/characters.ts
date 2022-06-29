const { UserInputError } = require("apollo-server");
const RNM_data = require("../../../data/RNM_data.json");
const fs = require("fs");

interface _Character{
    name:string,
    image:string
    location:string,
}

type InputCharacter = Pick<_Character, "name" | "location" | "image">;

module.exports = {
    
    Query:{
        async GetCharacters(parents:undefined, args:{offset:number, limit:number, searchname:string}){

            var results: any[];
            var name = args.searchname.toUpperCase();

            if(name === " ") {
                const DataPages = ({off = args.offset, lim = args.limit}) => RNM_data.slice(off, off+lim).map((index: any) => ({...index}));
                 return DataPages({})
            }

             results = RNM_data.filter(function(entry: { name: string; }) {
                 return entry.name.toUpperCase().indexOf(name) !== -1;
             });
            
            const DataPages = ({off = args.offset, lim = args.limit}) => results.slice(off, off+lim).map(index => ({...index}));
             return DataPages({})
        }
    },

    Mutation:{
        async DeleteCharacter(parents:undefined, args:{id:number}){

            const index = RNM_data.indexOf(RNM_data.filter((element: { id: number; }) => element.id === args.id)[0]);
            
            if(index === -1){
                return "Account has not exist"
            }

            RNM_data.splice(index, 1);

            for(let i = args.id-1; i < Object.values(RNM_data).length; i++){
                RNM_data[i].id = i+1;
            }
                
            fs.writeFile('./Data/RNM_data.json', JSON.stringify(RNM_data, null, 2), (err:any) => {
                if(err){
                    console.log('Error writing file', err)
                }
                else{
                    console.log('Successfully wrote file')
                }
            })

            return 'Account has been deleted'
        },

        async EditCharacter(parents:undefined, args:{CharacterID:number, input:InputCharacter}){

            if(args.input.name.trim() === ""){
                throw new UserInputError("name field can not be emtpy");
            }

            if(args.input.location.trim() === ""){
                throw new UserInputError("location field can not be emtpy");
            }

            const index = RNM_data.indexOf(RNM_data.filter((element: { id: number; }) => element.id === args.CharacterID)[0]);

            RNM_data[index].name = args.input.name;
            RNM_data[index].location.name = args.input.location;
            RNM_data[index].image = args.input.image;

            fs.writeFile('./Data/RNM_data.json', JSON.stringify(RNM_data, null, 2), (err: any) => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
           });
           
           return RNM_data[index];
            
        },

        async CreateCharacter(parents:undefined, args:{input:InputCharacter}){

            if(args.input.name.trim() === ""){
                throw new UserInputError("name field can not be emtpy");
            }

            if(args.input.location.trim() === ""){
                throw new UserInputError("location field can not be emtpy");
            }

            const newCharacter = {
                id: Object.values(RNM_data).length+1,
                name:args.input.name,
                location:{
                    name:args.input.location
                },
                image:args.input.image
            }

            var jsonString = RNM_data;
            jsonString.push(newCharacter);
            jsonString = JSON.stringify(jsonString, null, 2);
            
            fs.writeFile('./Data/RNM_data.json', jsonString, (err: any) => {
                 if (err) {
                     console.log('Error writing file', err)
                 } else {
                     console.log('Successfully wrote file')
                 }
            });
            
            return newCharacter;
          
        },
    }
    
}