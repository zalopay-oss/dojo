import {
  FETCH_ALL_NOTES_SUCCESS,
  GET_STICKY,
  NOTES_UPDATE,
  UPDATE_ALL_NOTES_SUCCESS,
} from "../../constants/ActionTypes";

export const onGetSticky = (notesList) => {
  return {
    type: GET_STICKY,
    notesList,
  };
};

export const fetchStickySuccess = (notesList) => {
  return {
    type: FETCH_ALL_NOTES_SUCCESS,
    payload: notesList,
  };
};

export const onUpdateSticky = (notesList) => {
  return {
    type: NOTES_UPDATE,
    notesList,
  };
};

export const updateStickySuccess = (notesList) => {
  return {
    type: UPDATE_ALL_NOTES_SUCCESS,
    payload: notesList,
  };
};
