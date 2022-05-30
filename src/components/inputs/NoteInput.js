import { Button, Col } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { Title } from "../styles";

export const NoteInput = (props) => {
  const { showModal } = props;

  return (
    <>
      <Col span={24}>
        <Title>Note your ideas!</Title>
        <br /> <br />
        <Col offset={22}>
          <Button
            type="ghost"
            icon={<PlusCircleFilled />}
            onClick={() => showModal()}
          >
            Add Note
          </Button>
        </Col>
      </Col>
    </>
  );
};
