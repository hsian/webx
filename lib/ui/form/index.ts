// ui-form.ts
import { css, html, LitElement } from 'lit'
import { property, queryAssignedElements } from 'lit/decorators.js'

export class UiForm extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
    `

    @property({ type: Object })
    accessor formData: Record<string, any> = {}

    @property({ type: Object })
    accessor rules: Record<string, ((value: any) => string | null)[]> = {}

    @property({ type: String })
    accessor labelWidth: string = ''

    @property({ type: String })
    accessor layout: 'x' | 'y' = 'x'

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('layout')) {
            this._items.forEach(item => {
                ;(item as any).layout = this.layout
            })
        }

        if (changedProperties.has('formData')) {
            this._items.forEach(item => {
                const name = (item as any).name
                if (name && this.formData.hasOwnProperty(name)) {
                    ;(item as any).value = this.formData[name]
                }
            })
        }
    }

    @queryAssignedElements({ selector: 'ui-form-item' })
    _items!: HTMLElement[]

    firstUpdated() {
        const slot = this.shadowRoot!.querySelector('slot')!
        slot.addEventListener('slotchange', () => {
            this._items = slot.assignedElements({ flatten: true }) as HTMLElement[]
            this.updateLabelWidth()
        })

        this._items = slot.assignedElements({ flatten: true }) as HTMLElement[]
        this.updateLabelWidth()

        this._items.forEach(item => {
            item.addEventListener('field-change', (e: Event) => {
                const detail = (e as CustomEvent).detail
                if (detail?.name) {
                    this.formData[detail.name] = detail.value
                    this.validateField(detail.name)
                }
            })
        })
    }

    updateLabelWidth() {
        this._items.forEach(item => {
            ;(item as any).labelWidth = this.labelWidth
        })
    }

    validateField(name: string) {
        const item = this._items?.find(el => (el as any).name === name)
        if (!item || !this.rules[name]) return
        const value = this.formData[name]
        const errors = this.rules[name]
            .map(rule => rule(value))
            .filter(msg => typeof msg === 'string')
        ;(item as any).errorMessage = errors[0] || ''
    }

    validateAll() {
        return new Promise((resolve, reject) => {
            const errors: Record<string, string> = {}
            let valid = true
            this._items.forEach(item => {
                const name = (item as any).name
                this.validateField(name)
                const errorMessage = (item as any).errorMessage
                if (errorMessage) {
                    errors[name] = errorMessage
                    valid = false
                }
            })

            if (valid) {
                resolve(this.formData)
            } else {
                reject(errors)
            }
        })
    }

    render() {
        return html`<slot></slot>`
    }
}

customElements.define('ui-form', UiForm)
