import "../components/index.js";
import Notes from "../data/notes.js";
import "../utils/modal.js";

const app = () => {
  const cardList = document.querySelector(".card-list");
  const notes = Notes.getAll();

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
      console.log("click", e.target);
    });

    cardList.appendChild(noteItem);
  };

  const splitBodyNote = ({ body }) => {
    const p = document.createElement("p");
    body.split("\n").forEach((item) => {
      p.innerHTML += `${item}<br>`;
    });
    return p;
  };

  const renderNotes = () => {
    cardList.innerHTML = "";
    notes.forEach((note) => createNoteItem(note));
  };

  setInterval(() => {
    renderNotes();
  }, 1000);
};

app();
