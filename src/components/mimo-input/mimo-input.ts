import template from "./mimo-input.html?raw";
import style from "./mimo-input.css?raw";
import { BaseComponent } from "@core/base-component";

export class MimoInput extends BaseComponent {
  public template = template;
  public stylesheet = style;

  protected elementSelector = "#input";

  protected attributeList = [
    "value",
    "disabled",
    "readonly",
    "maxlength",
    "size",
    "placeholder",
    "type",
  ];

  protected init(): void {
    this.element.addEventListener("input", (e: any) => {
      const newValue = e.target.value;

      if (newValue === this._value) return;

      this._value = newValue;
      this.emit("valueChange", this._value);
    });
  }

  protected render(): void {
    const input = this.element as HTMLInputElement;

    input.value = this.getAttribute("value") ?? "";

    this.setAttributes(
      this.getAttributes([
        "disabled",
        "readonly",
        "maxlength",
        "size",
        "placeholder",
        "type",
      ]),
    );
  }
}

customElements.define("mimo-input", MimoInput);
