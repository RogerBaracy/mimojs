export abstract class BaseComponent extends HTMLElement {
  protected shadow!: ShadowRoot;
  protected element!: HTMLElement;

  protected _value: any = "";

  public abstract template: string;
  public abstract stylesheet: string;
  protected abstract elementSelector: string;
  protected abstract attributeList: string[];

  private initialized = false;

  constructor() {
    super();
  }

  static get observedAttributes(): string[] {
    return this.prototype.attributeList || [];
  }

  connectedCallback(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.shadow = this.attachShadow({ mode: "open" });

    this.shadow.innerHTML = `
      <style>${this.stylesheet}</style>
      ${this.template}
    `;

    this.element = this.shadow.querySelector(
      this.elementSelector,
    ) as HTMLElement;

    if (!this.element) {
      console.error(
        `${this.tagName} -> elemento ${this.elementSelector} não encontrado`,
      );
      return;
    }

    this.init();
    this.render();
  }

  attributeChangedCallback(): void {
    if (!this.initialized) return;
    this.render();
  }

  protected init(): void {}

  protected setAttributes(attributes: Record<string, any>): void {
    if (!this.element) return;

    Object.entries(attributes).forEach(([name, value]) => {
      if (value === false || value === null || value === undefined) {
        this.element.removeAttribute(name);
        return;
      }

      if (value === true) {
        this.element.setAttribute(name, "");
        return;
      }

      this.element.setAttribute(name, String(value));
    });
  }

  protected getAttributes(names: string[]): Record<string, any> {
    const attrs: Record<string, any> = {};

    names.forEach((name) => {
      if (this.hasAttribute(name)) {
        const value = this.getAttribute(name);
        attrs[name] = value === "" ? true : value;
      }
    });

    return attrs;
  }

  protected emit(eventName: string, value: any): void {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  set value(val: any) {
    this._value = val;
    this.setAttribute("value", val);
    this.render();
  }

  get value(): any {
    return this._value;
  }

  protected abstract render(): void;
}
