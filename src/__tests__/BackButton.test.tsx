import React from "react";
import {render, fireEvent, screen} from "@testing-library/react";
import {BackButton} from "../components/BackButton";

describe("BackButton", () => {
    it("should call openInfoCard on click", () => {
        const openInfoCard = jest.fn();
        render(
            <BackButton openInfoCard={openInfoCard}/>
        );
        const button = screen.getByText("Close Detail");
        fireEvent.click(button);
        expect(openInfoCard).toBeCalled();
    });
});