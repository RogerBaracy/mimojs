import template from "./__KEBAB__.html?raw";
import style from "./__KEBAB__.css?raw";
import { BaseComponent } from "@core/base-component";

export class __CLASS__ extends BaseComponent {

  public template = template;
  public stylesheet = style;

  protected elementSelector = "#root";

  protected attributeList = [
    "value"
  ];

  protected init(): void {

  }

  protected render(): void {
    this.setAttributes(
      this.getAttributes([
        "value"
      ])
    );

  }
}

customElements.define("__KEBAB__", __CLASS__);