'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { ArrowRight, CheckCircle, Clock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>
            Vestiti Freschi, <br />
            <span className="gradient-text">Zero Fatica.</span>
          </h1>
          <p className={styles.subtitle}>
            Servizi di lavanderia e lavaggio a secco premium direttamente a casa tua. 
            Prenota il tuo ritiro in pochi secondi e goditi il tuo tempo libero.
          </p>
          <div className={styles.heroActions}>
            <Link href="/services" className="btn btn-primary">
              Prenota un Servizio <ArrowRight size={20} />
            </Link>
            <Link href="/#how-it-works" className="btn btn-secondary">
              Scopri di Più
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className={styles.heroImageWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image 
            src="/images/hero_bg.png" 
            alt="Servizio di Lavanderia Premium" 
            width={800} 
            height={600} 
            className={styles.heroImage}
            priority
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`container ${styles.features}`} id="how-it-works">
        <div className={styles.feature}>
          <div className={styles.featureIcon}><Clock size={32} /></div>
          <h3>Consegna Rapida</h3>
          <p>I tuoi capi saranno puliti e freschi entro 24-48 ore.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}><CheckCircle size={32} /></div>
          <h3>Qualità Garantita</h3>
          <p>I nostri esperti trattano i tuoi capi con la massima cura e precisione.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}><Truck size={32} /></div>
          <h3>Ritiro e Consegna Gratuiti</h3>
          <p>Niente più viaggi in lavanderia. Veniamo noi da te quando ti è più comodo.</p>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className={styles.cta}>
        <div className={`glass-card ${styles.ctaCard}`}>
          <h2>Pronto a provare il miglior servizio di lavanderia?</h2>
          <p>Unisciti a migliaia di clienti soddisfatti che affidano i loro vestiti ad AquaClean.</p>
          <Link href="/register" className="btn btn-primary">
            Inizia Oggi
          </Link>
        </div>
      </section>
    </div>
  );
}
