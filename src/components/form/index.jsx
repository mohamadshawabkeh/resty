import  { useState } from 'react';
import './form.scss';

function Form(props) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [postData, setPostData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method,
      url,
      data: postData,
    };
    props.handleApiCall(formData);
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
            id="get"
            className={method === 'GET' ? 'active' : ''}
            onClick={() => setMethod('GET')}
          >
            GET
          </span>
          <span
            id="post"
            className={method === 'POST' ? 'active' : ''}
            onClick={() => setMethod('POST')}
          >
            POST
          </span>
          <span
            id="put"
            className={method === 'PUT' ? 'active' : ''}
            onClick={() => setMethod('PUT')}
          >
            PUT
          </span>
          <span
            id="delete"
            className={method === 'DELETE' ? 'active' : ''}
            onClick={() => setMethod('DELETE')}
          >
            DELETE
          </span>
        </div>
        {(method === 'POST' || method === 'PUT') && (
          <textarea
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
            placeholder="Enter JSON data..."
          />
        )}
      </form>
    </div>
  );
}

export default Form;
