'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { Package, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

const statusMap: any = {
  pending: 'In attesa',
  confirmed: 'Confermato',
  processing: 'In lavorazione',
  completed: 'Completato',
  cancelled: 'Annullato'
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) return <div className="container">Caricamento dashboard...</div>;

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1>Il Mio Dashboard</h1>
        <p>Gestisci i tuoi ordini attivi e la tua cronologia.</p>
      </div>

      <div className={styles.stats}>
        <div className={`glass-card ${styles.stat}`}>
          <div className={styles.statIcon}><Package size={24} /></div>
          <div>
            <h3>{orders.length}</h3>
            <p>Ordini Totali</p>
          </div>
        </div>
        <div className={`glass-card ${styles.stat}`}>
          <div className={styles.statIcon}><Clock size={24} /></div>
          <div>
            <h3>{orders.filter((o: any) => o.status === 'pending').length}</h3>
            <p>In Attesa</p>
          </div>
        </div>
        <div className={`glass-card ${styles.stat}`}>
          <div className={styles.statIcon}><CheckCircle2 size={24} /></div>
          <div>
            <h3>{orders.filter((o: any) => o.status === 'completed').length}</h3>
            <p>Completati</p>
          </div>
        </div>
      </div>

      <div className={styles.ordersSection}>
        <h2>Ordini Recenti</h2>
        {orders.length === 0 ? (
          <div className={styles.empty}>
            <p>Non hai ancora effettuato ordini.</p>
            <button onClick={() => router.push('/services')} className="btn btn-primary">
              Prenota un Servizio
            </button>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order: any) => (
              <div key={order._id} className={`glass-card ${styles.orderCard}`}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderHeader}>
                    <span className={styles.serviceName}>{order.serviceId?.name || 'Servizio Lavanderia'}</span>
                    <span className={`${styles.status} ${styles[order.status]}`}>
                      {statusMap[order.status]}
                    </span>
                  </div>
                  <div className={styles.orderDetails}>
                    <span> Ritiro: {new Date(order.pickupDate).toLocaleDateString()}</span>
                    <span>Totale: €{order.totalAmount}</span>
                  </div>
                </div>
                <ChevronRight size={20} className={styles.chevron} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
