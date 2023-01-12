import React from 'react';
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import {DropdownMenu} from "./DropdownMenu";
import {getEvents} from "../http";
import EventI from "./interfaces/EventI";

interface IHeaderProps {
    genres: GenreI[];
    setEvents: (events: EventI[]) => void;
    page: number;
    setGenreId: (genreId: string) => void;
}

export const Header: React.FC<IHeaderProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);

    const openDropdown = () => {
        setIsOpened(!isOpened);
        console.log(isOpened);
    }

    const getNewEventsArray = async (id: string) => {
        console.log("getNewEventsArray", id, props.page);
        // const response = await getEvents(props.page, id);
        // props.setEvents(response);
        props.setGenreId(id);

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
                    <div className="genres-wrapper">
                        <div
                            className='header-genre-button'
                            onClick={() => getNewEventsArray('')}
                        >
                            All Genres
                        </div>
                    </div>
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
                    {props.genres.length > 5 ? (
                        <div>
                            <DropdownMenu
                                genres={props.genres.slice(5, props.genres.length)}
                                openDropdown={openDropdown}
                                onChange={handleChange}
                                setEvents={props.setEvents}
                                setGenreId={props.setGenreId}
                            ></DropdownMenu>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>

    );
}

