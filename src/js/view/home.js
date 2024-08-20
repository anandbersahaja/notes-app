import Notes from "../data/local/notes.js";

import { resetForm, createNoteItem } from "../utils/utils.js";

const home = () => {
  // Card List
  const cardList = document.querySelector(".card-list");

  // Form
  const formNote = document.getElementById("formNote");

  // Modal
  const modal = document.getElementById("modal");
  const formTitle = document.getElementById("formTitle");
  const openModalBtn = document.querySelector("add-note");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Get all notes
  const notes = Notes.getAll();

  // Render notes
  const renderNotes = () => {
    cardList.innerHTML = "";
    notes.forEach((note) => {
      cardList.appendChild(createNoteItem(note));
    });
  };

  renderNotes(); // Render notes

  // EVENT LISTENER FORM
  formNote.addEventListener("submit", (e) => {
    e.preventDefault();
    const newNote = {
      id: e.target.id.value,
      title: e.target.title.value,
      body: e.target.bodyNote.value,
    };

    if (newNote.id) {
      Notes.saveNoteById({ ...newNote });
      renderNotes();
    } else {
      const note = Notes.addNewNote({ ...newNote });
      cardList.appendChild(createNoteItem(note));
    }

    formNote.reset();
    modal.classList.add("hidden");
  });

  // EVENT LISTENER OPEN MODAL
  openModalBtn.addEventListener("click", () => {
    formTitle.textContent = "Add Note";
    resetForm(formNote);
    modal.classList.remove("hidden");
  });

  // EVENT LISTENER CLOSE MODAL
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
};

export default home;
