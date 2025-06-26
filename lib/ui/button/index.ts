import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './style';

export class UiButton extends LitElement {
    static styles = styles

    @property({ type: Boolean })
    accessor disabled: boolean = false;

    @property({ type: String })
    accessor size: 's' | 'm' | 'l' = 'm';

    constructor() {
        super();
        this.disabled = false;
        this.size = 'm';
    }

    render() {
        return html`
            <button class="${this.size}" ?disabled=${this.disabled}>
                <slot></slot>
            </button>
        `;
    }
}

customElements.define('ui-button', UiButton);