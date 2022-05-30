import axios from "axios";
import { baseUrl } from "./constants/notes.constant";

export const fetchNotesRequest = async () => {
  try {
    const data = await axios.get(baseUrl);
    return data;
  } catch (error) {
    return error;
  }
};

export const createNoteRequest = async (body) => {
  try {
    const data = await axios.post(baseUrl, {
      noteBody: body,
      xPosition: 15,
      yPosition: 15,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteNoteRequest = async (id) => {
  try {
    const data = await axios.delete(`${baseUrl}${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateNoteRequest = async (id, body) => {
  try {
    const data = await axios.put(`${baseUrl}${id}`, body);
    return data;
  } catch (error) {
    return error;
  }
};
