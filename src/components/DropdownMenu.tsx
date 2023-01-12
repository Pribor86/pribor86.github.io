import React from "react";
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import '../styles/dropdownMenuHeader.scss';
import {getEventsByGenre} from "../http";
import EventI from "./interfaces/EventI";

interface IDropdownMenuProps {
    genres: GenreI[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    openDropdown: () => void;
    setEvents: (events: EventI[]) => void;
    setGenreId: (genreId: string) => void;
}

export const DropdownMenu: React.FC<IDropdownMenuProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);
    const getNewEventsArray = async (id: string) => {
        // const response = await getEventsByGenre(id);
        // props.setEvents(response);
        props.setGenreId(id);

    }

    return (
        <div className='dropdown-menu'>
            {!isOpened && props.genres.length > 5 ?<div className='dropdown-menu-button' onMouseEnter={() => setIsOpened(true)}>
                More
            </div> : null}
            {isOpened ? <div className='dropdown-menu-genres' onMouseLeave={() => setIsOpened(false)}>
                    {props.genres.map((genre: GenreI) => {
                        return (
                            <div
                                className="header-genre-button-dropdown"
                                key={genre.id}
                                onClick={() => getNewEventsArray(genre.id)}
                            >
                                {genre.name}
                            </div>
                        );}
                    )}
            </div> : null}
        </div>
    );
}