import template from "./mimo-button.html?raw";
import style from "./mimo-button.css?raw";
import { BaseComponent } from "@core/base-component";

export class MimoButton extends BaseComponent {
  protected htmlTemplate: string = template;
  protected cssStyles: string = style;
  protected elementSelector: string = "mimo-button";
  protected attributesList: string[] = ["type", "disabled", "label"];
  protected eventsList: string[] = ["click"];

  protected init(): void {
    this.eventsList.forEach((eventName) => {
      this.element.addEventListener(eventName, (event) => {
        this.emit(eventName, event);
      });
    });
  }

  protected render(): void {
    if (!this.element) {
      console.error("Elemento não encontrado");
      return;
    }
    this.setAttributes(this.getAttributes(this.attributesList));
  }

  constructor() {
    super();
  }
}

customElements.define("mimo-button", MimoButton);
