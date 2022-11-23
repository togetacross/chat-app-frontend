import { useReducer, useCallback } from 'react';
//import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  error: null,
  data: null,
  identifier: null,
  reqExtra: null
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
        fieldErrors: null
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra
      };
    case 'ERROR':
      return {
        ...curHttpState,
        loading: false,
        error: action.errorMessage,
        fieldErrors: action.fieldErrors
      };
    default:
      throw new Error('Should not be reached!');
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
  const sendRequest = useCallback(async (reqIdentifier, reqExtra, requestData) => {

    dispatchHttp({ type: 'SEND', identifier: reqIdentifier });

    try {

      const responseData = await requestData;
      dispatchHttp({ type: 'RESPONSE', responseData: responseData.data, extra: reqExtra });

    } catch (error) {

      if (error.response.status === 404) {

        dispatchHttp
          ({
            type: 'ERROR',
            errorMessage:
            {
              message: error.response?.data?.message || 'Something went wrong!'
            }
          });
        console.log(error);
      } else if (error.response.status === 400) {
        dispatchHttp
          ({
            type: 'ERROR',
            errorMessage:
            {
              message: error.response?.data?.message || 'Something went wrong!',
              details: error.response.data?.details
            }
          });
        console.log(error);
      } else {
        dispatchHttp
          ({
            type: 'ERROR',
            errorMessage: { message: error.message || 'Something went wrong!' }
          });
        console.log(error);
      }
    }

  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    requestIdentifier: httpState.identifier,
  };
};

export default useHttp;
