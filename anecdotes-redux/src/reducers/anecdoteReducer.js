import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
    updateAnecdotes(state, action) {
      console.log(action.payload);
      const editedAnecdote = action.payload;
      return state
        .map((anecdote) =>
          anecdote.id === editedAnecdote.id ? editedAnecdote : anecdote
        )
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { appendAnecdote, setAnecdotes, updateAnecdotes } =
  anecdoteSlice.actions;

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteFor = (id) => {
  return async (dispatch) => {
    const editedAnecdote = await anecdoteService.vote(id);
    dispatch(updateAnecdotes(editedAnecdote));
  };
};

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
