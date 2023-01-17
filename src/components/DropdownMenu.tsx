import React from "react";
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import '../styles/dropdownMenuHeader.scss';

interface IDropdownMenuProps {
    genres: GenreI[];
    // onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    // openDropdown: () => void;
    setGenreId: (genreId: string) => void;
}

export const DropdownMenu: React.FC<IDropdownMenuProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);
    const getNewEventsArray = async (id: string) => {
        props.setGenreId(id);
        setIsOpened(false);
    }

    return (
        <div className='dropdown-menu' >
            {!isOpened && props.genres.length > 4 ?<div data-testid='more-button' className='dropdown-menu-button' onMouseEnter={() => setIsOpened(true)}>
                More
            </div> : null}
            {isOpened ? <div className='dropdown-menu-genres' data-testid='dropdown-menu-genres'  onMouseLeave={() => setIsOpened(false)}>
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