import { LOGIN_USER, SET_SCORE } from '../action';

const INICIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  case SET_SCORE:
    return ({
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    });
  default:
    return state;
  }
};

export default playerReducer;
