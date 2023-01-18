import React, {useEffect, useState} from "react";
import '../styles/hamburgerMenu.scss';
import GenreI from "./interfaces/GenreI";
import {useClickOutside} from "../hooks/useClickOutside";
import useWindowDimensions from "../hooks/useWindowDimensions";

import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useDispatch} from "react-redux";
import {setSelectedGenre} from "../store/actions";
import {AppDispatch} from "../store/store";

interface IHamburgerMenuProps {
    genres: GenreI[];
    setGenreId: (genreId: string) => void;
}

export const HamburgerMenu: React.FC<IHamburgerMenuProps> = (props) => {

    const {height} = useWindowDimensions();
    const {ref, isComponentVisible, setIsComponentVisible} = useClickOutside(true);
    const [isOpened, setIsOpened] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const selectedGenreId = useAppSelector((state) => state.selectedGenreId.selectedGenre);
    const dispatch = useAppDispatch();

    const openDropdown = () => {
        setIsOpened(!isOpened);
        setIsComponentVisible(true)
    }

    useEffect(() => {
        if (ref.current) {
            if (height < ref.current.clientHeight) {
                setIsScroll(true);
            }
        }
    }, [ref.current, height]);

    useEffect(() => {
        if (!isComponentVisible) {
            setIsOpened(!isOpened);
        }
    }, [isComponentVisible]);

    const changeGenre = (id: string) => {
        props.setGenreId(id);
        setIsOpened(false);
        dispatch(setSelectedGenre(id));
    }

    return (
        <div
            className='hamburger-menu-wrapper'
            data-testid='hamburger-menu'
        >
            {!isOpened ? (
                <div
                    className='hamburger-menu'
                    data-testid='hamburger-menu-button'
                    onClick={openDropdown}
                >
                    <div className='hamburger-menu-line'/>
                    <div className='hamburger-menu-line'/>
                    <div className='hamburger-menu-line'/>
                </div>
            ) : (
                <div
                    className='hamburger-menu-wrapper'
                    data-testid='hamburger-menu-wrapper-opened'
                    ref={ref}
                >
                    <div
                        id="hamburger-dropdown"
                        data-testid='hamburger-dropdown'
                        className={'hamburger-menu-dropdown ' + (isScroll ? 'scrollable' : null)}
                    >
                        <div
                            className='hamburger-menu-close'
                            data-testid='hamburger-menu-close'
                            onClick={openDropdown}
                        >
                            &times;
                        </div>
                        {props.genres.map((genre: GenreI) => {
                            return (
                                <div
                                    className={"header-genre-button-dropdown " + (selectedGenreId === genre.id ? ' clicked' : '')}
                                    data-testid='hamburger-menu-genre-button'
                                    id={'button-' + genre.id}
                                    key={genre.id}
                                    onClick={() => changeGenre(genre.id)}
                                >
                                    {genre.name}
                                </div>
                            );}
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}