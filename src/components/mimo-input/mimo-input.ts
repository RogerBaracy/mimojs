import template from './mimo-input.html?raw'
import style from './mimo-input.css?raw'

export class MimoInput extends HTMLElement {

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${style}</style>
      ${template}
    `
  }

  connectedCallback() {

  }

}

customElements.define('mimo-input', MimoInput)
