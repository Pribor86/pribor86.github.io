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


type DispatchType = (args: EventAction) => EventAction
type DispatchType = (args: GenreAction) => GenreAction