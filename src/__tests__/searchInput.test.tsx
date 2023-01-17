import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import { SearchInput } from "../components/searchInput";

describe("SearchInput", () => {
  it("should call setSearchValue on input change", () => {
    const setSearchValue = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput setSearchValue={setSearchValue} />
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(setSearchValue).toBeCalledWith("test");
  });
});