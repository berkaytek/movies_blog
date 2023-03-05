export interface MovieModelBase {
    _embedded:movieList
}
interface movieList{
    movieList:Array<MovieModel>;
}
export interface MovieModel{
    id?: number;
    title:string;
    posterPath?: string;
    genres?: string;
    overview?: string;
    voteAverage?: string;
    voteCount?: string;
}