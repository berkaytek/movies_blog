export interface MovieModelBase {
    _embedded:movieList
}
interface movieList{
    movieList:Array<MovieModel>;
}
export interface MovieModel{
    id?: number;
    title:string;
    poster_path?: string;
    genres?: string;
    overview?: string;
    vote_average?: string;
}