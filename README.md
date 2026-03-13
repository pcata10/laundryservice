# 🧺 AquaClean - CMS Lavanderia Professionale

AquaClean è una piattaforma CMS moderna e completa per la gestione di un servizio di lavanderia premium. Sviluppata con **Next.js 15**, **MongoDB** e **Stripe**, offre un'esperienza utente raffinata e strumenti di amministrazione potenti.


## ✨ Caratteristiche Principali

### 👤 Area Utente
- **Autenticazione Sicura**: Registrazione e Login gestiti con NextAuth.js (BCrypt per la cifratura delle password).
- **Prenotazione Servizi**: Selezione intuitiva tra vari tipi di lavaggio (Lava e Piega, Lavaggio a Secco, ecc.).
- **Scheduling Intelligente**: Scelta di data e orario per il ritiro e la consegna a domicilio.
- **Dashboard Personale**: Monitoraggio in tempo reale dello stato degli ordini e storico prenotazioni.
- **Pagamenti Online**: Integrazione sicura con **Stripe** per pagamenti con carta di credito.

### 🛡️ Pannello Amministratore
- **Console di Gestione**: Dashboard dedicata per visualizzare tutti gli ordini in arrivo.
- **Flusso di Lavoro**: Gestione degli stati dell'ordine (In attesa -> Confermato -> In lavorazione -> Completato).
- **Notifiche Automatiche**: Sistema integrato per l'invio di email di conferma a utenti e admin tramite Nodemailer.

### 🎨 Design & UX
- **Aestetica Premium**: Interfaccia pulita con effetti Glassmorphism e animazioni fluide (Framer Motion).
- **Responsive Design**: Ottimizzato per desktop, tablet e smartphone.
- **Modalità Dark/Light**: Supporto nativo per il tema del sistema.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) con Mongoose
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Pagamenti**: [Stripe API](https://stripe.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Stile**: Vanilla CSS Modules (Nessun framework CSS pesante)
- **Animazioni**: [Framer Motion](https://www.framer.com/motion/)
- **Icone**: [Lucide React](https://lucide.dev/)

## 🚀 Inizia Subito

### 1. Clona il repository
```bash
git clone https://github.com/tuo-username/laundryservice.git
cd laundryservice
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Configura le variabili d'ambiente
Crea un file `.env.local` nella root del progetto e inserisci le tue chiavi:
```env
MONGODB_URI=il_tuo_link_mongodb
NEXTAUTH_SECRET=una_stringa_casuale_sicura
NEXTAUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tua@email.com
SMTP_PASS=tua_app_password
MAIL_FROM=noreply@aquaclean.it
```

### 4. Avvia l'applicazione
```bash
npm run dev
```

## 🔐 Accesso Admin
Per creare il primo account amministratore:
1. Avvia l'app in locale.
2. Visita `http://localhost:3000/api/setup-admin`.
3. Accedi con: `admin@aquaclean.it` / `AdminPassword123!`.

---

Realizzato con ❤️ per tutta la community di sviluppatori di GitHub.
