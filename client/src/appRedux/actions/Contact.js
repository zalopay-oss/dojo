import {
  FETCH_START,
  FETCH_SUCCESS,
  GET_All_CONTACT_SUCCESS,
} from "../../constants/ActionTypes";
import { database } from "../../firebase/firebase";

export const onGetAllContact = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    database.ref("/contact").on("value", (snapshot) => {
      dispatch({ type: FETCH_SUCCESS });
      dispatch({
        type: GET_All_CONTACT_SUCCESS,
        payload: snapshot.val(),
      });
    });
  };
};

export const onAddContact = (contact) => {
  return (dispatch) => database.ref("/contact").push(contact);
};

export const onUpdateContact = (id, contact) => {
  return (dispatch) => database.ref("/contact").child(id).update(contact);
};

export const onDeleteContact = (id) => {
  return (dispatch) => database.ref("/contact").child(id).remove();
};
