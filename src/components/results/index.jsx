import './results.scss';
import JSONPretty from 'react-json-pretty';

function Results(props) {
  return (
    <div className="results">
      {props.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {props.error ? (
            <div className="error">{props.error}</div>
          ) : (
            <div>
              <pre>{props.data ? JSON.stringify(props.data, null, 2) : null}</pre>
              {props.data && (
                <div className="json-pretty">
                  <JSONPretty data={props.data}></JSONPretty>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;
