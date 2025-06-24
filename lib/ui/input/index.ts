import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyleSheet } from '../styles/shared.js';

@customElement('ui-input')
export class Input extends LitElement {
  static styles = [
    sharedStyleSheet,
    css`
      :host {
        display: inline-block;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        background: var(--color-background);
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        gap: 0.5rem;
      }

      ::slotted([slot='prefix']) {
        display: inline-flex;
        align-items: center;
      }

      input {
        flex: 1;
        font-size: 1rem;
        padding: 0.25rem 0.5rem;
        border: none;
        outline: none;
        background: transparent;
        color: inherit;
      }

      :host([disabled]) input {
        background: #eee;
        cursor: not-allowed;
      }
    `
  ];

  @property({ type: String }) accessor value: string = '';
  @property({ type: String }) accessor placeholder: string = '';

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input-change', { detail: { value: this.value } }));
  }

  render() {
    return html`
      <div class="input-wrapper">
        <slot name="prefix"></slot>
        <input
          .value=${this.value}
          .placeholder=${this.placeholder}
          @input=${this.handleInput}
        />
      </div>
    `;
  }
}
