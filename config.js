/* =====================================================================
   WebOra . configurazione unica del sito
   Tutti i dati di contatto e il team vivono qui.
   Cambia i valori in questo file e la pagina si aggiorna da sola,
   non serve toccare index.html.
   ===================================================================== */

window.WEBORA_CONFIG = {

  /* nome del marchio, usato in header, footer e note legali */
  brandName: 'WebOra',

  /* numero WhatsApp in formato internazionale, solo cifre.
     Da qui nascono i link wa.me, il link tel: e il numero mostrato in pagina. */
  whatsappNumber: '393203323493',

  /* indirizzo email di contatto */
  email: 'web.ora.bari@gmail.com',

  /* città indicata nelle note legali */
  legalCity: 'Bari',

  /* team di sviluppo.
     accent accetta: acid (verde), volt (blu), gold (ambra), iris (viola). */
  team: [
    {
      name: 'Roberto',
      role: 'Sviluppo e interfacce',
      linkedin: 'https://www.linkedin.com/in/PROFILO-ROBERTO',
      accent: 'acid'
    },
    {
      name: 'Karim',
      role: 'Back end e integrazioni',
      linkedin: 'https://www.linkedin.com/in/abdulkarim-zahidi-57426a253/',
      accent: 'volt'
    },
    {
      name: 'Stefano',
      role: 'Velocità e visibilità su Google',
      linkedin: 'https://www.linkedin.com/in/PROFILO-STEFANO',
      accent: 'gold'
    }
  ]
};
