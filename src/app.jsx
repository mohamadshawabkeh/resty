import { useState, useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import './app.scss';

function App() {
  const [requestData, setRequestData] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requestData.url && requestData.method) {
      setLoading(true);
      setError(null);
      setResponseData(null);

      // Send API request
      fetch(requestData.url, {
        method: requestData.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestData.data,
      })
        .then((response) => {
          // Parse JSON response
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setResponseData(data);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message || 'An error occurred');
        });
    }
  }, [requestData]);

  const handleApiCall = (data) => {
    setResponseData(null);
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
      <Results loading={loading} data={responseData} error={error} />
      <Footer />
    </div>
  );
}

export default App;
