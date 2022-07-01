export interface Character{
    _id:string
    name:string
    image:string
    location :{
      name:string
    }
}

export interface Characters{
    result:[Character]
}