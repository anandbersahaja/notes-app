class AddNote extends HTMLElement {
  _width = 50;
  _height = 50;

  static get observedAttributes() {
    return ["diameter", "color"];
  }
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  _updatedStyle() {
    this._style.textContent = `
    button {
      border: none;
    }
    .add-btn {
      width: ${this._width}px;
      height: ${this._height}px;
      display: flex;
      position: fixed;
      bottom: 25px;
      right: 25px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      background: rgb(255, 130, 37, 0.7);
      color: #ddd;
      padding: 0;
      box-shadow: 0 0 13px 0.7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
      z-index: 1000;
    }
      .add-btn:hover {
        background: rgb(255, 130, 37);
        font-weight: 800;
        color: white;
      }
      .add-btn:active {
        scale: 0.9;
        border: none;
        outline: none;
      }
      .add-btn:focus {
        outline: none;
        border: none;
      }
      .w-26 {
        width: 26px;
        stroke-width: 3;
    }`;
  }

  set width(value) {
    const newValue = Number(value);
    if (isNaN(newValue)) {
      console.error("Width must be a number");
      return;
    }
    this._width = value;
  }
  get width() {
    return this._width;
  }

  set height(value) {
    const newValue = Number(value);
    if (isNaN(newValue)) {
      console.error("Height must be a number");
      return;
    }
    this._height = value;
  }

  get height() {
    return this._height;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }
  connectedCallback() {
    this._shadowRoot.appendChild(this._style);
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <button class="add-btn" id="openModalBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="size-6 w-26"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "width":
          this.width = newValue;
          break;
        case "height":
          this.height = newValue;
          break;
      }
      this.render();
    }
  }
}

customElements.define("add-note", AddNote);
