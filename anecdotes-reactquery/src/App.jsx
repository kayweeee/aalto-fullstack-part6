import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useContext } from "react";
import NotificationContext from "./components/NotificationContext";

const App = () => {
  const [noti, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "NOTI", payload: `anecdote '${anecdote.content}' voted` });
    setTimeout(() => dispatch({ type: "REMOVE" }), 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isLoading) {
    return <div>loading data</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
