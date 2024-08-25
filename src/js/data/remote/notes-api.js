const BASE_URL = " https://notes-api.dicoding.dev/v2";

export class NotesApi {
  /**
   * Method to create new note
   * @param {title, body}
   */
  static createNewNote({ title, body }) {
    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
  }

  /**
   * Method to get all notes from the API (non archived)
   * @return {Promise<Response>} - The response from the API
   */
  static async getNotes() {
    try {
      const res = await fetch(`${BASE_URL}/notes`);
      return res.json();
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
  }

  /**
   * Method to get archived notes
   * @return {Promise<Response>} - The response from the APIs
   */
  static async getArchivedNotes() {
    try {
      const res = await fetch(`${BASE_URL}/notes/archived`);
      return res.json();
    } catch (error) {
      console.error(error);
      return { data: [] };
    }
  }

  /**
   * Method to get single note by id
   * @param {id} - The id of the note
   * @return {Promise<Response>} - The response from the API
   */
  static getSingleNote(id) {
    return fetch(`${BASE_URL}/notes/${id}`);
  }

  /**
   * Method to arcihve note
   * @param {id} - The id of the note
   * @return {Promise<Response>} - The response from the API
   */
  static archiveNote(id) {
    return fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    });
  }

  /**
   * Method to unarchive note
   * @param {id} - The id of the note
   * @return {Promise<Response>} - The response from the API
   */
  static unarchiveNote(id) {
    return fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    });
  }

  /**
   * Method to delete note
   * @param {id} - The id of the note
   * @return {Promise<Response>} - The response from the API
   */
  static deleteNote(id) {
    return fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
  }
}
