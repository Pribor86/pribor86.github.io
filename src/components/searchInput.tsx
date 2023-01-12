import React from "react";
import '../styles/searchInput.scss';

interface ISearchInputProps {
    setSearchValue: (searchValue: string) => void;
}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            props.setSearchValue(event.target.value);
        }

        return (
            <div className='search-input-wrapper'>
                <input className='search-input' type="text" placeholder="Search..." onChange={handleChange}/>
            </div>
        )
}