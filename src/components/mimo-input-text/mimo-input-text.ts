import template from "./mimo-input-text.html?raw";
import style from "./mimo-input-text.css?raw";
import { BaseComponent } from "@core/base-component";

export class MimoInputText extends BaseComponent {
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
      ]),
    );
  }
}

customElements.define("mimo-input-text", MimoInputText);
