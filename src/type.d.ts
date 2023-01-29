import EventI from "./components/interfaces/EventI";
import GenreI from "./components/interfaces/GenreI";


type EventState = {
    events: EventI[]
}

type EventAction = {
    type: string,
    events: EventI[]
}

type GenreState = {
    genres: GenreI[]
}

type GenreAction = {
    type: string,
    genres: GenreI[]
}

type SelectedGenreState = {
    selectedGenre: GenreI.id
}

type SelectedGenreAction = {
    type: string,
    genre: GenreI.id
}

type DispatchType =
    (args: EventAction | GenreAction | SelectedGenreAction)
        => EventAction | GenreAction | SelectedGenreAction;


// type DispatchType = (args: EventAction) => EventAction
// type DispatchType = (args: GenreAction) => GenreAction
// type DispatchType = (args: SelectedGenreAction) => SelectedGenreAction