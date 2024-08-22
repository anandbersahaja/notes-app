import { NotesApi } from "../data/remote/notes-api.js";

const contentSection = document.querySelector("section.content"); // Main contentSection
const cardList = document.createElement("div"); // Card list
cardList.classList.add("card-list");
const notFound = document.createElement("not-found"); // Not found component

export const unArchivedNote = async () => {
  try {
    const notes = await NotesApi.getNotes();
    render(notes.data);
  } catch (error) {
    console.error(error);
    render([]);
  }
};

export const archivedNote = async () => {
  try {
    const notes = await NotesApi.getArchivedNotes();
    render(notes.data);
  } catch (error) {
    console.error(error);
    render([]);
  }
};

export const createNote = async (note) => {
  try {
    const res = await NotesApi.createNewNote(note);
    await res.json();
    unArchivedNote();
  } catch (error) {
    console.error(error);
  }
};

const render = (notes) => {
  contentSection.innerHTML = "";

  if (notes.length <= 0) {
    contentSection.appendChild(notFound);
    return;
  }
  contentSection.appendChild(cardList);
  cardList.innerHTML = "";
  notes.forEach((note) => {
    cardList.appendChild(createNoteItem(note));
  });
};

const deleteNote = async (id) => {
  try {
    await NotesApi.deleteNote(id);
    unArchivedNote();
  } catch (error) {
    console.error(error);
  }
};

export const createNoteItem = (note) => {
  // Membuat element note-item
  const noteItem = document.createElement("note-item");
  noteItem.setAttribute("id", note.id);

  const btnDelete = document.createElement("btn-delete");
  btnDelete.setAttribute("slot", "delete");
  btnDelete.setId(note.id);
  noteItem.appendChild(btnDelete);

  btnDelete.addEventListener("click", (e) => {
    const id = e.target.closest("btn-delete").id;
    deleteNote(id);
  });

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

  return noteItem;
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
