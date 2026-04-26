export abstract class BaseComponent extends HTMLElement {
  protected shadow!: ShadowRoot;

  // Template HTML e CSS que cada componente define
  protected abstract htmlTemplate: string;
  protected abstract cssStyles: string;

  // Elemento raiz do componente (ex: #input, #root, etc)
  protected abstract elementSelector: string;

  // Lista de atributos que o componente observa
  protected abstract attributesList: string[];

  protected abstract eventsList: string[];

  // Elemento principal (input, div, etc)
  protected element!: HTMLElement;

  protected _value: any;

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.render();
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  // Quando o componente entra no DOM
  connectedCallback(): void {
    this.renderTemplate(); // 🔥 PRIMEIRO

    this.element = this.shadow.querySelector(
      this.elementSelector,
    ) as HTMLElement;

    if (!this.element) {
      console.error(
        `${this.tagName} -> elemento ${this.elementSelector} não encontrado`,
      );
      return;
    }

    this.init(); // ✅ agora pode usar
    this.render();
  }

  private renderTemplate() {
    this.shadow.innerHTML = `
      <style>${this.cssStyles}</style>
      ${this.htmlTemplate}
    `;
  }

  // Observa atributos automaticamente
  static get observedAttributes() {
    return [];
  }

  // Quando atributo muda
  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // ===============================
  // 🔁 UTILIDADES
  // ===============================

  // Retorna atributos atuais como objeto
  protected getAttributes(names: string[]) {
    const attrs: Record<string, any> = {};

    names.forEach((name) => {
      const value = this.getAttribute(name);
      if (value !== null) {
        attrs[name] = value;
      }
    });

    return attrs;
  }

  // Aplica atributos no elemento interno
  protected setAttributes(attrs: Record<string, any>) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        this.element.removeAttribute(key);
      } else {
        this.element.setAttribute(key, value);
      }
    });
  }

  // Emite eventos padrão
  protected emit(eventName: string, detail?: any) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ===============================
  // 🔒 MÉTODOS ABSTRATOS
  // ===============================

  protected abstract init(): void;
  protected abstract render(): void;
}
