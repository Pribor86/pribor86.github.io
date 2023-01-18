import React, {useState} from "react";
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import '../styles/dropdownMenuHeader.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useDispatch} from "react-redux";
import {setSelectedGenre} from "../store/actions";
import {AppDispatch} from "../store/store";

interface IDropdownMenuProps {
    genres: GenreI[];
    setGenreId: (genreId: string) => void;
}

export const DropdownMenu: React.FC<IDropdownMenuProps> = (props) => {

    const [isOpened, setIsOpened] = useState(false);
    const selectedGenreId = useAppSelector((state) => state.selectedGenreId.selectedGenre);
    const dispatch = useAppDispatch()
    const getNewEventsArray = async (id: string) => {
        props.setGenreId(id);
        setIsOpened(false);
        dispatch(setSelectedGenre(id));
    }

    return (
        <div className='dropdown-menu' >
            {!isOpened && props.genres.length > 4 ?
                <div
                    data-testid='more-button'
                    className='dropdown-menu-button'
                    onMouseEnter={() => setIsOpened(true)}
                >
                    More
                </div>
                : null
            }
            {isOpened ?
                <div
                    className='dropdown-menu-genres'
                    data-testid='dropdown-menu-genres'
                    onMouseLeave={() => setIsOpened(false)}
                >
                    {props.genres.map((genre: GenreI) => {
                        return (
                            <div
                                className={"header-genre-button-dropdown" + (selectedGenreId === genre.id ? " clicked" : "")}
                                id={'button-' + genre.id}
                                key={genre.id}
                                onClick={() => getNewEventsArray(genre.id)}
                            >
                                {genre.name}
                            </div>
                        );}
                    )}
                </div>
                : null}
        </div>
    );
}