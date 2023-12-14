import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from '../components/organisms';
import AuthUserContext from '../contexts/AuthUserContext';
import { useContext } from 'react';

type Props = {
  // authUser?: { id: string; name: string; email: string };
  onLogout: () => void;
};

const RequireAuth = ({ onLogout }: Props) => {
  const authUser = useContext(AuthUserContext);

  if (authUser === undefined) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <header className="header">
        <NavBar onLogout={onLogout} />
      </header>
      <Outlet />
    </>
  );
};

export default RequireAuth;
