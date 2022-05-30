import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState,useEffect } from "react";
import { LabelDescription } from "../styles";

export const EditNotesModal = (props) => {
  const {label, title, show, noteBody, onCancel, onSubmit } = props;
  const [currentNoteText, setCurrentNoteText] = useState(noteBody);

  useEffect(() => {

    if (currentNoteText !==noteBody) {
      const handleTabClose = (event) => {
        event.preventDefault();
        return (event.returnValue = "Are you sure you want to exit?");
      };
      window.addEventListener("beforeunload", handleTabClose);
      return () => {
        window.removeEventListener("beforeunload", handleTabClose);
      };
    }
  }, [currentNoteText]);
  return (
    <Modal
      title={title}
      visible={show}
      onOk={() =>{ onSubmit(currentNoteText)}}
      onCancel={onCancel}
    >
      <LabelDescription >
        {label}
      </LabelDescription>
      <TextArea
        rows={4}
        value={currentNoteText}
        onChange={(e) => setCurrentNoteText(e.target.value)}
        placeholder="Write your note here.."
      />
    </Modal>
  );
};
