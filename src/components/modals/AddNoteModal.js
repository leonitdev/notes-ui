import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { LabelDescription } from "../styles";

export const AddNotesModal = (props) => {
  const {label, title, isModalVisible, onCancel, onSubmit } = props;

  const [currentNoteText, setCurrentNoteText] = useState('');
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={() => onSubmit(currentNoteText)}
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
