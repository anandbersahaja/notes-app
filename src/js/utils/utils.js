const formNote = document.getElementById("formNote");

/**
 * Show loading
 * @param {HTMLElement} element
 */
export function showLoading(element) {
  element.classList.add("show");
}

/**
 * Hide loading
 * @param {HTMLElement} element
 */
export function hideLoading(element) {
  element.classList.remove("show");
}

/**
 * Reset form
 * @param {HTMLFormElement} element
 */
export const resetForm = (element) => {
  element.id.value = "";
  element.reset();
};

/**
 * Create note item
 * @param {Object} note
 * @returns {HTMLElement}
 */
export const createNoteItem = (note) => {
  // Membuat element note-item
  const noteItem = document.createElement("note-item");
  noteItem.setAttribute("id", note.id);

  // Membuat element title note
  const title = document.createElement("h2");
  title.setAttribute("slot", "title");
  title.textContent = note.title;
  noteItem.appendChild(title);

  // Membuat element date note
  const date = document.createElement("span");
  date.setAttribute("slot", "createdAt");
  date.setAttribute("class", "tertiary-text");
  const dateF = new Date(note.createdAt);
  date.textContent = dateF.toDateString();
  noteItem.appendChild(date);

  // Membuat element body note
  const bodyNote = document.createElement("div");
  bodyNote.setAttribute("slot", "body");
  const p = splitBodyNote(note); // Membuat paragraf dari body note

  bodyNote.appendChild(p);
  noteItem.appendChild(bodyNote);

  // Event listener edit note
  addEditNoteListener(note, noteItem);

  return noteItem;
};

/**
 * add evenet listener 'edit' to note item
 * @param {note, HTMLElement} noteItem
 */
// Event listener edit note
const addEditNoteListener = (note, noteItem) => {
  noteItem.addEventListener("click", (e) => {
    formTitle.textContent = "Edit Note";
    const id = e.target.closest("note-item").id;

    formNote.id.value = id;
    formNote.title.value = note.title;
    formNote.bodyNote.value = note.body;
    modal.classList.remove("hidden");
  });
};

/**
 * Split body note
 * @param {Object} note
 * @returns {HTMLParagraphElement}
 */
const splitBodyNote = ({ body }) => {
  const p = document.createElement("p");
  body.split("\n").forEach((item) => {
    p.innerHTML += `${item}<br>`;
  });
  return p;
};
