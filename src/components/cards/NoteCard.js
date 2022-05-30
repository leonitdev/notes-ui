import { Card, Col } from "antd";
import React, { useState } from "react";
import Draggable from "react-draggable"; // The default
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Skeleton } from "antd";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";
import { toast } from "react-toastify";
import { EditNotesModal } from "../modals/EditNotesModal";
import { SpanDate } from "../styles";
import { CardStyle } from "./style";

function NoteCard(props) {
  const {
    id,
    noteBody,
    xPosition,
    yPosition,
    createdAt,
    onDeleteNote,
    onUpdateNote,
  } = props;

  const nodeRef = useRef(null);
  const [isNoteLoading, setNoteLoading] = useState(false);
  const [updatedNoteBody, setUpdatedNoteBody] = useState(noteBody);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleOk = async (notebodyText) => {
    await onUpdateNote(id, { noteBody: notebodyText, xPosition, yPosition });
    setUpdatedNoteBody(updatedNoteBody);
    toast.success("Note is updated succesfully!");
    setIsModalVisible(false);
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <Draggable
        onStop={(_, data) => {
          onUpdateNote(id, {
            noteBody,
            xPosition: data.lastX + data.deltaX,
            yPosition: data.lastY + data.deltaY,
          });
        }}
        defaultPosition={{ x: xPosition ?? 15, y: yPosition ?? 15 }}
        nodeRef={nodeRef}
      >
        <Col ref={nodeRef} className="">
          {isNoteLoading ? (
            <Skeleton style={{ width: 300 }} />
          ) : (
            <Card
              bodyStyle={{ padding: "20px" }}
              style={CardStyle}
              actions={[
                <EditFilled onClick={showModal} />,
                <DeleteFilled
                  onClick={async () => {
                    setNoteLoading(true);
                    await onDeleteNote(id);
                    setNoteLoading(false);
                  }}
                />,
              ]}
            >
              <SpanDate>
                {createdAt}
              </SpanDate>
              <ReactMarkdown>{noteBody}</ReactMarkdown>
            </Card>
          )}
        </Col>
      </Draggable>
      <EditNotesModal
        show={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleOk}
        noteBody={noteBody}
        title="Update Note"
        label={"Update note using mark down format!"}
      />
    </>
  );
}

export default NoteCard;
