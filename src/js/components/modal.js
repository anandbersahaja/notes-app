class Modal extends HTMLElement {
  constructor() {
    super();
    this._note = {
      title: "",
      body: "",
      createdAt: "",
    };
    this._display = false;

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyElement() {
    this._shadowRoot.innerHTML = "";
  }
  _updateStyle() {
    this._style.textContent = `
    .hidden {
      display: none;
    }
    .scale-0 {
      scale: 0;
    }
    .scale-1{
      scale: 1;
    }
    .modal {
      display: ${this._display ? "block" : "none"};
      border-top: 5px solid var(--tertiary-color);
      border-bottom: 5px solid transparent;
      box-sizing: border-box;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 550px;
      min-height: 300px;
      max-height: 400px;
      overflow-y: auto;
      background: white;
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      z-index: 9999;
      transition: all 0.3s;
      }
    .modal-header {
      position: relative;
      display: flex;
      gap:0px;
      flex-direction: column;
      color: var(--secondary-color);
      padding-inline: 20px;
      font-weight: 500;
      font-size: 1.1rem;
    }
      .date{
        color: var(--tertiary-color);
        font-size: 0.85rem;
        font-weight: 400;
      }
    .modal-content {
      margin: 0;
      padding-inline: 20px;
      padding-bottom: 10px;
      position: relative;
      font-size: 1rem;
      font-weight: 500;
      color: var(--secondary-color);
    }
    .modal-content > form {
      padding: 0 10px;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      font-size: 1.5rem;
      transition: all 0.3s;
      opacity: 0.8;
      scale: 1.2;
    }
    .close:active{
      scale: 1;
      }
    .close:hover {
      color: var(--tertiary-color);
      opacity: 1;
    }
    .close:active {
      transform: scale(0.9);
    }
    `;
  }

  connectedCallback() {
    this.render();
  }

  _addListener() {
    const modal = this._shadowRoot.querySelector("#modal");
    const closeModalBtn = this._shadowRoot.querySelector("#closeModalBtn");

    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("scale-0");
      setTimeout(() => {
        this._display = false;
      }, 300);
    });
  }

  setNoteDetail(note) {
    this._note = note;
  }

  set display(value) {
    this._display = value;
    this.render();
  }
  splitBody(body) {
    let temp = "";
    body.split("\n").forEach((item) => {
      temp += `${item}<br>`;
    });
    return temp;
  }

  render() {
    this._emptyElement();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div id="modal" class="modal">
          <div class="modal-header" id="modalHeader">
            <h3 id="formTitle">${this._note.title}</h3>
            <span class="date">${new Date(
              this._note.createdAt
            ).toDateString()}</span>
            <span class="close" id="closeModalBtn">&times;</span>
          </div>
          <div class="modal-content">
            <p>${this.splitBody(this._note.body)}</p>
          </div>
        </div>
    `;
    this._addListener();
  }
}
customElements.define("modal-note", Modal);
