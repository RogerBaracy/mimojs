import style from "./mimo-input.css?raw";
import template from "./mimo-input.html?raw";

export class MimoInput extends HTMLElement {
  private _value: string = "";
  private input!: HTMLInputElement;
  private _attributesConfig: Record<string, any> = {};

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>${style}</style>
      ${template}
    `;
  }

  public connectedCallback(): void {
    this.input = this.shadowRoot?.querySelector("#input") as HTMLInputElement;
    this.applyAllAttributes();

    if (!this.input) {
      console.error("input não encontrado no shadowDOM");
      return;
    }

    this.input.addEventListener("input", () => {
      this._value = this.input.value;

      this.dispatchEvent(
        new CustomEvent("valueChange", {
          detail: this._value,
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.render();
  }

  static get observedAttributes() {
    return ["value"];
  }

  set value(val: string) {
    this._value = val;

    this.render();
  }

  get value(): string {
    return this._value;
  }

  set attributesConfig(config: Record<string, any>) {
    this._attributesConfig = config;
    this.applyAllAttributes();
  }

  get attributesConfig(): Record<string, any> {
    return this._attributesConfig;
  }

  public setAttributes(config: Record<string, any>) {
    this._attributesConfig = config;
    this.applyAllAttributes();
  }

  // 🎯 aplica todos

  private applyAllAttributes() {
    if (!this.input) return;

    Object.entries(this._attributesConfig).forEach(([key, value]) => {
      this.applyAttribute(key, value);
    });
  }

  // 🎯 aplica um atributo

  private applyAttribute(name: string, value: any) {
    if (!this.input) return;

    if (value === false || value === null || value === undefined) {
      this.input.removeAttribute(name);
      return;
    }

    if (name === "value") {
      this.input.value = value;
      this._value = value;
      return;
    }

    if (value === true) {
      this.input.setAttribute(name, "");
      return;
    }

    this.input.setAttribute(name, String(value));
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ) {
    if (name === "value") {
      this.value = newValue;
    }
  }

  private render() {
    if (this.input) {
      this.input.value = this._value ?? "";
    }
  }
}

customElements.define("mimo-input", MimoInput);
