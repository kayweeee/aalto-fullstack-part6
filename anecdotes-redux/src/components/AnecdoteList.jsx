import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }

    const filteredList = state.anecdotes.filter((anecdote) => {
      if (anecdote.content.toLowerCase().includes(state.filter.toLowerCase())) {
        return anecdote;
      }
    });
    return filteredList;
  });

  const vote = (id, content) => {
    dispatch(voteFor(id));
    dispatch(setNotification(`you voted "${content}"`, 5000));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
