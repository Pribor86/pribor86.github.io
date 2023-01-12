import React from "react";
import '../styles/hamburgerMenu.scss';
import GenreI from "./interfaces/GenreI";

interface IHamburgerMenuProps {
    genres: GenreI[];
}

export const HamburgerMenu: React.FC<IHamburgerMenuProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);

    const openDropdown = () => {
        setIsOpened(!isOpened);
        console.log(isOpened);
    }

    return (
        <div className='hamburger-menu-wrapper'>
            {!isOpened ? (
                <div className='hamburger-menu' onMouseEnter={openDropdown}>
                    <div className='hamburger-menu-line'/>
                    <div className='hamburger-menu-line'/>
                    <div className='hamburger-menu-line'/>
                </div>
            ) : (
                <div className='hamburger-menu-dropdown' onMouseLeave={openDropdown}>
                    {props.genres.map((genre: GenreI) => {
                        return (
                            <div
                                className="header-genre-button-dropdown"
                                key={genre.id}
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