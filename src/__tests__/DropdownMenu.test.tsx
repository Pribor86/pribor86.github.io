import React from "react";
// import {render, fireEvent, waitFor} from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect';
// import GenreI from "../components/interfaces/GenreI";
// import {DropdownMenu} from "../components/DropdownMenu";
// import userEvent from "@testing-library/user-event";
//
// //doesnt work
// describe("DropdownMenu component", () => {
//     const genres: GenreI[] = [
//         { id: "1", name: "genre1" , _links: {self: {href: "linkGenre1"}}},
//         { id: "2", name: "genre2" , _links: {self: {href: "linkGenre2"}}},
//         { id: "3", name: "genre3" , _links: {self: {href: "linkGenre3"}}},
//         { id: "4", name: "genre4" , _links: {self: {href: "linkGenre4"}}}
//     ];
//
//     it("should render correctly with more than 4 genres", () => {
//         const { getByTestId } = render(<DropdownMenu genres={genres} setGenreId={() => {}} />);
//         expect(getByTestId("more-button")).toBeInTheDocument();
//     });
//
//     it("should open the dropdown menu when 'More' button is hover", async () => {
//         const { getByTestId } = render(<DropdownMenu genres={genres} setGenreId={() => {}} />);
//         userEvent.hover(getByTestId("more-button"));
//         await waitFor(() => expect(getByTestId("dropdown-menu-genres")).toBeInTheDocument());
//     });
//
//     it("should close the dropdown menu when a genre is clicked", () => {
//         const { getByText, queryByTestId } = render(<DropdownMenu genres={genres} setGenreId={() => {}} />);
//         fireEvent.click(getByText("More"));
//         fireEvent.click(getByText("genre1"));
//         expect(queryByTestId("dropdown-menu-genres")).toBeNull();
//     });
//
//     it("should call the setGenreId function when a genre is clicked", () => {
//         const setGenreId = jest.fn();
//         const { getByText } = render(<DropdownMenu genres={genres} setGenreId={setGenreId} />);
//         fireEvent.click(getByText("More"));
//         fireEvent.click(getByText("genre1"));
//         expect(setGenreId).toHaveBeenCalledWith("1");
//     });
// });
