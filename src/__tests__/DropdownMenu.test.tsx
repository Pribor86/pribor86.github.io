import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {DropdownMenu} from "../components/DropdownMenu";
// eslint-disable-next-line jest/no-mocks-import
import genresMock from "../__mocks__/genresMock";
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {setSelectedGenre} from '../store/actions';

jest.mock('../store/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}));
jest.mock('../store/actions', () => ({
    setSelectedGenre: jest.fn(),
}));

describe("DropdownMenu component", () => {

    beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue('1');
        (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    });

    it("should render correctly with more than 4 genres", () => {
        render(
            <DropdownMenu genres={genresMock} setGenreId={() => {
            }}/>
        );
        expect(screen.getByTestId("more-button")).toBeInTheDocument();
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        expect(screen.getByText("genre1")).toBeInTheDocument();
        expect(screen.getByText("genre7")).toBeInTheDocument();
    });

    it("should close the dropdown menu when a genre is clicked", () => {
        render(
            <DropdownMenu genres={genresMock} setGenreId={() => {
            }}/>
        );
        expect(screen.getByTestId("more-button")).toBeInTheDocument();
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        expect(screen.getByText("genre1")).toBeInTheDocument();
        fireEvent.click(screen.getByText("genre1"));
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should call the setGenreId function when a genre is clicked", () => {
        const setGenreId = jest.fn();
        render(
            <DropdownMenu genres={genresMock} setGenreId={setGenreId}/>
        );
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        fireEvent.click(screen.getByText("genre1"));
        expect(setGenreId).toHaveBeenCalledWith("1");
    });

    it("should call setGenreId and setSelectedGenre when a genre is clicked", () => {
        const setGenreId = jest.fn();
        render(
            <DropdownMenu genres={genresMock} setGenreId={setGenreId}/>
        );
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        fireEvent.click(screen.getByText("genre1"));
        expect(setGenreId).toHaveBeenCalledWith("1");
        expect(setSelectedGenre).toHaveBeenCalledWith("1");
    });
});
