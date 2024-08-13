import Notes from "../data/notes.js";

const home = () => {
  // Card List
  const cardList = document.querySelector(".card-list");

  // Form
  const formNote = document.getElementById("formNote");

  // Modal
  const modal = document.getElementById("modal");
  // const openModalBtn = document.getElementById("openModalBtn");
  const openModalBtn = document.querySelector("add-note");
  const closeModalBtn = document.getElementById("closeModalBtn");

  const notes = Notes.getAll();

  // Membuat note item
  const createNoteItem = (note) => {
    const noteItem = document.createElement("note-item");
    noteItem.setAttribute("id", note.id);

    const title = document.createElement("h2");
    title.setAttribute("slot", "title");
    title.textContent = note.title;
    noteItem.appendChild(title);

    const date = document.createElement("span");
    date.setAttribute("slot", "createdAt");
    date.setAttribute("class", "tertiary-text");
    const dateF = new Date(note.createdAt);
    date.textContent = dateF.toDateString();
    noteItem.appendChild(date);

    const bodyNote = document.createElement("div");
    bodyNote.setAttribute("slot", "body");
    const p = splitBodyNote(note);

    bodyNote.appendChild(p);
    noteItem.appendChild(bodyNote);

    noteItem.addEventListener("click", (e) => {
      const id = e.target.closest("note-item").id;
      const note = Notes.getNoteById(id);
      const formNote = document.getElementById("formNote");

      formNote.id.value = id;
      formNote.title.value = note.title;
      formNote.bodyNote.value = note.body;
      modal.classList.remove("hidden");
    });
    cardList.appendChild(noteItem);
  };

  // Membuat paragraf dari body note
  const splitBodyNote = ({ body }) => {
    const p = document.createElement("p");
    body.split("\n").forEach((item) => {
      p.innerHTML += `${item}<br>`;
    });
    return p;
  };

  // Render notes
  const renderNotes = () => {
    cardList.innerHTML = "";
    notes.forEach((note) => createNoteItem(note));
  };

  renderNotes();

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
      createNoteItem(note);
    }

    formNote.reset();
    modal.classList.add("hidden");
  });

  // EVENT LISTENER MODAL
  const resetForm = () => {
    formNote.id.value = "";
    formNote.reset();
  };

  openModalBtn.addEventListener("click", () => {
    resetForm();
    modal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
};

export default home;
