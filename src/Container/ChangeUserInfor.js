import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "../Style/ChangeUserInfor.css";

class ChangeUserInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  toggle = () =>
    this.setState({
      modal: !this.state.modal,
    });
  render() {
    const { modal } = this.state;
    return (
      <div>
        <Button
          color="success"
          onClick={this.toggle}
          className="edit-profile-btn"
        >
          Edit your profile
        </Button>
        <Modal isOpen={modal} toggle={this.toggle} className="">
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <div className="edit-form-container">
              <p className="edit-title">Update your information</p>
              <form className="edit-user-form">
                <div>
                  <label className="edit-title-lb">User name</label>
                  <input type="text" placeholder="Name"></input>
                </div>
                <div>
                  <label className="edit-title-lb">Address</label>
                  <input type="text" placeholder="Address"></input>
                </div>
                <div>
                  <label className="edit-title-lb">Password</label>
                  <input type="text" placeholder="Password"></input>
                </div>
                <div>
                  <input type="file"></input>
                </div>
                <div className="edit-user-btn-container">
                  <button type="onclick" className="edit-user-btn">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ChangeUserInfor;
