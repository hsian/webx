import { css } from 'lit'
import { vars } from '../styles/tokens.js'

export default [
    vars,
    css`
        :host {
            display: inline-block;
            width: 100%;
        }

        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius);
            background: var(--color-background);
            outline: 2px solid rgba(0, 0, 0, 0);
            outline-offset: -2px;
            transition: outline-color 0.3s ease, border-color 0.3s ease;
        }

        .input-wrapper:hover {
            border: 1px solid var(--color-secondary);
        }

        .input-wrapper:focus-within {
            outline: 2px solid var(--color-secondary);
        }

        .input-wrapper[disabled] {
            border-color: var(--color-border-disabled);
        }

        .input-wrapper[disabled] input {
            color: var(--color-text-placeholder);
            cursor: not-allowed;
        }

        .input-wrapper[success] {
            border-color: var(--color-secondary);
        }

        .input-wrapper[error] {
            border-color: var(--color-red);
        }

        .input-wrapper input {
            flex: 1;
            font-size: var(--font-size-normal);
            padding: 10px 16px;
            border: none;
            outline: none;
            background: transparent;
            color: inherit;
        }

        .input-wrapper.s input {
            padding: 8px 14px;
            font-size: 12px;
        }

        .input-wrapper.m input {
            padding: 10px 14px;
            font-size: 14px;
        }

        .input-wrapper.l input {
            padding: 14px 14px;
            font-size: 16px;
        }

        ::slotted([slot='prefix']) {
            display: inline-flex;
            align-items: center;
            padding-left: 10px;
        }
    `,
];