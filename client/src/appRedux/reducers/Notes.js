import {
  FETCH_ALL_NOTES_SUCCESS,
  GET_STICKY,
  NOTES_UPDATE,
  UPDATE_ALL_NOTES_SUCCESS,
} from "../../constants/ActionTypes";

const INIT_STATE = {
  notesList: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STICKY: {
      return {
        ...state,
        notesList: action.notesList,
      };
    }

    case FETCH_ALL_NOTES_SUCCESS: {
      return {
        ...state,
        notesList: action.payload,
      };
    }

    case UPDATE_ALL_NOTES_SUCCESS: {
      return {
        ...state,
        notesList: action.payload,
      };
    }

    case NOTES_UPDATE:
      return {
        ...state,
        notesList: action.notesList,
      };

    default:
      return state;
  }
};
