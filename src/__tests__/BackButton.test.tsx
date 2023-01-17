import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import { BackButton } from "../components/BackButton";

describe("BackButton", () => {
    it("should call openInfoCard on click", () => {
        const openInfoCard = jest.fn();
        const { getByText } = render(
            <BackButton openInfoCard={openInfoCard} />
        );

        const button = getByText("Close Detail");
        fireEvent.click(button);

        expect(openInfoCard).toBeCalled();
    });
});