class LoadingContent extends HTMLElement {
  static oberservedAttributes = ["visible"];
  constructor() {
    super();

    this._visible = false;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  setVisible(value) {
    this._visible = value;
    this.render();
  }

  _updatedStyle() {
    this._style.textContent = `
    .loading {
      visibility: ${this._visible ? "visible" : "hidden"};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 102;
    }
    .loading-text {
      color: white;
      font-size: 1.1rem;
      margin-top: 14px;
    }
    .loading-animation {
      border: 5px solid #f3f3f3; 
      border-top: 5px solid var(--tertiary-color);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `;
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="loading">
      <div class="loading-animation"></div>
      <div class="loading-text">Loading</div>
    </div>
        `;
  }
}

customElements.define("loading-content", LoadingContent);
