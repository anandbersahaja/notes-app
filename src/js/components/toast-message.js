class ToastMessage extends HTMLElement {
  constructor() {
    super();
    this._messages = [];
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this._toastContainer = document.createElement("div");
    this._toastContainer.setAttribute("class", "toast-container");
  }
  _updateStyle() {
    this._style.textContent = `
    .toast-container {
      position: fixed;
      top: 50px;
      right: 30px;
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      z-index: 9999;
      font-size: 1rem;
    }
    .toast {
      background: white;
      border: 1px solid var(--tertiary-color);
      width: 100%;
      color: var(--tertiary-color);
      padding: 0px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-weight: 600;
    }
    button {
      border: none;
    }
    .toast-icon {
      font-size: 1rem;
      font-weight: 700;
      background: none;
      color: var(--tertiary-color);
      cursor: pointer;
      opacity: 0.6;
    }
    .toast-icon:hover {
      opacity: 1;
    }
    .toast-message {
      font-size: 0.9rem;
    }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
    this._toastContainer.innerHTML = "";
  }

  appendMessage(message) {
    const toast = document.createElement("div");
    toast.setAttribute("class", "toast");

    const toastMessage = document.createElement("p");
    toastMessage.setAttribute("class", "toast-message");
    toastMessage.textContent = message;

    const toastIcon = document.createElement("button");
    toastIcon.setAttribute("class", "toast-icon");
    toastIcon.textContent = "X";

    toastIcon.addEventListener("click", () => {
      this._messages.shift();
      toast.remove();
    });

    toast.appendChild(toastMessage);
    toast.appendChild(toastIcon);

    this._messages.push(toast);
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.appendChild(this._toastContainer);
    this._messages.forEach((message) => {
      setTimeout(() => {
        this._messages.shift();
        message.remove();
      }, 3000);
      this._toastContainer.appendChild(message);
    });
  }
}

customElements.define("toast-message", ToastMessage);
