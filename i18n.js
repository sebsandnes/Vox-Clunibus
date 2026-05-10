// ===== TRANSLATIONS =====
const translations = {
  en: {
    nav_shop: "Shop",
    nav_about: "About",
    nav_faq: "FAQ",
    hero_tag: "Free shipping over $60 · Printed on demand",
    hero_title: "Wear the joke.<br>Ship it to your door.",
    hero_sub: "Bold, funny, a little too real. T-shirts for people who shouldn't be trusted in formal settings.",
    hero_btn: "Shop now",
    badge1: "Printed on demand",
    badge2: "Ships in 3–7 days",
    badge3: "14-day returns",
    badge4: "Secure checkout",
    shop_title: "Fresh Drops",
    notify_title: "New drops. No spam.",
    notify_sub: "Get notified when we launch new designs. That's it.",
    notify_btn: "Notify me",
    notify_success: "You're on the list!",
    notify_error: "Please enter a valid email.",
    about_title: "No warehouse.<br>No BS.",
    about_p1: "Every shirt is printed when you order — no overstock, no waste. Your order goes straight from press to postbox.",
    about_p2: "We use Printful for printing and worldwide shipping. Gildan 64000 — 100% ring-spun cotton, pre-shrunk, built to last.",
    about_btn: "Read the FAQ",
    step1_title: "You order",
    step1_desc: "Pick your shirt, size, and pay securely via Stripe.",
    step2_title: "We print",
    step2_desc: "Your order goes to print within 24–48 hours.",
    step3_title: "You receive",
    step3_desc: "Delivered to your door in 5–10 business days.",
    cart_title: "Your bag",
    cart_empty: "Your bag is empty.",
    cart_shipping_note: "Shipping calculated at checkout",
    cart_total: "Total",
    cart_checkout: "Checkout →",
    cart_secure: "🔒 Secure checkout via Stripe",
    modal_add: "Add to bag",
    modal_note: "Free returns within 14 days · Printed on demand",
    footer_tagline: "Wear the joke.",
    footer_shop: "Shop",
    footer_all: "All products",
    footer_sizing: "Size guide",
    footer_help: "Help",
    footer_returns: "Returns",
    footer_legal: "Legal",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms & Conditions",
    footer_vat: "VAT/org. number will be added when applicable.",
  },
  no: {
    nav_shop: "Butikk",
    nav_about: "Om oss",
    nav_faq: "FAQ",
    hero_tag: "Gratis frakt over 600 kr · Trykket på bestilling",
    hero_title: "Ha på deg vitsen.<br>Send den til døren din.",
    hero_sub: "Dristige, morsomme, litt for virkelige. T-skjorter for folk som ikke bør stoles på i formelle settinger.",
    hero_btn: "Handle nå",
    badge1: "Trykket på bestilling",
    badge2: "Sendes på 3–7 dager",
    badge3: "14-dagers retur",
    badge4: "Sikker betaling",
    shop_title: "Ferske drops",
    notify_title: "Nye drops. Ingen spam.",
    notify_sub: "Bli varslet når vi lanserer nye design. Det er alt.",
    notify_btn: "Varsle meg",
    notify_success: "Du er på listen!",
    notify_error: "Skriv inn en gyldig e-postadresse.",
    about_title: "Intet lager.<br>Ingen tull.",
    about_p1: "Hver skjorte trykkes når du bestiller — ingen overproduksjon, ingen svinn. Bestillingen din går rett fra presse til postkasse.",
    about_p2: "Vi bruker Printful for trykk og frakt over hele verden. Gildan 64000 — 100% bomull, forvaskket, laget for å vare.",
    about_btn: "Les FAQ",
    step1_title: "Du bestiller",
    step1_desc: "Velg skjorte, størrelse og betal trygt via Stripe.",
    step2_title: "Vi trykker",
    step2_desc: "Bestillingen din går til trykk innen 24–48 timer.",
    step3_title: "Du mottar",
    step3_desc: "Levert til døren din på 5–10 virkedager.",
    cart_title: "Handlepose",
    cart_empty: "Handleposen er tom.",
    cart_shipping_note: "Frakt beregnes i kassen",
    cart_total: "Totalt",
    cart_checkout: "Til betaling →",
    cart_secure: "🔒 Sikker betaling via Stripe",
    modal_add: "Legg i pose",
    modal_note: "Gratis retur innen 14 dager · Trykket på bestilling",
    footer_tagline: "Ha på deg vitsen.",
    footer_shop: "Butikk",
    footer_all: "Alle produkter",
    footer_sizing: "Størrelsesguide",
    footer_help: "Hjelp",
    footer_returns: "Retur",
    footer_legal: "Juridisk",
    footer_privacy: "Personvernpolitikk",
    footer_terms: "Vilkår og betingelser",
    footer_vat: "MVA/org.nr. legges til når aktuelt.",
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('lang-' + lang)?.classList.add('active');
}

function t(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

document.addEventListener('DOMContentLoaded', () => setLang(currentLang));
