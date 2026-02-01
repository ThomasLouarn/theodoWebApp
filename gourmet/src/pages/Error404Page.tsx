import { useNavigate } from 'react-router';

function Error404Page() {
  // Redirect to the main page after waiting
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 3000);

  return (
    <div className="container pt-5">
      <div className="alert alert-primary">
        Cette page n'existe pas, vous allez être redirigé automatiquement.
      </div>
    </div>
  );
}

export default Error404Page;
