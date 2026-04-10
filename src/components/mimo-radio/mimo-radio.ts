import template from './mimo-radio.html?raw'
import style from './mimo-radio.css?raw'

export class MimoRadio extends HTMLElement {

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

customElements.define('mimo-radio', MimoRadio)
