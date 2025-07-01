import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../input';
import styles from './styles'

export class UiSelect extends LitElement {
    static styles = styles;

    @property({ type: Array }) 
    accessor options: Array<{ value: string; label: string }> = [];

    @property({ type: String }) 
    accessor value: string = '';

    @property({ type: Boolean }) 
    accessor open: boolean = false;

    @state()
    accessor filterText: string = '';

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.handleOutsideClick);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick);
        super.disconnectedCallback();
    }

    private handleOutsideClick = (event: MouseEvent) => {
        const path = event.composedPath();
        if (!path.includes(this)) {
            this.open = false;
        }
    };

    private toggleDropdown() {
        this.open = !this.open;
    }

    private selectOption(value: string) {
        this.value = value;
        this.open = false;
        this.filterText = ''; // Clear filter text after selection
        this.dispatchEvent(new CustomEvent('select-change', { detail: { value: this.value } }));
    }

    private handleInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.filterText = input.value;
    }

    private getFilteredOptions() {
        return this.options.filter(option =>
            option.label.toLowerCase().includes(this.filterText.toLowerCase())
        );
    }

    render() {
        const selectedLabel = this.options.find(option => option.value === this.value)?.label || '';
        const filteredOptions = this.getFilteredOptions();

        return html`
            <div class="select">
            <ui-input 
                value="${this.filterText || selectedLabel}" 
                @input=${this.handleInput} 
                @click=${this.toggleDropdown}>
                <i slot="suffix" class="${this.open ? 'open' : ''}"></i>
            </ui-input>
            </div>
            <ul class="dropdown ${this.open ? '' : 'hidden'}">
                ${filteredOptions.map(
                    (option) => html`
                    <li class="${option.value === this.value ? 'active' : ''}" @click=${() => this.selectOption(option.value)}>
                        <div class="content">${option.label}</div>
                    </li>
                    `
                )}
            </ul>
        `;
    }
}

customElements.define('ui-select', UiSelect);