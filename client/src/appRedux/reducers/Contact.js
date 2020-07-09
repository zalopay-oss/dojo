import {
  DELETE_CONTACT_SUCCESS,
  GET_All_CONTACT_SUCCESS,
  ON_ADD_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  contactList: [],
  selectedContact: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_All_CONTACT_SUCCESS: {
      return {
        ...state,
        contactList: action.payload,
      };
    }

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contactList: state.contactList.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contactList: state.contactList.filter(
          (contact) => contact.id !== action.payload.id
        ),
      };

    case ON_ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contactList: action.payload.contact(state.contactList),
      };

    default:
      return state;
  }
};
