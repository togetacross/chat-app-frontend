import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="col-md-12 text-center vh-100 d-flex align-items-center justify-content-center">
        <div>
          <span className="display-1">404</span>
          <div className="mb-4 lead">
            Oops! We can't seen to find the page you are looking for.
          </div>
          <Link to="/" className="btn btn-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
