import Link from 'next/link';
import styles from './services.module.css';
import { Shirt, Trash2, Wind, Droplets } from 'lucide-react';

const SERVICES = [
  {
    id: '1',
    name: 'Lava e Piega',
    description: 'Bucato di tutti i giorni, lavato, asciugato e perfettamente piegato.',
    price: 15,
    icon: <Droplets size={40} />,
    color: '#0ea5e9'
  },
  {
    id: '2',
    name: 'Lavaggio a Secco',
    description: 'Pulizia professionale per i tuoi capi più delicati.',
    price: 25,
    icon: <Wind size={40} />,
    color: '#8b5cf6'
  },
  {
    id: '3',
    name: 'Solo Stiratura',
    description: 'Stiratura professionale impeccabile per camicie e pantaloni.',
    price: 10,
    icon: <Shirt size={40} />,
    color: '#f59e0b'
  },
  {
    id: '4',
    name: 'Rimozione Macchie',
    description: 'Trattamento mirato per le macchie difficili su qualsiasi tessuto.',
    price: 30,
    icon: <Trash2 size={40} />,
    color: '#ef4444'
  }
];

export default function ServicesPage() {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1 className="gradient-text">I Nostri Servizi</h1>
        <p>Scegli la cura perfetta per i tuoi vestiti.</p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <div key={service.id} className={`glass-card ${styles.card}`}>
            <div className={styles.icon} style={{ color: service.color }}>
              {service.icon}
            </div>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <div className={styles.footer}>
              <span className={styles.price}>Da €{service.price}</span>
              <Link href={`/book/${service.id}`} className="btn btn-primary">
                Prenota Ora
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
