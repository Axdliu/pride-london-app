// @flow
import React from "react";
import { shallow } from "enzyme";
import EventMap from "./EventMap";
import openMapLink from "./openMapLink";

jest.mock("./openMapLink", () => jest.fn());

it("renders correctly", () => {
  const output = shallow(
    <EventMap lat={100} lon={200} locationName="somewhere" />
  );
  expect(output).toMatchSnapshot();
});

it("opens a map on tap", () => {
  const output = shallow(
    <EventMap lat={100} lon={200} locationName="somewhere" />
  );
  output.simulate("press");
  expect(openMapLink).toBeCalledWith(100, 200, "somewhere");
});
