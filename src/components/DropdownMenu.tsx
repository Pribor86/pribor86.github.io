import React, {useState} from "react";
import '../styles/header.scss';
import '../styles/dropdownMenuHeader.scss';
import {useAppSelector} from "../store/hooks";

interface IDropdownMenuProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T) => JSX.Element;
    setByClick: (id: string) => void;
    showingLength: number;
}

export const DropdownMenu = <T extends { id: string }>(props: IDropdownMenuProps<T>) => {
    const [isOpened, setIsOpened] = useState(false);
    const selectedDropdownItemId = useAppSelector((state) => state.selectedDropdownItemId.selectedDropdownItemId);

    const handleClick = (id: string) => {
        props.setByClick(id);
        setIsOpened(false);
    }

    return (
        <div className='dropdown-menu'>
            {!isOpened && props.items.length > props.showingLength ?
                <div
                    data-testid='more-button'
                    className='dropdown-menu-button'
                    onMouseEnter={() => setIsOpened(true)}
                >
                    {props.title}
                </div>
                : null
            }
            {isOpened ?
                <div
                    className='dropdown-menu-items'
                    data-testid='dropdown-menu-items'
                    onMouseLeave={() => setIsOpened(false)}
                >
                    {props.items.map((item) => {
                        return (
                            <div
                                className={"header-item-button-dropdown" + (selectedDropdownItemId === item.id ? " clicked" : "")}
                                id={'button' + item.id}
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                            >
                                {props.renderItem(item)}
                            </div>
                        );
                    })}
                </div>
                : null}
        </div>
    );
};