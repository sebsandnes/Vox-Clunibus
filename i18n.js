// ===== TRANSLATIONS =====
const translations = {
  en: {
    nav_shop: "Shop",
    nav_about: "About",
    hero_tag: "T-shirts printed on demand",
    hero_title: "Wear something<br>worth talking about.",
    hero_sub: "Funny, bold, a little weird. Every shirt printed and shipped directly to you.",
    hero_btn: "Browse collection",
    shop_title: "Collection",
    shop_sub: "New designs coming soon",
    coming_soon: "Products launching soon. Sign up below to be notified.",
    notify_placeholder: "Your email address",
    notify_btn: "Notify me",
    about_title: "How it works",
    about_p1: "Every shirt is printed on demand — no stock, no waste. When you order, it goes straight to print and ships to your door within a few days.",
    about_p2: "We use Printful to handle printing and shipping worldwide. 100% cotton tees, high-quality print.",
    step1_title: "You order",
    step1_desc: "Pick your shirt and size, pay securely.",
    step2_title: "We print",
    step2_desc: "Your order goes to print within 24 hours.",
    step3_title: "You receive",
    step3_desc: "Delivered to your door in 5–10 business days.",
    cart_title: "Your cart",
    cart_empty: "Your cart is empty.",
    cart_total: "Total",
    cart_checkout: "Checkout",
    footer_privacy: "Privacy",
    footer_returns: "Returns",
    footer_contact: "Contact",
    notify_success: "You're on the list!",
    notify_error: "Please enter a valid email.",
  },
  no: {
    nav_shop: "Butikk",
    nav_about: "Om oss",
    hero_tag: "T-skjorter trykket på bestilling",
    hero_title: "Ha på deg noe<br>verdt å snakke om.",
    hero_sub: "Morsomme, dristige, litt rare. Hver skjorte trykkes og sendes direkte til deg.",
    hero_btn: "Se kolleksjon",
    shop_title: "Kolleksjon",
    shop_sub: "Nye design kommer snart",
    coming_soon: "Produkter lanseres snart. Registrer deg nedenfor for å bli varslet.",
    notify_placeholder: "Din e-postadresse",
    notify_btn: "Varsle meg",
    about_title: "Slik fungerer det",
    about_p1: "Hver skjorte trykkes på bestilling – ingen lager, ikke noe svinn. Når du bestiller, går det rett til trykk og sendes til døren din i løpet av noen dager.",
    about_p2: "Vi bruker Printful for trykk og frakt over hele verden. 100% bomullsskjorter, høykvalitets trykk.",
    step1_title: "Du bestiller",
    step1_desc: "Velg skjorte og størrelse, betal trygt.",
    step2_title: "Vi trykker",
    step2_desc: "Bestillingen din går til trykk innen 24 timer.",
    step3_title: "Du mottar",
    step3_desc: "Levert til døren din på 5–10 virkedager.",
    cart_title: "Handlekurv",
    cart_empty: "Handlekurven er tom.",
    cart_total: "Totalt",
    cart_checkout: "Til betaling",
    footer_privacy: "Personvern",
    footer_returns: "Retur",
    footer_contact: "Kontakt",
    notify_success: "Du er på listen!",
    notify_error: "Skriv inn en gyldig e-postadresse.",
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  // Update all translated elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('lang-' + lang)?.classList.add('active');
}

function t(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => setLang(currentLang));
