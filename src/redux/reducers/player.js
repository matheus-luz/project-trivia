import { LOGIN_USER } from '../action';

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
  default:
    return state;
  }
};

export default playerReducer;
