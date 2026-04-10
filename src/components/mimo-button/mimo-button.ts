import template from './mimo-button.html?raw'
import style from './mimo-button.css?raw'

export class MimoButton extends HTMLElement {

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

customElements.define('mimo-button', MimoButton)
