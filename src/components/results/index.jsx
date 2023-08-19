import './results.scss';

function Results(props) {
  return (
    <section>
      {props.loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          Loading...
        </div>
      ) : (
        <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
      )}
    </section>
  );
}

export default Results;
