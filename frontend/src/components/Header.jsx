import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../services/authenticate";

export function Header({ userEmail }) {
  // Function to move to between pages
  let navigate = useNavigate();

  const routeHome = () => {
    navigate(`/dashboard`);
  };

  const executeCognitoLogout = () => {
    logout();
  };

  return (
    <header className="header-container shadow-sm py-3 px-4 bg-white d-flex align-items-center justify-content-between" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-primary me-3 fw-bold"
          onClick={routeHome}
          style={{ borderRadius: "50px", padding: "8px 24px" }}
        >
          <i className="bi bi-house-door-fill me-2"></i>Home
        </button>
        <span className="fs-5 text-secondary">Todo App</span>
      </div>
      <div className="d-flex align-items-center">
        <span className="me-4 text-muted">
          <i className="bi bi-person-circle me-2"></i>
          Welcome, <span className="fw-semibold">{userEmail}</span>
        </span>
        <button
          className="btn btn-danger fw-bold"
          onClick={executeCognitoLogout}
          style={{ borderRadius: "50px", padding: "8px 24px" }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </div>
    </header>
  );
}

// To enable static typing for my props for the Header :)
Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
