import EventI from "./components/interfaces/EventI";
import GenreI from "./components/interfaces/GenreI";

import portfolioItemI from "./components/interfaces/portfolioItemI";


type EventState = {
    events: portfolioItemI[]
}

type EventAction = {
    type: string,
    events: portfolioItemI[]
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

type SelectedDropdownItemIdState = {
    selectedDropdownItemId: string
}

type SelectedDropdownItemIdAction = {
    type: string,
    id: string
}

type DispatchType =
    (args: EventAction | GenreAction | SelectedGenreAction | SelectedDropdownItemIdAction)
        => EventAction | GenreAction | SelectedGenreAction | SelectedDropdownItemIdAction;
