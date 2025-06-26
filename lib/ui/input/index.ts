import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './styles'

@customElement('ui-input')
export class Input extends LitElement {
  static styles = styles

  @property({ type: String })
  accessor value: string = ''

  @property({ type: String })
  accessor placeholder: string = ''

  @property({ type: String })
  accessor password: string = ''
  
  @property({ type: Boolean })
  accessor disabled: boolean = false

  @property({ type: Boolean })
  accessor success: boolean = false

  @property({ type: Boolean })
  accessor error: boolean = false

  @property({ type: String })
  accessor size: 's' | 'm' | 'l' = 'm';

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(new CustomEvent('input-change', { detail: { value: this.value } }))
  }

  render() {
    return html`
      <div class="${this.size} input-wrapper" 
      ?disabled=${this.disabled} 
      ?success=${this.success} 
      ?error=${this.error}>
        <slot name="prefix"></slot>
        <input
          .value=${this.value}
          .placeholder=${this.placeholder}
          .disabled=${this.disabled}
          .password=${this.password}
          @input=${this.handleInput}
        />
        <slot name="suffix"></slot>
      </div>
    `
  }
}
