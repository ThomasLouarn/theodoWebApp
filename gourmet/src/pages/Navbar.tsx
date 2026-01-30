import { Link, Outlet } from 'react-router';
import { useState, useEffect, createContext, type FormEvent } from 'react';

import './Navbar.css';

import { Modal } from 'react-bootstrap';

export const AuthContext = createContext(false);

function Navbar() {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [logoutModalShow, setLogoutModalShow] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);
  const [alertInvalidUsername, setAlertInvalidUsername] = useState(false);
  const [alertInvalidPassword, setAlertInvalidPassword] = useState(false);

  // check if the token, if existing, is still available
  const [isAuthenticated, setIsAuthentificated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetch(`${import.meta.env.VITE_API_ROUTE}/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.username) {
            setIsAuthentificated(true);
          }
        });
    }
  }, []);

  // login function
  const onLogin = (e: FormEvent) => {
    // do not refresh the page and remove the alerts
    e.preventDefault();

    setAlertErrorLogin(false);
    setAlertInvalidUsername(false);
    setAlertInvalidPassword(false);

    // get username and password
    const username = (
      document.getElementById('usernameInput') as HTMLInputElement
    ).value;
    const password = (
      document.getElementById('passwordInput') as HTMLInputElement
    ).value;

    // fetch the login API
    fetch(`${import.meta.env.VITE_API_ROUTE}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          setIsAuthentificated(true);
          setLoginModalShow(false);
        } else if (data.status === 404) {
          setAlertInvalidUsername(true);
        } else if (data.status === 401) {
          setAlertInvalidPassword(true);
        } else {
          setAlertErrorLogin(true);
        }
      });
  };

  // logout function
  const onLogout = () => {
    const token = localStorage.getItem('authToken');

    fetch(`${import.meta.env.VITE_API_ROUTE}/logout`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

    localStorage.removeItem('authToken');
    setIsAuthentificated(false);
    setLogoutModalShow(false);
  };

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Main title */}
          <Link className="navbar-brand" to="/">
            Recettes
          </Link>

          {/* Buttons links */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/favorites">
                    Favorites
                  </Link>
                </li>
              ) : (
                <></>
              )}

              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    isAuthenticated
                      ? () => setLogoutModalShow(true)
                      : () => setLoginModalShow(true)
                  }
                >
                  {isAuthenticated ? 'Déconnexion' : 'Connexion'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main page display */}
      <Outlet />

      {/* Modal for login */}
      <Modal show={loginModalShow} onHide={() => setLoginModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onLogin}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Identifiant"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Mot de passe"
                required
              />
            </div>
            {alertInvalidUsername && (
              <div className="alert alert-danger mb-3">
                Identifiant invalide.
              </div>
            )}
            {alertInvalidPassword && (
              <div className="alert alert-danger mb-3">
                Mot de passe invalide.
              </div>
            )}
            {alertErrorLogin && (
              <div className="alert alert-danger mb-3">
                Une erreur est survenue, veuillez réessayer plus tard.
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Connexion
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal for logout */}
      <Modal show={logoutModalShow} onHide={() => setLogoutModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Déconnexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">Valider ma déconnection.</div>
          <button type="button" className="btn btn-primary" onClick={onLogout}>
            Se déconnecter
          </button>
        </Modal.Body>
      </Modal>
    </AuthContext.Provider>
  );
}

export default Navbar;
