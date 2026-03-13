'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.css';
import { User as UserIcon, LogOut } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === 'admin';

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <span className="gradient-text">Aqua</span>Clean
        </Link>
        
        <div className={styles.links}>
          <Link href="/services" className={styles.link}>Servizi</Link>
          <Link href="/#how-it-works" className={styles.link}>Come funziona</Link>
          {isAdmin && <Link href="/admin" className={styles.link}>Pannello Admin</Link>}
        </div>

        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <span className={styles.userName}>Ciao, {session.user?.name?.split(' ')[0]}</span>
              <Link href="/dashboard" className={styles.iconBtn} title="Dashboard">
                <UserIcon size={20} />
              </Link>
              <button 
                className={styles.iconBtn} 
                title="Logout"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.link}>Accedi</Link>
              <Link href="/register" className={`btn btn-primary ${styles.registerBtn}`}>
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
