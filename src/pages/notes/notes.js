import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import NoteCard from "../../components/cards/NoteCard";
import { NoteInput } from "../../components/inputs/NoteInput";
import { toast } from "react-toastify";
import { Spin } from "antd";
import {
  createNoteRequest,
  deleteNoteRequest,
  fetchNotesRequest,
  updateNoteRequest,
} from "../../services/note.service";
import { AddNotesModal } from "../../components/modals/AddNoteModal";
import { noteCreateBg, spinBg } from "./style";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [isNotesLoading, setNotesLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreateNote = async (noteBodyText) => {
    await createNote(noteBodyText);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // api fetching
  const fetchNotes = async () => {
    const { data } = await fetchNotesRequest();
    if (!data) {
      toast.error("Notes could not be fetched");
      return;
    }
    setNotes(data.items);
    setNotesLoading(false);
  };

  const deleteNote = async (id) => {
    const { data } = await deleteNoteRequest(id);
    if (!data) {
      toast.error("Note could not be deleted");
      return;
    }
    await fetchNotes();
    toast.success("Note is deleted succesfully :)");
  };

  const updateNote = async (id, body) => {
    const { data } = await updateNoteRequest(id, body);
    if (!data) {
      toast.error("Note could not be updated!");
      return;
    }
    await fetchNotes();
  };

  const createNote = async (body) => {
    const { data } = await createNoteRequest(body);
    if (!data) {
      toast.error("Note could not be created");
      return;
    }
    await fetchNotes();
    setNotesLoading(false);
    toast.success("Note is created succesfully :)");
  };

  const renderNotes = () => {
    return notes.map((note) => {
      const { id, noteBody, xPosition, yPosition, createdAt } = note;
      return (
        <NoteCard
          id={id}
          key={id}
          noteBody={noteBody}
          xPosition={xPosition}
          yPosition={yPosition}
          createdAt={createdAt}
          onDeleteNote={deleteNote}
          onUpdateNote={updateNote}
        />
      );
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Col className="App" style={{ height: "100vh" }}>
        <Col className="noteCreateBg" style={noteCreateBg}>
          <NoteInput showModal={showModal} onCreateNote={createNote} />
        </Col>
        <br /> <br />
        {isNotesLoading ? (
          <Col style={spinBg}>
            <Spin size="large" />
          </Col>
        ) : (
          <Row>
            <Col>{renderNotes()}</Col>
          </Row>
        )}
      </Col>

      <AddNotesModal
        label="Create note using mark down format!"
        title="Add Note"
        isModalVisible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleCreateNote}
      />
    </>
  );
}

export default NotesPage;
