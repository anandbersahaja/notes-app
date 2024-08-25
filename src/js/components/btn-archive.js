class BtnArchive extends HTMLElement {
  constructor() {
    super();
    this._isArchived = false;
    this._style = document.createElement("style");
  }

  setId(id) {
    this.setAttribute("id", id);
    this.render();
  }

  setIsArchived(value) {
    this._isArchived = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      .tooltip {
        position: relative;
        display: inline-block;
      }
      .tooltip-text {
        visibility: hidden;
        width: 120px;
        background-color: #173b45;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 5px 0;
        position: absolute;
        z-index: 101;
        bottom: 150%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .tooltip:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
      .tooltip-text::after {
        content: "";
        position: absolute;
        top: 100%; /* Posisi panah di bawah tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #173b45 transparent transparent transparent;
    }
      .icon {
          width: 20px;
          stroke-width: 2;
        }
      .btn-archive {
        color: #173b45;
        cursor: pointer;
        background: none;
        border: none;
        opacity: 0.6;
      }
      .btn-archive:hover {
        opacity: 1;
        }
        `;
  }
  _emptyContent() {
    this.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.appendChild(this._style);
    if (!this._isArchived) {
      this.innerHTML += `
      <div class="tooltip">
        <button class="btn-archive tooltip-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </button>
      <span class="tooltip-text">Archive</span>
      </div>
    `;
    } else {
      this.innerHTML += `
      <div class="tooltip">
        <button class="btn-archive tooltip-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
      </button>
      <span class="tooltip-text">Unarchive</span>
      </div>
    `;
    }
  }
}

customElements.define("btn-archive", BtnArchive);
