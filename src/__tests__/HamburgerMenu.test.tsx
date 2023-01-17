import React from 'react';
// import {render, fireEvent, getByTestId} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import {HamburgerMenu}  from '../components/HamburgerMenu';
// import GenreI from "../components/interfaces/GenreI";
//
// //doesnt work yet
// describe('HamburgerMenu component', () => {
//     const genres: GenreI[] = [
//         { id: "1", name: "genre1" , _links: {self: {href: "linkGenre1"}}},
//         { id: "2", name: "genre2" , _links: {self: {href: "linkGenre2"}}},
//         { id: "3", name: "genre3" , _links: {self: {href: "linkGenre3"}}},
//         { id: "4", name: "genre4" , _links: {self: {href: "linkGenre4"}}}
//     ];
//     const setGenreId = jest.fn();
//
//     it('should render correctly', () => {
//         const { getByTestId } = render(<HamburgerMenu genres={genres} setGenreId={setGenreId}/>);
//         expect(getByTestId('hamburger-menu')).toBeInTheDocument();
//     });
//
//     it('should open and close dropdown on button click', () => {
//         const { container, getByTestId } = render(<HamburgerMenu genres={genres} setGenreId={setGenreId} />);
//         expect(container.querySelector('.hamburger-menu-wrapper')).toBeInTheDocument();
//         expect(container.querySelector('.hamburger-menu')).toBeInTheDocument();
//         //simulate click on hamburger menu button
//         fireEvent.click(getByTestId('hamburger-menu-button'));
//
//     });
//
//     it('should open and close dropdown on button click', () => {
//         const { container, getByTestId } = render(<HamburgerMenu genres={genres} setGenreId={setGenreId}/>);
//         // check if dropdown is not visible
//         expect(container.querySelector('.hamburger-menu-wrapper')).toBeInTheDocument();
//         expect(container.querySelector('.hamburger-menu')).toBeInTheDocument();
//     });
//
//     it('should call setGenreId on genre button click', () => {
//         const { getByText } = render(<HamburgerMenu genres={genres} setGenreId={setGenreId} />);
//         fireEvent.click(getByText('Action'));
//         expect(setGenreId).toHaveBeenCalledWith('1');
//     });
// });
