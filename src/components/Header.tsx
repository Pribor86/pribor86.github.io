import React, {useEffect, useState} from 'react';
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import {DropdownMenu} from "./DropdownMenu";
import {SearchInput} from "./searchInput";
import {HamburgerMenu} from "./HamburgerMenu";
import useWindowDimensions from "../hooks/useWindowDimensions";
//redux store
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setSelectedDropdownItemId, setSelectedGenre} from "../store/actions";

interface IHeaderProps {
    setGenreId: (genreId: string) => void;
    setSearchValue: (searchValue: string) => void;
}

interface Item {
    id: string;
    name: string;
}

export const Header: React.FC<IHeaderProps> = (props) => {

    const [isHumMenuHidden, setIsHumMenuHidden] = useState(true);
    const genres = useAppSelector((state) => state.genres.genres);
    const selectedGenreId = useAppSelector((state) => state.selectedGenreId.selectedGenre);
    const {width} = useWindowDimensions();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (width < 768) {
            setIsHumMenuHidden(false);
        } else {
            setIsHumMenuHidden(true);
        }
    }, [width]);

    const getNewEventsArray = async (id: string) => {
        props.setGenreId(id);
        dispatch(setSelectedGenre(id));
        dispatch(setSelectedDropdownItemId(id))
    }

    const renderItem = (item: Item) => {
        return (
            <div>
                {item.name}
            </div>
        );
    }

    return (
        <div className='header'>
            <div className='header-wrapper sticky'>
                <div className='header-row'>
                    <div className='header-title'>
                        Portfolio - Aleksandr Grigorjev | Software Engineer
                    </div>
                    <div className='header-search'>
                        {/*<SearchInput*/}
                        {/*    setSearchValue={props.setSearchValue}*/}
                        {/*/>*/}
                    </div>
                </div>
                {/*{isHumMenuHidden ? (*/}
                {/*    <div className='header-genres'>*/}
                {/*        <div className="genres-wrapper">*/}
                {/*            <div*/}
                {/*                className={'header-genre-button ' + (selectedGenreId === '' ? " clicked" : "")}*/}
                {/*                id={'button-'}*/}
                {/*                onClick={() => getNewEventsArray('')}*/}
                {/*            >*/}
                {/*                All Genres*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        {genres.length > 4 ? genres.slice(0, 4).map((genre: GenreI) => {*/}
                {/*            return (*/}
                {/*                <div*/}
                {/*                    className="genres-wrapper"*/}
                {/*                    key={genre.id}*/}
                {/*                >*/}
                {/*                    <div*/}
                {/*                        className={'header-genre-button ' + (selectedGenreId === genre.id ? " clicked" : "")}*/}
                {/*                        id={'button-' + genre.id}*/}
                {/*                        key={genre.id}*/}
                {/*                        onClick={() => getNewEventsArray(genre.id)}*/}
                {/*                    >*/}
                {/*                        {genre.name}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            );*/}
                {/*        }) : genres.map((genre: GenreI) => {*/}
                {/*                return (*/}
                {/*                    <div*/}
                {/*                        className={'header-genre-button ' + (selectedGenreId === genre.id ? " clicked" : "")}*/}
                {/*                        key={genre.id}*/}
                {/*                        onClick={() => getNewEventsArray(genre.id)}*/}
                {/*                    >*/}
                {/*                        {genre.name}*/}
                {/*                    </div>*/}
                {/*                );*/}
                {/*            }*/}
                {/*        )}*/}
                {/*        {genres.length > 4 ? (*/}
                {/*                <div>*/}
                {/*                    <DropdownMenu<Item>*/}
                {/*                        items={genres.slice(4, genres.length)}*/}
                {/*                        title={'More'}*/}
                {/*                        renderItem={renderItem}*/}
                {/*                        setByClick={getNewEventsArray}*/}
                {/*                        showingLength={4}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*            : null*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <HamburgerMenu<Item>*/}
                {/*        items={genres}*/}
                {/*        renderItem={renderItem}*/}
                {/*        setItemId={getNewEventsArray}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </div>
    )
}

