import { useState } from 'react';
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {
  const [requestData, setRequestData] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiCall = (data) => {
    setLoading(true);
    setResponseData(null);
    setTimeout(() => {
      const fakeApiResponse = {
        count: 2,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
          },
          {
            name: 'Leia Organa',
            height: '150',
            skin_color: 'light',
            eye_color: 'brown',
            birth_year: '19BBY',
          },
        ],
      };

      setLoading(false);
      setRequestData(data);
      setResponseData(fakeApiResponse);
    }, 3000);
  };

  return (
    <>
      <Header />
      <div>Request Method: {requestData.method}</div>
      <div>URL: {requestData.url}</div>
      <Form handleApiCall={handleApiCall} />
      <Results loading={loading} data={responseData} />
      <Footer />
    </>
  );
}

export default App;
