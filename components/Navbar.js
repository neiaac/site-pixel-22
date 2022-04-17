import { useAuth } from '../hooks/useAuth';
import { navbar } from '../styles/navbar.module.css';

export default function Navbar() {
  const { user, userSignOut } = useAuth();

  return (
    <nav className={navbar}>
      <span>{user?.email}</span>
      <button onClick={() => { userSignOut(); }}>Sair</button>
    </nav>
  );
}
