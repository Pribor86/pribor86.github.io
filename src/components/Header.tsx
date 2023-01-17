import React, {useEffect} from 'react';
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import {DropdownMenu} from "./DropdownMenu";
import EventI from "./interfaces/EventI";
import {SearchInput} from "./searchInput";
import {HamburgerMenu} from "./HamburgerMenu";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {useAppSelector} from "../store/hooks";

interface IHeaderProps {
    // genres: GenreI[];
    page: number;
    setGenreId: (genreId: string) => void;
    setSearchValue: (searchValue: string) => void;
}


export const Header: React.FC<IHeaderProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);
    const [isHumMenuHidden, setIsHumMenuHidden] = React.useState(true);
    const genres = useAppSelector((state) => state.genres.genres);

    const {width} = useWindowDimensions();

    useEffect(() => {
        if (width < 768) {
            setIsHumMenuHidden(false);
        } else {
            setIsHumMenuHidden(true);
        }
    }, [width]);
    const openDropdown = () => {
        setIsOpened(!isOpened);
    }

    const getNewEventsArray = async (id: string) => {
        props.setGenreId(id);

    }

    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     console.log(event.target.value);
    // }

    return (
        <div className='header'>
            <div className='header-wrapper sticky'>
                <div className='header-row'>
                    <div className='header-title'>
                        Music events
                    </div>
                    <div className='header-search'>
                        <SearchInput setSearchValue={props.setSearchValue}/>
                    </div>
                </div>
                { isHumMenuHidden ? (
                <div className='header-genres'>
                    <div className="genres-wrapper">
                        <div
                            className='header-genre-button'
                            onClick={() => getNewEventsArray('')}
                        >
                            All Genres
                        </div>
                    </div>
                    {genres.length > 4 ? genres.slice(0, 4).map((genre: GenreI) => {
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
                    }) : genres.map((genre: GenreI) => {
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
                    {genres.length > 4 ? (
                        <div>
                            <DropdownMenu
                                genres={genres.slice(4, genres.length)}
                                // openDropdown={openDropdown}
                                // onChange={handleChange}
                                setGenreId={props.setGenreId}
                            ></DropdownMenu>
                        </div>
                    ) : null}
                </div>
                    ) : (
                <HamburgerMenu
                    genres={genres}
                    setGenreId={props.setGenreId}
                />
                    )}
            </div>
        </div>

    );
}

