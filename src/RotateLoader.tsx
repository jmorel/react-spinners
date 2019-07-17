/** @jsx jsx */
import React from "react";
import { keyframes, css, jsx } from "@emotion/core";
import onlyUpdateForKeys from "recompose/onlyUpdateForKeys";
import { sizeMarginDefaults, sizeMarginKeys } from "./helpers";
import { Keyframes } from "@emotion/serialize";
import {
  StyleFunction,
  PrecompiledCss,
  LoaderSizeMarginProps,
  StyleFunctionWithIndex
} from "./interfaces";

const rotate: Keyframes = keyframes`
  0% {transform: rotate(0deg)}
  50% {transform: rotate(180deg)}
  100% {transform: rotate(360deg)}
`;

class Loader extends React.PureComponent<LoaderSizeMarginProps> {
  static defaultProps: LoaderSizeMarginProps = sizeMarginDefaults(15);

  style: StyleFunctionWithIndex = (i: number): PrecompiledCss => css`
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: ${i % 2 ? -28 : 25}px;
  `;

  ball: StyleFunction = (): PrecompiledCss => {
    const { color, size, sizeUnit, margin } = this.props;

    return css`
      background-color: ${color};
      width: ${`${size}${sizeUnit}`};
      height: ${`${size}${sizeUnit}`};
      margin: ${margin};
      border-radius: 100%;
    `;
  };

  wrapper: StyleFunction = (): PrecompiledCss => {
    return css`
      ${this.ball()};
      display: inline-block;
      position: relative;
      animation-fill-mode: both;
      animation: ${rotate} 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);
    `;
  };

  long: StyleFunction = (): PrecompiledCss => css`
    ${this.ball()};
    ${this.style(1)};
  `;
  short: StyleFunction = (): PrecompiledCss => css`
    ${this.ball()};
    ${this.style(2)};
  `;

  render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? (
      <div css={[this.wrapper(), css]}>
        <div css={this.long()} />
        <div css={this.short()} />
      </div>
    ) : null;
  }
}

const Component = onlyUpdateForKeys(sizeMarginKeys)(Loader);
Component.defaultProps = Loader.defaultProps;
export default Component;