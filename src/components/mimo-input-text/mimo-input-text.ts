import template from "./mimo-input-text.html?raw";
import style from "./mimo-input-text.css?raw";
import { BaseComponent } from "@core/base-component";

export class MimoInputText extends BaseComponent {
  protected htmlTemplate = template;
  protected cssStyles = style;

  protected elementSelector = "#input";

  protected attributesList = [
    "value",
    "placeholder",
    "disabled",
    "readonly",
    "maxlength",
    "pattern",
    "size",
    "required",
  ];

  protected eventsList = ["valueChange", "input", "change", "blur"];

  private input!: HTMLInputElement;

  constructor() {
    super();
  }

  // ===============================
  // 🚀 INIT
  // ===============================
  protected init(): void {
    this.input = this.element as HTMLInputElement;

    if (!this.input) {
      console.error("input não encontrado");
      return;
    }

    this.eventsList.forEach((eventName) => {
      this.input.addEventListener(eventName, (event) => {
        this.emit(eventName, event);
      });
    });

    this.input.addEventListener("input", () => {
      const newValue = this.input.value;

      // evita re-render desnecessário
      if (newValue === this._value) return;

      this._value = newValue;

      // emite evento para Angular / externo
      this.emit("valueChange", this._value);
      this.removeAttribute("valid");
      this.removeAttribute("invalid");
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
    this.setAttributes(this.getAttributes(this.attributesList));
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
    const hasPattern = this.input.hasAttribute("pattern");
    const hasRequired = this.input.hasAttribute("required");
    const isEmpty = this.input.value.trim() === "";

    let isValid = true;

    if (hasRequired && isEmpty) {
      isValid = false;
    } else if (isEmpty && !hasRequired) {
      // Campo opcional vazio deve ser considerado válido, mesmo com pattern.
      isValid = true;
    } else if (hasRequired || hasPattern) {
      isValid = this.input.checkValidity();
    }

    if (isValid) {
      this.removeAttribute("invalid");
      this.setAttribute("valid", "true");
    } else {
      this.removeAttribute("valid");
      this.setAttribute("invalid", "true");
    }

    this.emit("validityChange", isValid);

    if (isEmpty === true && hasRequired === false) {
      this.removeAttribute("valid");
      this.removeAttribute("invalid");
    }
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
      "size",
      "required",
    ];
  }
}

customElements.define("mimo-input-text", MimoInputText);
