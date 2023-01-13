import React, {useEffect} from "react";
import '../styles/hamburgerMenu.scss';
import GenreI from "./interfaces/GenreI";
import {useClickOutside} from "../hooks/useClickOutside";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface IHamburgerMenuProps {
    genres: GenreI[];
    setGenreId: (genreId: string) => void;
}

export const HamburgerMenu: React.FC<IHamburgerMenuProps> = (props) => {

    const {height} = useWindowDimensions();
    const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(true);
    const [isOpened, setIsOpened] = React.useState(false);
    const [isScroll, setIsScroll] = React.useState(false);
    const openDropdown = () => {
        setIsOpened(!isOpened);
        setIsComponentVisible(true)
        console.log(isOpened);
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
    }

    return (
        <div className='hamburger-menu-wrapper'>
            {!isOpened ? (
                <div className='hamburger-menu' onClick={openDropdown}>
                    <div className='hamburger-menu-line'/>
                    <div className='hamburger-menu-line'/>
                    <div className='hamburger-menu-line'/>
                </div>
            ) : (
                <div ref={ref} id="hamburger-dropdown" className={'hamburger-menu-dropdown ' + (isScroll ? 'scrollable' : null)} >
                    {props.genres.map((genre: GenreI) => {
                        return (
                            <div
                                className="header-genre-button-dropdown"
                                key={genre.id}
                                onClick={() => changeGenre(genre.id)}
                            >
                                {genre.name}
                            </div>
                        );}
                    )}
                </div>
            )}
        </div>
    )
}