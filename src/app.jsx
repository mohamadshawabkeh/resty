import { useState, useEffect, useReducer } from 'react';
import Header from './components/header/index';
import Footer from './components/footer';
import Form from './components/form/index';
import Results from './components/results/index';
import './app.scss';
import History from './components/history/index';

const initialState = {
  loading: false,
  responseData: null,
  error: null,
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
        responseData: null,
      };
    case 'API_SUCCESS':
      return {
        ...state,
        loading: false,
        responseData: action.payload.responseData,
        history: [
          ...state.history,
          {
            method: action.payload.method,
            url: action.payload.url,
            results: action.payload.responseData,
          },
        ],
      };
    case 'API_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

function App() {
  const [requestData, setRequestData] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (requestData.url && requestData.method) {
      dispatch({ type: 'API_REQUEST' });

      fetch(requestData.url, {
        method: requestData.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData.data,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: 'API_SUCCESS',
            payload: {
              responseData: data,
              method: requestData.method,
              url: requestData.url,
            },
          });
        })
        .catch((error) => {
          dispatch({ type: 'API_ERROR', payload: { error } });
        });
    }
  }, [requestData]);

  const handleApiCall = (data) => {
    setRequestData(data);
  };

  return (
    <div className="app">
      <Header />
      <div className="request-info">
        <div>Request Method: {requestData.method}</div>
        <div>URL: {requestData.url}</div>
      </div>
      <Form handleApiCall={handleApiCall} />
      <History history={state.history} handleApiCall={handleApiCall} />
      <Results loading={state.loading} data={state.responseData} error={state.error} />
      <Footer />
    </div>
  );
}

export default App;
