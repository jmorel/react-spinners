/** @jsx jsx */
import * as React from "react";
import { keyframes, css, jsx } from "@emotion/core";
import { Keyframes } from "@emotion/serialize";
import onlyUpdateForKeys from "recompose/onlyUpdateForKeys";

import { sizeMarginDefaults, sizeMarginKeys } from "./helpers";
import { PrecompiledCss, LoaderSizeMarginProps, StyleFunctionWithIndex } from "./interfaces";

const pulse: Keyframes = keyframes`
  0% {transform: scale(1);opacity: 1}
  45% {transform: scale(0.1);opacity: 0.7}
  80% {transform: scale(1);opacity: 1}
`;

class Loader extends React.PureComponent<LoaderSizeMarginProps> {
  public static defaultProps: LoaderSizeMarginProps = sizeMarginDefaults(15);

  public style: StyleFunctionWithIndex = (i: number): PrecompiledCss => {
    const { color, size, sizeUnit, margin } = this.props;

    return css`
      background-color: ${color};
      width: ${`${size}${sizeUnit}`};
      height: ${`${size}${sizeUnit}`};
      margin: ${margin};
      border-radius: 100%;
      display: inline-block;
      animation: ${pulse} 0.75s ${i * 0.12}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      animation-fill-mode: both;
    `;
  };

  public render(): JSX.Element | null {
    const { loading, css } = this.props;

    return loading ? (
      <div css={[css]}>
        <div css={this.style(1)} />
        <div css={this.style(2)} />
        <div css={this.style(3)} />
      </div>
    ) : null;
  }
}

const Component: React.ComponentClass<LoaderSizeMarginProps> = onlyUpdateForKeys(sizeMarginKeys)(
  Loader
);
Component.defaultProps = Loader.defaultProps;
export default Component;
