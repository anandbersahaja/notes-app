import "../components/index.js";
import Notes from "../data/notes.js";

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

    const bodyNote = document.createElement("p");
    bodyNote.setAttribute("slot", "body");
    bodyNote.textContent = note.body;
    noteItem.appendChild(bodyNote);

    cardList.appendChild(noteItem);
  };

  cardList.innerHTML = "";
  const cardItems = notes.forEach((note) => createNoteItem(note));

  console.log(cardItems);
};

app();
