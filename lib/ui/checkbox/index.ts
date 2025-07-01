import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'

export class UiCheckbox extends LitElement {
    @property({ type: Boolean })
    accessor checked = false

    @property({ type: Boolean })
    accessor disabled = false

    @property({ type: String })
    accessor value = ''

    @property({ type: String })
    accessor name = ''

    static styles = css`
        :host {
            display: inline-block;
        }
        .checkbox {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }
        .checkbox[disabled] {
            cursor: not-allowed;
            opacity: 0.6;
        }
        .checkbox-box {
            width: 16px;
            height: 16px;
            border: 2px solid #000;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            background-color: var(--checkbox-bg, #fff);
            position: relative;
        }
        .checkbox-box.checked {
            background-color: var(--checkbox-checked-bg, #000);
        }
        .checkbox-box.checked::after {
            content: '✔';
            color: #fff;
            font-size: 10px;
            line-height: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 16px;
            height: 16px;
            display: flex;
            justify-content: center; 
            align-items: center;
        }
    `

    private toggleChecked() {
        if (!this.disabled) {
            this.checked = !this.checked
            this.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        checked: this.checked,
                        value: this.value,
                        name: this.name,
                    },
                }),
            )
        }
    }

    render() {
        return html`
            <div
                class="checkbox"
                ?disabled=${this.disabled}
                @click=${this.toggleChecked}
            >
                <div class="checkbox-box ${this.checked ? 'checked' : ''}"></div>
                <slot></slot>
            </div>
        `
    }
}

customElements.define('ui-checkbox', UiCheckbox)
