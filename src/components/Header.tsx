import React from 'react';
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import {DropdownMenu} from "./DropdownMenu";
import {getEventsByGenre} from "../http";
import EventI from "./interfaces/EventI";

interface IHeaderProps {
    genres: GenreI[];
    setEvents: (events: EventI[]) => void;
}

export const Header: React.FC<IHeaderProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);

    const openDropdown = () => {
        setIsOpened(!isOpened);
        console.log(isOpened);
    }

    const getNewEventsArray = async (id: string) => {
        const response = await getEventsByGenre(id);
        props.setEvents(response);

    }



    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    }

    return (
        <div className='header'>
            <div className='header-wrapper sticky'>
                <div className='header-title'>
                    Music events
                </div>
                <div className='header-genres'>
                    {props.genres.length > 5 ? props.genres.slice(0, 5).map((genre: GenreI) => {
                        return (
                            <div className="genres-wrapper" key={genre.id}>
                                <div
                                    className='header-genre-button'
                                    key={genre.id}
                                    onClick={() => getNewEventsArray(genre.id)}
                                >
                                    {genre.name}
                                </div>
                            </div>
                        );
                    }) : props.genres.map((genre: GenreI) => {
                            return (
                                <div
                                    className='header-genre-button'
                                    key={genre.id}
                                    onClick={() => getNewEventsArray(genre.id)}
                                >
                                    {genre.name}
                                </div>
                            );
                        }
                    )}
                        <div>
                            <DropdownMenu
                                genres={props.genres.slice(5, props.genres.length)}
                                openDropdown={openDropdown}
                                onChange={handleChange}
                                setEvents={props.setEvents}
                            ></DropdownMenu>
                        </div>
                </div>
            </div>
        </div>

    );
}

