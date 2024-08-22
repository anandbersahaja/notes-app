import { unArchivedNote, archivedNote, createNote } from "./note.js";

import { resetForm } from "../utils/utils.js";

const home = async () => {
  // Form
  const formNote = document.getElementById("formNote");

  // Modal
  const modal = document.getElementById("modal");
  const formTitle = document.getElementById("formTitle");
  const openModalBtn = document.querySelector("add-note");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Filter
  const archivedFilter = document.getElementById("archivedFilter");
  archivedFilter.addEventListener("click", archivedNote); // EVENT LISTENER FILTER
  const unArchivedFilter = document.getElementById("unArchivedFilter");
  unArchivedFilter.addEventListener("click", unArchivedNote); // EVENT LISTENER FILTER

  unArchivedNote(); // run unArchivedNote script

  // EVENT LISTENER FORM
  formNote.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newNote = {
      title: e.target.title.value,
      body: e.target.bodyNote.value,
    };

    // Menambahkan note baru ke API
    createNote(newNote);

    formNote.reset();
    modal.classList.add("scale-0");
  });

  // EVENT LISTENER OPEN MODAL
  openModalBtn.addEventListener("click", () => {
    formTitle.textContent = "Add Note";
    resetForm(formNote);
    modal.classList.remove("scale-0");
  });

  // EVENT LISTENER CLOSE MODAL
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("scale-0");
  });
};

export default home;
