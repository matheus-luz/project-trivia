export const LOGIN_USER = 'LOGIN_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const SET_SCORE = 'SET_SCORE';

export const loginUser = (payload) => ({ type: LOGIN_USER, payload });

export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const setScore = (payload) => ({ type: SET_SCORE, payload });

export const tokenAPI = () => async (dispatch) => {
  try {
    const token = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenResponse = await token.json();
    dispatch(getToken(tokenResponse.token));
  } catch (e) {
    return (e);
  }
};
