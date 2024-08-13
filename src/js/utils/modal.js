import Notes from "../data/notes.js";

const modal = () => {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const formNote = document.getElementById("formNote");

  openModalBtn.addEventListener("click", () => {
    resetForm();
    modalElement.classList.remove("hidden");
    modal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  formNote.addEventListener("submit", (e) => {
    e.preventDefault();
    const newNote = {
      title: e.target.title.value,
      body: e.target.bodyNote.value,
    };

    Notes.addNewNote({ ...newNote });
    formNote.reset();
    modal.classList.add("hidden");
  });

  const resetForm = () => {
    formNote.reset();
  };
};

export default modal;
