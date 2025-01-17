import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { matchers } from "jest-emotion";
expect.extend(matchers);

import ScaleLoader from "../src/ScaleLoader";
import { LoaderHeightWidthRadiusProps } from "../src/interfaces";
import { heightWidthRadiusDefaults } from "../src/helpers";

describe("ScaleLoader", () => {
  let loader: ReactWrapper;
  let props: LoaderHeightWidthRadiusProps;
  let defaultColor: string = "#000000";
  let defaultHeight: number = 35;
  let defaultWidth: number = 4;
  let defaultRadius: number = 2;

  it("should match snapshot", () => {
    loader = mount(<ScaleLoader />);
    expect(loader).toMatchSnapshot();
  });

  it("should contain default props if no props are passed", () => {
    props = loader.props();
    expect(props).toEqual(heightWidthRadiusDefaults(defaultHeight, defaultWidth, defaultRadius));
  });

  it("should contain styles created using default props", () => {
    for (let i: number = 0; i < 5; i++) {
      expect(loader.find("div div").at(i)).toHaveStyleRule("background-color", defaultColor);
      expect(loader.find("div div").at(i)).toHaveStyleRule("height", `${defaultHeight}px`);
      expect(loader.find("div div").at(i)).toHaveStyleRule("width", `${defaultWidth}px`);
      expect(loader.find("div div").at(i)).toHaveStyleRule("margin", "2px");
      expect(loader.find("div div").at(i)).toHaveStyleRule("border-radius", `${defaultRadius}px`);
    }
  });

  it("should render null if loading prop is set as false", () => {
    loader = mount(<ScaleLoader loading={false} />);
    expect(loader.isEmptyRender()).toBe(true);
  });

  it("should render the correct color based on prop", () => {
    let color: string = "#e2e2e2";
    loader = mount(<ScaleLoader color={color} />);
    for (let i: number = 0; i < 5; i++) {
      expect(loader.find("div div")).not.toHaveStyleRule("background-color", defaultColor);
      expect(loader.find("div div")).toHaveStyleRule("background-color", color);
    }
  });

  it("should render the correct size based on props", () => {
    let height: number = 18;
    let width: number = 20;
    let radius: number = 5;
    loader = mount(<ScaleLoader height={height} width={width} radius={radius} />);
    expect(loader.find("div div")).not.toHaveStyleRule("height", `${defaultHeight}px`);
    expect(loader.find("div div")).not.toHaveStyleRule("width", `${defaultWidth}px`);
    expect(loader.find("div div")).not.toHaveStyleRule("border-radius", `${defaultRadius}px`);
    expect(loader.find("div div")).toHaveStyleRule("height", `${height}px`);
    expect(loader.find("div div")).toHaveStyleRule("width", `${width}px`);
    expect(loader.find("div div")).toHaveStyleRule("border-radius", `${radius}px`);
  });

  it("should render the css override based on props", () => {
    loader = mount(
      <ScaleLoader css={"position: absolute; width: 100px; height: 200px; color: blue;"} />
    );
    expect(loader).toHaveStyleRule("position", "absolute");
    expect(loader).toHaveStyleRule("width", "100px");
    expect(loader).toHaveStyleRule("height", "200px");
    expect(loader).toHaveStyleRule("color", "blue");
  });
});
