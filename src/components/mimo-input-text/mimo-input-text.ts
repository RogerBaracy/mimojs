import template from "./mimo-input-text.html?raw";
import style from "./mimo-input-text.css?raw";
import { BaseComponent } from "@core/base-component";

export class MimoInputText extends BaseComponent {
  protected htmlTemplate = template;
  protected cssStyles = style;

  protected elementSelector = "#input";

  protected attributeList = [
    "value",
    "placeholder",
    "disabled",
    "readonly",
    "maxlength",
    "pattern",
  ];

  private input!: HTMLInputElement;
  private _value: string = "";

  // ===============================
  // 🚀 INIT
  // ===============================
  protected init(): void {
    this.input = this.element as HTMLInputElement;

    if (!this.input) {
      console.error("input não encontrado");
      return;
    }

    this.input.addEventListener("input", () => {
      const newValue = this.input.value;

      // evita re-render desnecessário
      if (newValue === this._value) return;

      this._value = newValue;

      // emite evento para Angular / externo
      this.emit("valueChange", this._value);
      this.removeAttribute("invalid"); // remove erro ao digitar
    });

    // Validação ao sair do campo
    this.input.addEventListener("blur", () => {
      this.validate();
    });
  }

  // ===============================
  // 🎨 RENDER
  // ===============================
  protected render(): void {
    if (!this.input) return;

    // aplica atributos no input
    this.setAttributes(this.getAttributes(this.attributeList));
    this.setAttribute("type", "text"); // força tipo text

    // sincroniza value com proteção
    const attrValue = this.getAttribute("value") ?? "";

    if (attrValue !== this._value) {
      this._value = attrValue;
    }

    // evita sobrescrever enquanto digita
    if (this.input.value !== this._value) {
      this.input.value = this._value;
    }
  }

  // ===============================
  // ✅ VALIDAÇÃO
  // ===============================
  private validate() {
    const isValid = this.input.checkValidity();

    if (!isValid) {
      this.setAttribute("invalid", "true");
    } else {
      this.removeAttribute("invalid");
    }

    // emite estado
    this.emit("validityChange", isValid);
  }

  // ===============================
  // 🔄 OBSERVED ATTRIBUTES
  // ===============================
  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "disabled",
      "readonly",
      "maxlength",
      "pattern",
    ];
  }
}

customElements.define("mimo-input-text", MimoInputText);
