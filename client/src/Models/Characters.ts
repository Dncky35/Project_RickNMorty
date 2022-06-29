export interface Character{
    id:string
    name:string
    image:string
    location :{
      name:string
    }
}

export interface Characters{
    result:[Character]
}

export interface ImageFile{
    filename:string,
    memetype:string,
    encoding:string,
    url:string
}