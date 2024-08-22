class NotFound extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updatedStyle() {
    this._style.textContent = `
      .not-found {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        color: var(--secondary-color);
        opacity: 0.8;
      }
      .not-found > * {
        margin: 0;
      }
      .not-found > h3 {
        font-size: 1.5rem;
        font-weight: 500;
      }
      .not-found > p {
        font-size: 1rem;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this._shadowRoot.appendChild(this._style);
    this.render();
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="not-found hidden" id="notFound">
          <h3>No Notes Found</h3>
          <p>There is no note here</p>
        </div>
      `;
  }
}

customElements.define("not-found", NotFound);
