import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { updateEmail } from "firebase/auth";

function BootstrapModal(props) {
  const auth = getAuth();
  //const userRef = db.collection("users").doc(auth.currentUser.uid);
  //const userSnapshot = await userRef.get();

  //console.log(userRef);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  //console.log(auth.currentUser.displayName);

  const handleClose = () => {
    props.onClose();
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  function isValidEmail(email) {
    // Use a regular expression to check for a valid email format
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  const submitChanges = async () => {
    //check email and name
    if (formData.name.length < 3) {
      toast.error("Nevažeće ime");
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Nevažeći email");
    }
    //save to db
    if (formData.name.length >= 3 && isValidEmail(formData.email)) {
      try {
        //update in fb
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
          email: formData.email,
        });
        //update in firestore
        //mjenja u collectionu
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          firstName: formData.name,
          email: formData.email,
        });

        //change in authentication

        toast.success(`Uspješeno spremljene promjene`);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`ne radi`);
    }
    //close modal
    props.onClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} className="bootstrapModal">
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>Promjeni osobne podatke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <p>Ime: </p>
          <input
            type="text"
            placeholder="Ime"
            className="modalInputWidth inputMarginBottom"
            name="modalInput"
            onChange={onChange}
            id="name"
            value={formData.name}
          />
          <p>Novi email: </p>
          <input
            type="text"
            placeholder="Novi email"
            className="modalInputWidth"
            name="modalInput"
            onChange={onChange}
            id="email"
            value={formData.email}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "rgb(171, 0, 8)", border: "none" }}
            onClick={submitChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;
