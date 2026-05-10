(function() {
  if (localStorage.getItem('cookies_accepted')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      <p>We use cookies to enable secure checkout via Stripe. No tracking or advertising cookies. <a href="privacy.html">Learn more</a></p>
      <button onclick="acceptCookies()">Got it</button>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #111;
      color: rgba(255,255,255,0.85);
      z-index: 9999;
      padding: 16px 40px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .cookie-content {
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .cookie-content p {
      font-family: 'Mulish', sans-serif;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
    .cookie-content a {
      color: rgba(255,255,255,0.6);
      text-decoration: underline;
    }
    .cookie-content button {
      background: white;
      color: #111;
      border: none;
      padding: 10px 24px;
      font-family: 'Mulish', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .cookie-content button:hover { opacity: 0.85; }
    @media (max-width: 768px) {
      #cookie-banner { padding: 16px 20px; }
      .cookie-content { flex-direction: column; align-items: flex-start; gap: 12px; }
      .cookie-content button { width: 100%; text-align: center; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(banner);
})();

function acceptCookies() {
  localStorage.setItem('cookies_accepted', '1');
  document.getElementById('cookie-banner').remove();
}
