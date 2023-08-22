import { useState } from 'react';
import './form.scss';

function Form({ handleApiCall }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState(null); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setError(null);
      
      const requestData = {
        method,
        url,
        data: method === 'GET' ? null : JSON.parse(data),
      };
  
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          requestData.method !== 'GET' ? JSON.stringify(requestData.data) : null,
      });
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const responseData = await response.json();
  
      console.log('Response Data:', responseData);
  
      handleApiCall(requestData);
    } catch (error) {
      console.error('Error:', error);
  
      setError('An error occurred while making the API request.');
    }
  };
  

  return (
    <div className="form-container">
      {/* Render the error message if an error occurs */}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            required
          />
          <button type="submit">GO!</button>
        </label>
        <div className="methods">
          <span
            className={method === 'GET' ? 'active' : ''}
            onClick={() => setMethod('GET')}
          >
            GET
          </span>
          <span
            className={method === 'POST' ? 'active' : ''}
            onClick={() => setMethod('POST')}
          >
            POST
          </span>
          <span
            className={method === 'PUT' ? 'active' : ''}
            onClick={() => setMethod('PUT')}
          >
            PUT
          </span>
          <span
            className={method === 'DELETE' ? 'active' : ''}
            onClick={() => setMethod('DELETE')}
          >
            DELETE
          </span>
        </div>
        {(method === 'POST' || method === 'PUT') && (
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter JSON data..."
          />
        )}
      </form>
    </div>
  );
}

export default Form;
