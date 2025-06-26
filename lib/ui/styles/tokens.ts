import { css } from 'lit'

export const vars = css`
  * {
    box-sizing: border-box;
  }

  :host {
    --color-primary: #0043ce;
    --color-secondary: #0f62fe;
    --color-red: #ff0000;

    --color-text: #161616;
    --color-text-secondary: #525252;
    --color-text-placeholder: #a6a6a6;
    --color-reversed-text: #fff;
    
    --color-background: #fff;
    --color-background-disabled: #8d8d8d;
    --color-background-notification: #edf5ff;

    --color-border: #8d8d8d;
    --color-border-disabled: #a6a6a6;

    --border-radius: 0;

    --font-size-normal: 14px;

    --size-small-height: 24px;
    --size-medium-height: 40px;
    --size-large-height: 56px;
  }
`
