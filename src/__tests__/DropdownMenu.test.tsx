import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {DropdownMenu} from "../components/DropdownMenu";
// eslint-disable-next-line jest/no-mocks-import
import genresMock from "../__mocks__/genresMock";
import {useAppSelector} from '../store/hooks';


jest.mock('../store/hooks', () => ({
    useAppSelector: jest.fn(),
}));

describe("DropdownMenu component", () => {

    beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue('1');
    });

    it("should render correctly with more than 4 genres", () => {
        render(
            <DropdownMenu items={genresMock} setByClick={() => {
            }} title={"More"} showingLength={5} renderItem={(item) => <div>{item.name}</div>
            }/>
        );
        expect(screen.getByTestId("more-button")).toBeInTheDocument();
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        expect(screen.getByText("genre1")).toBeInTheDocument();
        expect(screen.getByText("genre7")).toBeInTheDocument();
    });

    it("should close the dropdown menu when a genre is clicked", () => {
        render(
            <DropdownMenu items={genresMock} setByClick={() => {
            }} title={"More"} showingLength={4} renderItem={(item) => <div>{item.name}</div>
            }/>
        );
        expect(screen.getByTestId("more-button")).toBeInTheDocument();
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        expect(screen.getByText("genre1")).toBeInTheDocument();
        fireEvent.click(screen.getByText("genre1"));
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("should call the setGenreId function when a genre is clicked", () => {
        const setByClick = jest.fn();
        render(
            <DropdownMenu items={genresMock} setByClick={setByClick} title={"More"} showingLength={4} renderItem={(item) => <div>{item.name}</div>
            }/>
        );
        const moreButton = screen.getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        fireEvent.click(screen.getByText("genre1"));
        expect(setByClick).toHaveBeenCalledWith("1");
    });

    it("should render correctly the title", () => {
        render(
            <DropdownMenu items={genresMock} setByClick={() => {
            }} title={"More"} showingLength={4} renderItem={(item) => <div>{item.name}</div>
            }/>
        );
        expect(screen.getByText("More")).toBeInTheDocument();
    });

});
