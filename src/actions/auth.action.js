import * as api from '../api/api-calls';
import { types } from '../constants/actionTypes';

export const signin = (formData, history) => async(dispatch) => {
  try {
    const {data} = await api.signin(formData);
    dispatch({ type: types.AUTH, data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, history) => async(dispatch) => {
  try {
    const {data} = await api.signup(formData);
    dispatch({ type: types.AUTH, data });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}