export abstract class ButtonBaseComponent extends HTMLButtonElement {
  static readonly extendsTag = "button";

  protected abstract attributesList: string[];
  protected abstract eventsList: string[];

  protected _value: any;
  private initialized = false;

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.render();
  }

  connectedCallback(): void {
    if (!this.initialized) {
      this.init();
      this.initialized = true;
    }

    this.render();
  }

  public attributeChangedCallback(
    _name: string,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

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

  protected setAttributes(attrs: Record<string, any>) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false) {
        this.removeAttribute(key);
      } else if (value === true) {
        this.setAttribute(key, "");
      } else {
        this.setAttribute(key, String(value));
      }
    });
  }

  protected emit(eventName: string, detail?: any) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected abstract init(): void;
  protected abstract render(): void;
}
