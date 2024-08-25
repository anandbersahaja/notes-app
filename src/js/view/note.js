import { NotesApi } from "../data/remote/notes-api.js";

const modal = document.querySelector("modal-note");
const contentSection = document.querySelector("section.content"); // Main contentSection
const cardList = document.createElement("div"); // Card list
cardList.classList.add("card-list");
const notFound = document.createElement("not-found"); // Not found component
const loading = document.querySelector("loading-content");
const toastMessage = document.querySelector("toast-message");

export const unArchivedNote = async (e) => {
  try {
    showLoading();
    const notes = await NotesApi.getNotes();
    render(notes.data, false);
  } catch (error) {
    console.error(error);
    render([]);
  } finally {
    hideLoading();
  }
};

export const archivedNote = async () => {
  try {
    showLoading();
    const notes = await NotesApi.getArchivedNotes();
    render(notes.data, true);
  } catch (error) {
    console.error(error);
    render([]);
  } finally {
    hideLoading();
  }
};

export const createNote = async (note) => {
  try {
    showLoading();
    const res = await NotesApi.createNewNote(note);
    await res.json();
    unArchivedNote();
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
    toastMessage.appendMessage("New Note created successfully");
  }
};

const render = (notes, isArchived = false) => {
  contentSection.innerHTML = "";

  if (notes.length <= 0) {
    contentSection.appendChild(notFound);
    return;
  }
  contentSection.appendChild(cardList);
  cardList.innerHTML = "";
  notes.forEach((note) => {
    cardList.appendChild(createNoteItem(note, isArchived));
  });
};

const deleteNote = async (id) => {
  try {
    showLoading();
    await NotesApi.deleteNote(id);
    unArchivedNote();
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
    toastMessage.appendMessage("Note deleted successfully");
  }
};

const archiveNote = async (id) => {
  try {
    showLoading();
    await NotesApi.archiveNote(id);
    unArchivedNote();
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
    toastMessage.appendMessage("Note archived successfully");
  }
};

const unarchiveNote = async (id) => {
  try {
    showLoading();
    await NotesApi.unarchiveNote(id);
    archivedNote();
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
    toastMessage.appendMessage("Unarchive note successfully");
  }
};

export const createNoteItem = (note, isArchived = false) => {
  // Membuat element note-item
  const noteItem = document.createElement("note-item");
  noteItem.setAttribute("id", note.id);
  noteItem.addEventListener("click", () => {
    modal.setNoteDetail(note);
    modal.display = true;
  });

  // Jika tidak diarsip tidak diberi tombol delete
  if (!isArchived) {
    const btnDelete = document.createElement("btn-delete");
    btnDelete.setAttribute("slot", "delete");
    btnDelete.setId(note.id);
    noteItem.appendChild(btnDelete);

    btnDelete.addEventListener("click", (e) => {
      const id = e.target.closest("btn-delete").id;
      confirm("Are you sure want to delete this note?") && deleteNote(id);
    });
  }

  const btnArchive = document.createElement("btn-archive");
  btnArchive.setAttribute("slot", "archive");
  btnArchive.setId(note.id);
  btnArchive.setIsArchived(isArchived);
  noteItem.appendChild(btnArchive);

  btnArchive.addEventListener("click", (e) => {
    e.stopPropagation();
    const id = e.target.closest("btn-archive").id;
    if (isArchived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
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

const showLoading = () => {
  loading.setVisible(true);
};
const hideLoading = () => {
  loading.setVisible(false);
};
