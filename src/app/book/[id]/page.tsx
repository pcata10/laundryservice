'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './booking.module.css';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

const SERVICES = [
  { id: '1', name: 'Lava e Piega', price: 15 },
  { id: '2', name: 'Lavaggio a Secco', price: 25 },
  { id: '3', name: 'Solo Stiratura', price: 10 },
  { id: '4', name: 'Rimozione Macchie', price: 30 }
];

export default function BookingPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const service = SERVICES.find(s => s.id === params.id);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', zipCode: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/book/${params.id}`);
    }
  }, [status, router, params.id]);

  if (status === 'loading') return <div className="container">Caricamento...</div>;
  if (!service) return <div className="container">Servizio non trovato</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          amount: service.price,
          pickupDate: `${date}T${time}`,
          address,
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      alert('Errore durante la creazione della sessione di pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.grid}>
        <div className={styles.formSection}>
          <h1 className="gradient-text">Completa la Prenotazione</h1>
          <p>Dicci quando e dove ritirare il tuo bucato.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.section}>
              <h3><Calendar size={20} /> Programma Ritiro</h3>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label>Data</label>
                  <input 
                    type="date" 
                    required 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className={styles.group}>
                  <label>Orario</label>
                  <input 
                    type="time" 
                    required 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3><MapPin size={20} /> Indirizzo di Ritiro</h3>
              <div className={styles.group}>
                <label>Via e Numero Civico</label>
                <input 
                  type="text" 
                  placeholder="Via Roma 123" 
                  required 
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label>Città</label>
                  <input 
                    type="text" 
                    placeholder="Milano" 
                    required 
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                </div>
                <div className={styles.group}>
                  <label>CAP</label>
                  <input 
                    type="text" 
                    placeholder="20121" 
                    required 
                    value={address.zipCode}
                    onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              <CreditCard size={20} /> {loading ? 'Elaborazione...' : `Paga €${service.price} & Prenota`}
            </button>
          </form>
        </div>

        <div className={styles.summarySection}>
          <div className={`glass-card ${styles.summaryCard}`}>
            <h2>Riepilogo Ordine</h2>
            <div className={styles.summaryItem}>
              <span>Servizio</span>
              <span>{service.name}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Subtotale</span>
              <span>€{service.price}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Costo Ritiro</span>
              <span>Gratis</span>
            </div>
            <div className={`${styles.summaryItem} ${styles.total}`}>
              <span>Totale</span>
              <span>€{service.price}</span>
            </div>
            <div className={styles.info}>
              <p>Il pagamento è sicuro tramite Stripe. Sarai reindirizzato per completare il pagamento.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
