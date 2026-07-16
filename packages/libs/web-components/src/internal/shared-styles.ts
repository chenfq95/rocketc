import { css } from 'lit';

/** Baseline host styles shared by Rocketc web components. */
export const hostStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--rds-typography-body-font-family);
    font-size: var(--rds-typography-body-font-size);
    line-height: var(--rds-typography-body-line-height);
    color: var(--rds-color-text-primary);
  }
  
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;
