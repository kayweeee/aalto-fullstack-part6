import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, {
    content: content,
    votes: 0,
  });
  return response.data;
};

const vote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const anecdote = await axios.get(anecdoteUrl);

  const response = await axios.put(anecdoteUrl, {
    ...anecdote.data,
    votes: anecdote.data.votes + 1,
  });

  return response.data;
};

export default { getAll, createNew, vote };
