import React from "react";
import GenreI from "./interfaces/GenreI";
import '../styles/header.scss';
import '../styles/dropdownMenuHeader.scss';

interface IDropdownMenuProps {
    genres: GenreI[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    openDropdown: () => void;

}

export const DropdownMenu: React.FC<IDropdownMenuProps> = (props) => {

    const [isOpened, setIsOpened] = React.useState(false);

    return (
        <div className='dropdown-menu'>
            {!isOpened ?<div className='dropdown-menu-button' onMouseEnter={() => setIsOpened(true)}>
                More
            </div> : null}
            {isOpened ? <div className='dropdown-menu-genres' onMouseLeave={() => setIsOpened(false)}>
                {/*<div className='dropdown-menu-genres-select'>*/}
                    {props.genres.map((genre: GenreI) => {
                        return (
                            <div className="header-genre-button-dropdown" key={genre.id}>{genre.name}</div>
                        );}
                    )}
                {/*</div>*/}
            </div> : null}
        </div>
    );
}