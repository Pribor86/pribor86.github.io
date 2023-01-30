import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {HamburgerMenu} from '../components/HamburgerMenu';
// eslint-disable-next-line jest/no-mocks-import
import genresMock from "../__mocks__/genresMock";
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {setSelectedDropdownItemId} from '../store/actions';

jest.mock('../store/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}));
jest.mock('../store/actions', () => ({
    setSelectedDropdownItemId: jest.fn(),
}));
describe('HamburgerMenu component', () => {

    beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue('1');
        (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    });

    const setGenreId = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        render(
            <HamburgerMenu items={genresMock} setItemId={setGenreId} renderItem={(item) => <div>{item.name}</div>}/>
        );
        expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
    });

    it('should open and close dropdown on button click', () => {
        render(
            <HamburgerMenu items={genresMock} setItemId={setGenreId} renderItem={(item) => <div>{item.name}</div>}/>
        );
        const hamburgerMenuButton = screen.getByTestId('hamburger-menu-button');
        expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
        // ('.hamburger-menu-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('hamburger-menu-button')).toBeInTheDocument()
        // expect(container.querySelector('.hamburger-menu')).toBeInTheDocument();
        fireEvent.click(hamburgerMenuButton);
        const closeButton = screen.getByTestId('hamburger-menu-close');
        expect(screen.getByText('genre1')).toBeInTheDocument();
        expect(screen.getByText('genre2')).toBeInTheDocument();
        expect(screen.getByText('genre3')).toBeInTheDocument();
        expect(screen.getByText('genre4')).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(screen.queryByText('genre1')).not.toBeInTheDocument();
    });


    it('should call setGenreId on genre button click', () => {
        render(
            <HamburgerMenu items={genresMock} setItemId={setGenreId} renderItem={(item) => <div>{item.name}</div>}/>
        );
        const hamburgerMenuButton = screen.getByTestId('hamburger-menu-button');
        fireEvent.click(hamburgerMenuButton);
        fireEvent.click(screen.getByText('genre1'));
        expect(setGenreId).toHaveBeenCalledWith('1');
        fireEvent.click(hamburgerMenuButton);
        fireEvent.click(screen.getByText('genre4'));
        expect(setGenreId).toHaveBeenCalledWith('4');
    });

    it('should call setSelectedGenre on genre button click', () => {
        render(
            <HamburgerMenu items={genresMock} setItemId={setGenreId} renderItem={(item) => <div>{item.name}</div>}/>
        );
        const hamburgerMenuButton = screen.getByTestId('hamburger-menu-button');
        fireEvent.click(hamburgerMenuButton);
        fireEvent.click(screen.getByText('genre1'));
        expect(setSelectedDropdownItemId).toHaveBeenCalledWith('1');
        fireEvent.click(hamburgerMenuButton);
        fireEvent.click(screen.getByText('genre4'));
        expect(setSelectedDropdownItemId).toHaveBeenCalledWith('4');
    });
});
