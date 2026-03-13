'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { LayoutDashboard, ShoppingCart, Settings, Users, CheckCircle, Clock, XCircle } from 'lucide-react';

const statusMap: any = {
  pending: 'In attesa',
  confirmed: 'Confermato',
  processing: 'In lavorazione',
  completed: 'Completato',
  cancelled: 'Annullato'
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchAdminOrders();
    }
  }, [status, session, router]);

  const fetchAdminOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map((o: any) => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === 'loading' || loading) return <div className="container">Caricamento Pannello Admin...</div>;

  return (
    <div className={`container ${styles.container}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Console Admin</h2>
        </div>
        <nav className={styles.sideNav}>
          <button className={`${styles.sideLink} ${styles.active}`}><LayoutDashboard size={20} /> Dashboard</button>
          <button className={styles.sideLink}><ShoppingCart size={20} /> Ordini</button>
          <button className={styles.sideLink}><Settings size={20} /> Servizi</button>
          <button className={styles.sideLink}><Users size={20} /> Utenti</button>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Gestione Ordini</h1>
          <p>Aggiorna lo stato e conferma le richieste in arrivo.</p>
        </header>

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Ordine</th>
                <th>Cliente</th>
                <th>Servizio</th>
                <th>Data Ritiro</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>
                  <td>{order.userId?.name}</td>
                  <td>{order.serviceId?.name}</td>
                  <td>{new Date(order.pickupDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.status} ${styles[order.status]}`}>
                      {statusMap[order.status]}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(order._id, 'confirmed')}
                        className={styles.actionBtn}
                        title="Conferma"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {['confirmed', 'processing'].includes(order.status) && (
                      <button 
                        onClick={() => updateStatus(order._id, order.status === 'confirmed' ? 'processing' : 'completed')}
                        className={styles.actionBtn}
                        title="Prossimo Step"
                      >
                        <Clock size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
