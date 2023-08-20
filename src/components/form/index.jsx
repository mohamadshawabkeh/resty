import { useState } from 'react';
import './form.scss';

function Form({ handleApiCall }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestData = {
      method,
      url,
      data: method === 'GET' ? null : data,
    };
    
    handleApiCall(requestData);
  };

  return (
    <div className="form-container">
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
