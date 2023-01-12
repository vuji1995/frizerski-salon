import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { collection } from "firebase/firestore";
import { useEffect } from "react";

function BootstrapModal(props) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [formData, setFormData] = useState({
    name: "",
    email: auth.currentUser.email,
    lastName: "",
    phoneNumber: "",
  });

  const getUserCollection = async () => {
    // Get user Collection
    let userData;
    const userCollection = await getDocs(collection(db, "users"));
    // Loop user collection
    userCollection.forEach((doc) => {
      // Check if current user is equal with user collection data
      if (currentUser.uid === doc.id) {
        // Store it in user data state
        //setUserData(doc.data());
        userData = doc.data();
        setFormData({
          name: auth.currentUser.displayName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
        });
      }
    });
  };

  useEffect(() => {
    getUserCollection();
  }, []);

  const handleClose = () => {
    props.onClose();
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  function isValidPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/ /g, "");
    if (phoneNumber.length !== 9 && phoneNumber.length !== 10) {
      return false;
    }
    if (
      !["091", "092", "095", "097", "098", "099"].includes(
        phoneNumber.substring(0, 3)
      )
    ) {
      return false;
    }
    return true;
  }

  const submitChanges = async () => {
    //check firstName and lastName
    formData.name = formData.name.replace(/ /g, "");
    formData.lastName = formData.lastName.replace(/ /g, "");

    if (formData.name.length < 3) {
      toast.error("Nevažeće ime");
      return;
    }
    if (formData.lastName.length < 3) {
      toast.error("Nevažeće prezime");
      return;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      toast.error("Nevažeći broj telefona");
      return;
    }

    //save to db
    if (formData.name.length >= 3 && formData.lastName.length >= 3) {
      try {
        //update in fb
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
        //update in firestore
        //mjenja u collectionu
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          firstName: formData.name,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
        });

        toast.success(`Uspješeno spremljene promjene`);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`Unesite ispravne podatke `);
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
          <p>Prezime: </p>
          <input
            type="text"
            placeholder="Prezime"
            className="modalInputWidth inputMarginBottom"
            name="modalInput"
            onChange={onChange}
            id="lastName"
            value={formData.lastName}
          />
          <p>Broj mobitela: </p>
          <input
            type="text"
            placeholder="Broj mobitela"
            className="modalInputWidth"
            name="modalInput"
            onChange={onChange}
            id="phoneNumber"
            value={formData.phoneNumber}
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
