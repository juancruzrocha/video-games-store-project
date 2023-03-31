interface GenreType {
    id:number
    name:string
}

export interface genresReducerState{
    listGenresData: GenreType[],
    idDetails: object,
    successMsg: string,
    errorMsg: string
}