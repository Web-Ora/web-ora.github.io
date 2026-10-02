/* =====================================================================
   WebOra . configurazione unica del sito
   Tutti i dati di contatto, il team e i testi IT/EN vivono qui.
   Cambia i valori in questo file e tutte le pagine si aggiornano,
   non serve toccare gli index.html.
   ===================================================================== */

window.WEBORA_CONFIG = {

  /* nome del marchio, usato in header, footer e note legali */
  brandName: 'WebOra',

  /* il logo scrive Web in bianco e Ora in verde: qui le due metà */
  brandMark: { prefix: 'Web', accent: 'Ora' },

  /* numero WhatsApp in formato internazionale, solo cifre.
     Da qui nascono i link wa.me, il link tel: e il numero mostrato in pagina. */
  whatsappNumber: '393203323493',

  /* indirizzo email di contatto */
  email: 'web.ora.bari@gmail.com',

  /* città indicata nelle note legali */
  legalCity: 'Bari',

  /* lingua di partenza: 'it' oppure 'en'.
     La scelta dell’utente viene poi ricordata nel browser. */
  defaultLang: 'it',

  /* se true, al primo accesso da un browser non italiano la pagina parte in
     inglese invece che in defaultLang. La scelta manuale vince sempre. */
  autoDetectLang: false,

  /* team di sviluppo.
     Il sistema visivo Midnight è monocromatico: l’accento qui sotto non è
     più un colore pieno, seleziona solo l’intensità del bagliore freddo
     attorno al monogramma. Valori: acid, volt, gold, iris. */
  team: [
    {
      name: 'Roberto',
      role: 'Sviluppo e interfacce',
      roleEn: 'Development and interfaces',
      linkedin: 'https://www.linkedin.com/in/PROFILO-ROBERTO',
      accent: 'acid'
    },
    {
      name: 'Karim',
      role: 'Back end e integrazioni',
      roleEn: 'Back end and integrations',
      linkedin: 'https://www.linkedin.com/in/abdulkarim-zahidi-57426a253/',
      accent: 'volt'
    },
    {
      name: 'Stefano',
      role: 'Velocità e visibilità su Google',
      roleEn: 'Speed and Google visibility',
      linkedin: 'https://www.linkedin.com/in/PROFILO-STEFANO',
      accent: 'gold'
    }
  ],

  /* =====================================================================
     PORTFOLIO . lo slideshow dei lavori

     ATTENZIONE: nomi e immagini qui sotto sono SEGNAPOSTO.
     Sostituiscili con clienti veri e screenshot veri prima di pubblicare.
     image accetta qualsiasi URL o percorso locale, es. 'img/trattoria.jpg'.
     ===================================================================== */
  portfolio: [
    {
      name: 'Trattoria Lungomare',
      tag: 'Ristorante',
      tagEn: 'Restaurant',
      image: 'https://picsum.photos/seed/webora-lavoro-trattoria/1200/750'
    },
    {
      name: 'Barberia Ventuno',
      tag: 'Barbiere',
      tagEn: 'Barber shop',
      image: 'https://picsum.photos/seed/webora-lavoro-barberia/1200/750'
    },
    {
      name: 'Atelier Sedici',
      tag: 'Sartoria',
      tagEn: 'Tailor',
      image: 'https://picsum.photos/seed/webora-lavoro-atelier/1200/750'
    },
    {
      name: 'Forno Sant’Elia',
      tag: 'Panificio',
      tagEn: 'Bakery',
      image: 'https://picsum.photos/seed/webora-lavoro-forno/1200/750'
    },
    {
      name: 'Studio Marzano',
      tag: 'Studio professionale',
      tagEn: 'Professional practice',
      image: 'https://picsum.photos/seed/webora-lavoro-studio/1200/750'
    },
    {
      name: 'Vivaio Mediterraneo',
      tag: 'Vivaio',
      tagEn: 'Garden centre',
      image: 'https://picsum.photos/seed/webora-lavoro-vivaio/1200/750'
    }
  ],

  /* =====================================================================
     DIZIONARIO IT / EN
     Ogni chiave corrisponde a un attributo data-i18n nell HTML.
     Le chiavi che finiscono con Html possono contenere markup.
     ===================================================================== */
  dict: {

    it: {
      /* --- meta --- */
      'meta.title': 'WebOra - Siti Web e Software per Piccole Imprese',
      'meta.description': 'Studio web a Bari. Costruiamo il sito della tua attività in pochi giorni, con anteprima gratuita prima di decidere. Prezzi fissi da 69 euro.',

      /* --- navigazione --- */
      'nav.skip': 'Vai al contenuto',
      'nav.preview': 'Anteprima gratuita',
      'nav.pricing': 'Prezzi',
      'nav.about': 'Chi siamo',
      'nav.faq': 'Domande',
      'nav.menuOpen': 'Apri il menu',
      'nav.menuClose': 'Chiudi il menu',
      'nav.langLabel': 'Lingua del sito',

      /* --- azione principale, stessa etichetta in tutta la pagina --- */
      'cta.whatsapp': 'Scrivici su WhatsApp',
      'cta.pricing': 'Vedi i prezzi',

      /* --- messaggi WhatsApp precompilati --- */
      'wa.generic': 'Ciao WebOra, vorrei informazioni per il sito della mia attività.',
      'wa.preview': 'Ciao WebOra, vorrei l’anteprima gratuita del mio sito.',
      'wa.flash': 'Ciao WebOra, sono interessato al piano Flash.',
      'wa.completo': 'Ciao WebOra, sono interessato al piano Completo.',
      'wa.misura': 'Ciao WebOra, vorrei parlare di un progetto su misura.',

      /* --- hero --- */
      'hero.eyebrow': 'Studio web a Bari',
      'hero.line1': 'Il sito della tua attività.',
      'hero.line2': 'Da 69€ a 149€, non 1.500€.',
      'hero.sub': 'Costruiamo siti veri, veloci e fatti bene per negozi, ristoranti, palestre e centri estetici. Le agenzie chiedono 1.500€ e tre mesi di attesa: noi ti mandiamo online in 1 o 5 giorni.',
      'hero.scrollCue': 'Scorri alla sezione successiva',

      /* --- anteprima gratuita --- */
      'preview.badge': 'Anteprima gratuita',
      'preview.title': 'Vedi il tuo nuovo sito prima di spendere un euro.',
      'preview.body': 'Raccontaci brevemente cosa fa la tua attività: realizzeremo un’anteprima navigabile su misura, pronta da provare su smartphone senza alcun impegno.',
      'preview.p1t': 'Nessun anticipo',
      'preview.p1b': 'Non chiediamo soldi per l’anteprima, nemmeno un acconto.',
      'preview.p2t': 'Pronta in 48 ore',
      'preview.p2b': 'Ci scrivi cosa fai, ti arriva il link da aprire sul telefono.',
      'preview.p3t': 'Zero vincoli',
      'preview.p3b': 'Se non ti convince, finisce lì e non ci devi niente.',
      'preview.note': 'Una sola pagina, costruita a mano sulla tua attività. Non un modello.',

      /* --- portfolio --- */
      'folio.title': 'Lavori recenti',
      'folio.body': 'Qualche sito costruito per attività come la tua. Scorri o usa le frecce.',
      'folio.prev': 'Lavoro precedente',
      'folio.next': 'Lavoro successivo',
      'folio.label': 'Galleria dei lavori',

      /* --- prezzi --- */
      'price.title': 'Quanto costa',
      'price.sub': 'Un pagamento una tantum per costruire il sito, più poche decine di euro all’anno per dominio e hosting.',
      'price.once': 'una tantum',
      'price.from': 'da',
      'price.badge': 'Il più scelto',
      'price.1name': 'Flash',
      'price.1desc': 'Una pagina di presentazione, pronta in pochi giorni.',
      'price.1f1': 'Pagina singola',
      'price.1f2': 'Pensata prima per il telefono',
      'price.1f3': 'Bottone WhatsApp diretto',
      'price.1year': 'Da 10 a 15 euro all’anno per dominio e hosting veloce.',
      'price.2name': 'Completo',
      'price.2desc': 'Più pagine, hosting gestito e aggiornamenti inclusi.',
      'price.2f1': 'Tutte le sezioni che ti servono',
      'price.2f2': 'Menu e testi modificabili',
      'price.2f3': 'Galleria fotografica',
      'price.2year': 'Da 15 a 25 euro all’anno per dominio e hosting.',
      'price.3name': 'Su misura',
      'price.3desc': 'Funzioni costruite sul tuo modo di lavorare.',
      'price.3f1': 'Prenotazioni e calendari',
      'price.3f2': 'Pannelli di gestione',
      'price.3f3': 'Integrazioni e API',
      'price.3year': 'Da 35 a 60 euro all’anno. I tempi dipendono dalla complessità.',
      'price.previewNote': 'L’anteprima gratuita vale su tutti i piani.',

      /* --- come lavoriamo --- */
      'how.title': 'Come lavoriamo',
      'how.1t': 'Ci scrivi',
      'how.1b': 'Due messaggi su WhatsApp per capire cosa fa la tua attività.',
      'how.2t': 'Ti mandiamo l’anteprima',
      'how.2b': 'Una pagina vera costruita sulla tua attività, gratis, entro 48 ore.',
      'how.3t': 'Decidi tu',
      'how.3b': 'Se ti piace scegliamo il piano, se non ti piace finisce lì.',
      'how.4t': 'Pubblichiamo',
      'how.4b': 'Il sito va online e restiamo raggiungibili se qualcosa cambia.',

      /* --- chi siamo, pannello laterale --- */
      'about.title': 'Chi siamo',
      'about.lead': 'WebOra sono tre persone, non un’agenzia con un centralino. Lavoriamo da Bari con attività in tutta Italia.',
      'about.body': 'Ci siamo divisi il lavoro per competenza invece di vendere pacchetti: chi disegna le interfacce, chi tiene in piedi il back end, chi si occupa di velocità e visibilità. Quando scrivi su WhatsApp ti risponde direttamente chi sta mettendo le mani sul tuo sito.',
      'about.linkedin': 'Profilo LinkedIn',
      'about.close': 'Chiudi',

      /* --- domande frequenti --- */
      'faq.title': 'Domande frequenti',
      'faq.q1': 'L’anteprima è davvero gratuita?',
      'faq.a1': 'Sì. Costruiamo una pagina vera sulla tua attività e te la mandiamo. Se non ti convince non ci devi niente e non ti ricontattiamo.',
      'faq.q2': 'Quanto tempo serve per avere il sito online?',
      'faq.a2': 'Per il piano Flash di solito bastano pochi giorni. Per Completo e Su misura dipende da quante pagine e funzioni servono, ne parliamo prima di iniziare.',
      'faq.q3': 'Dominio e hosting sono compresi nel prezzo?',
      'faq.a3': 'Il pagamento una tantum copre la costruzione del sito. Dominio e hosting hanno un costo annuale separato, indicato per ogni piano.',
      'faq.q4': 'Se dopo la pubblicazione voglio cambiare qualcosa?',
      'faq.a4': 'Scrivici su WhatsApp. Le modifiche piccole rientrano nell’assistenza, quelle più grandi si preventivano prima.',
      'faq.q5': 'Lavorate solo a Bari?',
      'faq.a5': 'No, lavoriamo da remoto con attività in tutta Italia. Se sei a Bari possiamo anche vederci di persona.',
      'faq.q6': 'Il sito sarà visibile su Google e collegabile ai miei social?',
      'faq.a6': 'Sì. Ogni sito include i meta-tag ottimizzati per essere indicizzato gratuitamente nei risultati di ricerca di Google, il collegamento diretto al profilo Google Maps (Google Business Profile) e i link pronti da inserire nella bio di Instagram, TikTok o Facebook.',

      /* --- chiusura --- */
      'end.title': 'Raccontaci cosa fai.',
      'end.body': 'Due messaggi e ti diciamo cosa possiamo costruire, con il prezzo. L’anteprima resta gratuita.',

      /* --- footer --- */
      'footer.tagline': 'Siti web curati per attività locali, costruiti da persone che rispondono davvero.',
      'footer.navTitle': 'Naviga',
      'footer.contactTitle': 'Contatti',
      'footer.legalTitle': 'Legale',
      'footer.privacy': 'Privacy',
      'footer.cookie': 'Cookie',
      'footer.legal': 'Note legali',
      'footer.rights': 'Tutti i diritti riservati.',
      'footer.made': 'Fatto a Bari',

      /* --- note legali, modale --- */
      'legal.title': 'Privacy, cookie e note legali',
      'legal.privacyTitle': 'Privacy',
      'legal.privacyBody': 'WebOra raccoglie solo i dati che ci scrivi direttamente su WhatsApp o via email, e li usa solo per risponderti. Non vendiamo e non condividiamo questi dati con terzi. Puoi chiederci in qualsiasi momento di cancellare la conversazione e i tuoi dati scrivendo allo stesso contatto.',
      'legal.cookieTitle': 'Cookie',
      'legal.cookieBody': 'Questo sito è statico e non usa cookie di profilazione, non carica pixel pubblicitari e non traccia la tua navigazione. Il browser salva solo la lingua che scegli, per non chiedertela ogni volta.',
      'legal.legalTitle': 'Note legali',
      'legal.legalBody': 'I prezzi indicati sono aggiornati alla data di pubblicazione e possono cambiare. Ogni progetto viene confermato con un preventivo scritto prima di iniziare. L’anteprima gratuita è una pagina dimostrativa e non comporta obblighi per nessuna delle due parti.',
      'legal.disclaimer': 'Testo da far verificare a un professionista prima della pubblicazione definitiva.',
      'legal.close': 'Chiudi'
    },

    en: {
      /* --- meta --- */
      'meta.title': 'WebOra - Websites and Software for Small Businesses',
      'meta.description': 'Web studio in Bari, Italy. We build your business website in days, with a free preview before you commit. Fixed prices from €69.',

      /* --- navigation --- */
      'nav.skip': 'Skip to content',
      'nav.preview': 'Free preview',
      'nav.pricing': 'Pricing',
      'nav.about': 'Who we are',
      'nav.faq': 'FAQ',
      'nav.menuOpen': 'Open menu',
      'nav.menuClose': 'Close menu',
      'nav.langLabel': 'Site language',

      /* --- primary action, same label everywhere --- */
      'cta.whatsapp': 'Message us on WhatsApp',
      'cta.pricing': 'See pricing',

      /* --- prefilled WhatsApp messages --- */
      'wa.generic': 'Hi WebOra, I would like information about a website for my business.',
      'wa.preview': 'Hi WebOra, I would like the free preview of my website.',
      'wa.flash': 'Hi WebOra, I am interested in the Flash plan.',
      'wa.completo': 'Hi WebOra, I am interested in the Completo plan.',
      'wa.misura': 'Hi WebOra, I would like to discuss a custom project.',

      /* --- hero --- */
      'hero.eyebrow': 'Web studio in Bari',
      'hero.line1': 'Your business website.',
      'hero.line2': 'From €69 to €149, not €1,500.',
      'hero.sub': 'We build proper, fast websites for shops, restaurants, gyms and beauty salons. Agencies quote €1,500 and a three month wait. We get you online in one to five days.',
      'hero.scrollCue': 'Scroll to the next section',

      /* --- free preview --- */
      'preview.badge': 'Free preview',
      'preview.title': 'See your new site before you spend a single euro.',
      'preview.body': 'Tell us a little about what your business does and we will build you a working preview, made for you, ready to try on your phone. No commitment.',
      'preview.p1t': 'Nothing upfront',
      'preview.p1b': 'We charge nothing for the preview, not even a deposit.',
      'preview.p2t': 'Ready in 48 hours',
      'preview.p2b': 'Tell us what you do and we send you a link to open on your phone.',
      'preview.p3t': 'No strings',
      'preview.p3b': 'If it is not for you, that is the end of it and you owe us nothing.',
      'preview.note': 'A single page, built by hand around your business. Not a template.',

      /* --- portfolio --- */
      'folio.title': 'Recent work',
      'folio.body': 'A few of the sites we have built for businesses like yours. Swipe or use the arrows.',
      'folio.prev': 'Previous project',
      'folio.next': 'Next project',
      'folio.label': 'Work gallery',

      /* --- pricing --- */
      'price.title': 'What it costs',
      'price.sub': 'One payment to build the site, plus a small yearly cost for the domain and hosting.',
      'price.once': 'one-time',
      'price.from': 'from',
      'price.badge': 'Most popular',
      'price.1name': 'Flash',
      'price.1desc': 'A one page site, ready in a few days.',
      'price.1f1': 'Single page',
      'price.1f2': 'Mobile first',
      'price.1f3': 'Direct WhatsApp button',
      'price.1year': '€10 to €15 a year for the domain and fast hosting.',
      'price.2name': 'Complete',
      'price.2desc': 'More pages, managed hosting and updates included.',
      'price.2f1': 'Every section you need',
      'price.2f2': 'Editable menu and copy',
      'price.2f3': 'Photo gallery',
      'price.2year': '€15 to €25 a year for the domain and hosting.',
      'price.3name': 'Custom',
      'price.3desc': 'Features built around the way you work.',
      'price.3f1': 'Bookings and calendars',
      'price.3f2': 'Admin panels',
      'price.3f3': 'Integrations and APIs',
      'price.3year': '€35 to €60 a year. Timescales depend on how complex it is.',
      'price.previewNote': 'The free preview applies to every plan.',

      /* --- how we work --- */
      'how.title': 'How we work',
      'how.1t': 'You message us',
      'how.1b': 'Two messages on WhatsApp so we understand what your business does.',
      'how.2t': 'We send the preview',
      'how.2b': 'A real page built around your business, free, within 48 hours.',
      'how.3t': 'You decide',
      'how.3b': 'If you like it, we pick a plan together. If you do not, that is the end of it.',
      'how.4t': 'We publish',
      'how.4b': 'The site goes live and we stay reachable when something changes.',

      /* --- who we are, side panel --- */
      'about.title': 'Who we are',
      'about.lead': 'WebOra is three people, not an agency with a switchboard. We work from Bari with businesses across Italy.',
      'about.body': 'We split the work by skill rather than selling packages: one of us designs the interfaces, one looks after the back end, one handles speed and visibility. When you message us on WhatsApp you reach the person actually building your site.',
      'about.linkedin': 'LinkedIn profile',
      'about.close': 'Close',

      /* --- faq --- */
      'faq.title': 'Common questions',
      'faq.q1': 'Is the preview really free?',
      'faq.a1': 'Yes. We build a real page for your business and send it over. If it is not for you, you owe nothing and we will not chase you.',
      'faq.q2': 'How long until the site is online?',
      'faq.a2': 'The Flash plan usually takes a few days. Complete and Custom depend on how many pages and features you need, and we agree that before we start.',
      'faq.q3': 'Are domain and hosting included?',
      'faq.a3': 'The one-time payment covers building the site. The domain and hosting have a separate yearly cost, listed on each plan.',
      'faq.q4': 'What if I want changes after launch?',
      'faq.a4': 'Message us on WhatsApp. Small changes are covered by support, bigger ones get quoted first.',
      'faq.q5': 'Do you only work in Bari?',
      'faq.a5': 'No, we work remotely with businesses across Italy. If you are in Bari we can also meet in person.',
      'faq.q6': 'Will the website be visible on Google and linked to my social accounts?',
      'faq.a6': 'Yes. Every site ships with meta tags set up so Google can index it for free, a direct link to your Google Business Profile listing on Maps, and links ready to drop into your Instagram, TikTok or Facebook bio.',

      /* --- closing --- */
      'end.title': 'Tell us what you do.',
      'end.body': 'Two messages and we will tell you what we can build and what it costs. The preview stays free.',

      /* --- footer --- */
      'footer.tagline': 'Well made websites for local businesses, built by people who actually reply.',
      'footer.navTitle': 'Browse',
      'footer.contactTitle': 'Contact',
      'footer.legalTitle': 'Legal',
      'footer.privacy': 'Privacy',
      'footer.cookie': 'Cookies',
      'footer.legal': 'Legal notes',
      'footer.rights': 'All rights reserved.',
      'footer.made': 'Made in Bari',

      /* --- legal modal --- */
      'legal.title': 'Privacy, cookies and legal notes',
      'legal.privacyTitle': 'Privacy',
      'legal.privacyBody': 'WebOra only collects the data you send us directly on WhatsApp or by email, and uses it only to reply to you. We do not sell or share this data with third parties. You can ask us to delete the conversation and your data at any time, using the same contact.',
      'legal.cookieTitle': 'Cookies',
      'legal.cookieBody': 'This site is static and uses no profiling cookies, loads no advertising pixels and does not track your browsing. Your browser only stores the language you pick, so we do not have to ask every time.',
      'legal.legalTitle': 'Legal notes',
      'legal.legalBody': 'Prices shown are current at the date of publication and may change. Every project is confirmed with a written quote before work starts. The free preview is a demonstration page and places no obligation on either side.',
      'legal.disclaimer': 'Draft text. Have it checked by a professional before final publication.',
      'legal.close': 'Close'
    }
  }
};
