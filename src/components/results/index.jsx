import './results.scss';
import JSONPretty from 'react-json-pretty';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error">An error occurred while rendering the JSON data.</div>;
    }
    return this.props.children;
  }
}

function Results(props) {
  return (
    <div className="results">
      {props.loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          Loading...
        </div>
      ) : (
        <>
          {props.error ? (
            <div className="error">{props.error}</div>
          ) : (
            <>
              {props.data ? (
                <div>
                  <pre>{JSON.stringify(props.data, null, 2)}</pre>
                  <ErrorBoundary>
                    <div className="json-pretty">
                      <JSONPretty data={props.data}></JSONPretty>
                    </div>
                  </ErrorBoundary>
                </div>
              ) : (
                <div>No data available.</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Results;
