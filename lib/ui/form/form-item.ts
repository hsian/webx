// ui-form-item.ts
import { css, html, LitElement } from 'lit'
import { property, queryAssignedElements } from 'lit/decorators.js'
import { vars } from '../styles/tokens.js'

export class UiFormItem extends LitElement {
  static styles = [
    vars,
    css`
      :host {
        display: block;
        margin-bottom: 24px;
      }
      .labelSlot {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      label {
        display: inline-block;
        padding-right: 10px;
        margin-bottom: 5px;
        flex-shrink: 0;
        font-size: 14px;
        text-align: right;
      }
      .horizontal {
        display: flex;
        align-items: center;
      }
      .vertical {
        display: block;
      }
      .error {
        margin-top: 3px;
        color: var(--color-red);
        font-size: 12px;
      }
    `,
  ]

  @property({ type: String })
  accessor labelWidth: string = '' // Default label width

  @property({ type: String })
  accessor value: string = ''

  @property({ type: String })
  accessor label: string = ''

  @property({ type: String })
  accessor name: string = ''

  @property({ type: String })
  accessor errorMessage: string = ''

  @property({ type: String })
  accessor layout: 'x' | 'y' = 'x'

  @queryAssignedElements({ slot: 'default' })
  _slotChildren!: HTMLElement[]

  firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot')!
    this._slotChildren = slot.assignedElements({ flatten: true }) as HTMLElement[]

    this._slotChildren.forEach(item => {
      if ('value' in item) {
        (item as any).value = (this.parentElement as any)?.formData?.[this.name] ?? ''
      }

      if ('error' in item) {
        (item as any).error = Boolean(this.errorMessage)
      }
    })
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties)
    if (changedProperties.has('labelWidth')) {
      const labelElement = this.shadowRoot?.querySelector('label')
      if (labelElement) {
        labelElement.style.width = this.labelWidth
      }
    }

    this._slotChildren?.forEach(item => {
      if ('error' in item) {
        ; (item as any).error = Boolean(this.errorMessage)
      }

      if (!(item.tagName.toLowerCase() === 'ui-input')) {
        this.addEventListener('click', this._onInput)
      }
    })
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('input', this._onInput)
  }

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement
    if (this.name) {
      this.dispatchEvent(
        new CustomEvent('field-change', {
          detail: { name: this.name, value: target.value },
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  render() {
    const layoutClass = this.layout === 'x' ? 'horizontal' : 'vertical'
    return html`
      <div class="labelSlot ${layoutClass}">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <slot></slot>
      </div>
      ${this.errorMessage
        ? html`
        <div
          class="error"
          style="margin-left: ${this.labelWidth}"
        >
          ${this.errorMessage}
        </div>
      `
        : ''
      }
    `
  }
}

customElements.define('ui-form-item', UiFormItem)
