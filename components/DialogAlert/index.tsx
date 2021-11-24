import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const propTypes = {};

interface DialogAlertI {
  content?: string;
  header?: string;
  isOpen: boolean | undefined;
  toggle: () => void;
}

const DialogAlert: React.FC<DialogAlertI> = (props) => {
  const {
    header = "Congraturation !",
    content = "Đặt hàng thành công, cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi. Đơn hàng của bạn sẽ sớm được gửi đến !",

    isOpen = false,
    toggle = () => {},
  } = props;
  //! State
  const dispatch = useDispatch();

  //! Function

  //! Render
  return (
    <Modal
      backdropTransition={{
        timeout: 1300,
      }}
      modalTransition={{
        timeout: 700,
      }}
      isOpen={isOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DialogAlert.propTypes = propTypes;
export default DialogAlert;
