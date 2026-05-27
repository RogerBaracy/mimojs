import style from "./mimo-button.css?raw";
import { ButtonBaseComponent } from "@core/button-base-component";

export class MimoButton extends ButtonBaseComponent {
  private static styleInjected = false;

  protected attributesList: string[] = ["type", "disabled", "label"];
  protected eventsList: string[] = ["click", "mouseover", "mouseout"];

  constructor() {
    super();
  }

  protected init(): void {
    if (!MimoButton.styleInjected) {
      const styleEl = document.createElement("style");
      styleEl.textContent = style;
      styleEl.setAttribute("data-mimo-style", "mimo-button");
      document.head.appendChild(styleEl);
      MimoButton.styleInjected = true;
    }

    this.classList.add("mimo-button");
  }

  protected render(): void {
    this.setAttributes(this.getAttributes(this.attributesList));

    if (!this.hasAttribute("type")) {
      this.setAttribute("type", "button");
    }

    const label = this.getAttribute("label");
    if (label !== null) {
      this.textContent = label;
    }
  }

  static get observedAttributes() {
    return ["type", "disabled", "label"];
  }
}

customElements.define("mimo-button", MimoButton, { extends: "button" });
