import { css } from 'lit';
import { vars } from '../styles/tokens.js';

export default [
    vars,
    css`
        :host {
           
        }

        button {
            font-size: 16px;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            background-color: var(--color-primary);
            color: var(--color-reversed-text);
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: var(--color-secondary);
        }

        button:active {
            background-color: var(--color-primary);
        }

        button:disabled {
            background-color: var(--color-background-disabled);
            cursor: not-allowed;
        }

        button.s {
            height: var(--size-small-height);
            padding: 0 20px;
            font-size: 12px;
        }

        button.m {
            height: var(--size-medium-height);
            padding: 0 32px;
            font-size: 14px;
        }

        button.l {
            height: var(--size-large-height);
            padding: 0 46px;
            font-size: 16px;
        }
    `
]