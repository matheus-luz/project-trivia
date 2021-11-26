const requestQuestions = async (token) => {
  const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await api.json();
  return response;
};

export default requestQuestions;
