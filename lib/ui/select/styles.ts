import { css } from 'lit'
import { vars } from '../styles/tokens.js'

export default [
    vars,
    css`
        :host {
            display: inline-block;
            position: relative;
            width: 100%;
        }
        .select {
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            background: #fff;
        }
        .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-background);
            z-index: 10;
            margin: 0;
            padding: 0;
            max-height: 200px;
            overflow-y: auto;
            box-shadow: 0 2px 6px var(--color-shadow);
            font-size: 14px;
        }
        .dropdown li {
            list-style: none;
            padding: 0 15px;
            cursor: pointer;
            transition: background 0.3s ease, border-color 0.3s ease;
        }
        .dropdown li.active {
            background: var(--color-background-secondary);
        }
        .dropdown li.active .content {
            border-bottom: none;
        }
        .dropdown .content {
            display: block;
            padding: 8px 0;
            border-bottom: 1px solid var(--color-border-secondary);
            margin-top: -1px;
        }
        .dropdown li:hover {
            background: var(--color-background-secondary);
            outline: 2px solid var(--color-border);
            outline-offset: -2px;
        }
        .hidden {
            display: none;
        }
        i {
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #000;
            transition: transform 0.3s ease;
        }
        i.open {
            transform: rotate(180deg);
        }
    `
]