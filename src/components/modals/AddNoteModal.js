import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { LabelDescription } from "../styles";

export const AddNotesModal = (props) => {
  const { label, title, isModalVisible, onCancel, onSubmit } = props;

  const [currentNoteText, setCurrentNoteText] = useState("");

  useEffect(() => {
    if(currentNoteText.length){
    const handleTabClose = (event) => {
        console.log("currentNoteText: ",currentNoteText);
        event.preventDefault();
        console.log("beforeunload event triggered");
        console.log("event: ",event);
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
      visible={isModalVisible}
      onOk={() => {
        setCurrentNoteText("");
        onSubmit(currentNoteText);
      }}
      onCancel={onCancel}
    >
      <LabelDescription>{label}</LabelDescription>
      <TextArea
        rows={4}
        value={currentNoteText}
        onChange={(e) => setCurrentNoteText(e.target.value)}
        placeholder="Write your note here.."
      />
    </Modal>
  );
};
