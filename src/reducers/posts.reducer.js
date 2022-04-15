import { types } from "../constants/actionTypes";

export default (state = {isLoading: true, posts: []}, action) => {
  switch (action.type) {
    case types.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.STOP_LOADING:
      return {
        ...state,
        isLoading: false ,
      };
    case types.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        curentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case types.FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case types.FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload
      };
    case types.CREATE:
      return {
        ...state, 
        posts: [...state.posts, action.payload]
      };
    case types.UPDATE:
      return { 
        ...state, 
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      };
    case types.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      };
    default:
      return state;
  }
};
