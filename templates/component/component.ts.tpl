import template from "./__KEBAB__.html?raw";
import style from "./__KEBAB__.css?raw";
import { BaseComponent } from "@core/base-component";

export class __CLASS__ extends BaseComponent {

  public template = template;
  public stylesheet = style;

  protected elementSelector = "#root";

  protected attributesList = [
    "value"
  ];

  protected eventsList = ["valueChange", "input", "blur", "change"];

  protected init(): void {
    this.eventsList.forEach((eventName) => {
      this.input.addEventListener(eventName, (event) => {
        this.emit(eventName, event);
      });
    });

  }

  protected render(): void {
    this.setAttributes(
      this.getAttributes(this.attributesList)
    );
  }
}

customElements.define("__KEBAB__", __CLASS__);