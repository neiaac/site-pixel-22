import Link from 'next/link';

import { useAuth } from '../hooks/useAuth';
import { navbar } from '../styles/navbar.module.css';

export default function Navbar({ isHome }) {
  const { user, userSignOut } = useAuth();

  return (
    <nav className={navbar}>
      <Link href={isHome ? '/enrollments' : '/nominations'}>
        <a>{isHome ? 'Inscreve-te' : 'Home'}</a>
      </Link>
      <div>
        <span>{user?.email}</span>
        <button
          onClick={() => {
            userSignOut();
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
