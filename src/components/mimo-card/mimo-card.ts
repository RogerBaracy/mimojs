import template from './mimo-card.html?raw'
import style from './mimo-card.css?raw'

export class MimoCard extends HTMLElement {

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

customElements.define('mimo-card', MimoCard)
