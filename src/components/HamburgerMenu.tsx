import React, {useEffect, useState} from "react";
import '../styles/hamburgerMenu.scss';
import {useClickOutside} from "../hooks/useClickOutside";
import useWindowDimensions from "../hooks/useWindowDimensions";

import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setSelectedDropdownItemId} from "../store/actions";

interface IHamburgerMenuProps<T> {
    items: T[];
    setItemId: (id: string) => void;
    renderItem: (item: T) => JSX.Element;
}

export const HamburgerMenu = <T extends { id: string }>(props: IHamburgerMenuProps<T>) => {

    const {height} = useWindowDimensions();
    const {ref, isComponentVisible, setIsComponentVisible} = useClickOutside(true);
    const [isOpened, setIsOpened] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const selectedDropdownItemId = useAppSelector((state) => state.selectedDropdownItemId.selectedDropdownItemId);
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
    }, [ref, height]);

    useEffect(() => {
        if (!isComponentVisible) {
            setIsOpened(!isOpened);
        }
    }, [isComponentVisible, isOpened]);

    const handleClick = (id: string) => {
        props.setItemId(id);
        setIsOpened(false);
        dispatch(setSelectedDropdownItemId(id));
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
                        {props.items.map((item: T) => {
                                return (
                                    <div
                                        className={"header-item-button-dropdown " + (selectedDropdownItemId === item.id ? ' clicked' : '')}
                                        data-testid='hamburger-menu-item-button'
                                        id={'button-' + item.id}
                                        key={item.id}
                                        onClick={() => handleClick(item.id)}
                                    >
                                        {props.renderItem(item)}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}