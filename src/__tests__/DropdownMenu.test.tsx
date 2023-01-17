import React from "react";
import {render, fireEvent, waitFor, getByText} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {DropdownMenu} from "../components/DropdownMenu";
import genresMock from "../__mocks__/genresMock";
//doesnt work
describe("DropdownMenu component", () => {

    it("should render correctly with more than 4 genres", () => {
        const { getByTestId, getByText } = render(<DropdownMenu genres={genresMock} setGenreId={() => {}} />);
        expect(getByTestId("more-button")).toBeInTheDocument();
        const moreButton = getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        expect(getByText("genre1")).toBeInTheDocument();
        expect(getByText("genre7")).toBeInTheDocument();
    });

    it("should close the dropdown menu when a genre is clicked", () => {
        const { container, getByTestId, getByText } = render(<DropdownMenu genres={genresMock} setGenreId={() => {}} />);
        expect(getByTestId("more-button")).toBeInTheDocument();
        const moreButton = getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        expect(getByText("genre1")).toBeInTheDocument();
        fireEvent.click(getByText("genre1"));
        expect(container.querySelector(".dropdown-menu-genres")).toBeNull();

    });

    it("should call the setGenreId function when a genre is clicked", () => {
        const setGenreId = jest.fn();
        const { getByText, getByTestId } = render(<DropdownMenu genres={genresMock} setGenreId={setGenreId} />);
        const moreButton = getByTestId("more-button");
        fireEvent.mouseEnter(moreButton);
        fireEvent.click(getByText("genre1"));
        expect(setGenreId).toHaveBeenCalledWith("1");
    });
});
