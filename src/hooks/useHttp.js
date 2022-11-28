import { useReducer, useCallback } from 'react';

const initialState = {
  data: null,
  error: null,
  loading: false,
};


const httpReducer = (state, action) => {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      loading: true,
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      loading: false,
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      loading: false,
    };
  }

  return state;
}

function useHttp() {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);
  const sendRequest = useCallback(async (requestData) => {
    try {
      dispatch({ type: 'SEND' });
      const responseData = await requestData;
      dispatch({ type: 'SUCCESS', responseData });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ERROR',
        errorMessage: error.response || 'Something went wrong!',
      });
    }
  },[]);

  return {
    ...httpState,
    sendRequest,
  };
}

export default useHttp;