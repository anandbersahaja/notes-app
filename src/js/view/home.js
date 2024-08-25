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
  archivedFilter.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.classList.add("active");
    unArchivedFilter.classList.remove("active");
  });

  const unArchivedFilter = document.getElementById("unArchivedFilter");
  unArchivedFilter.addEventListener("click", unArchivedNote); // EVENT LISTENER FILTER
  unArchivedFilter.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.classList.add("active");
    archivedFilter.classList.remove("active");
  });

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
    unArchivedFilter.classList.add("active");
    archivedFilter.classList.remove("active");

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
