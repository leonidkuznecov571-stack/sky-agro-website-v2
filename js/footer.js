(() => {
  const scriptEl = document.querySelector('script[src$="footer.js"]');
  const ROOT = scriptEl ? scriptEl.src.replace(/\/js\/footer\.js.*$/, '') : '';

  const FOOTER_HTML = `
    <div class="footer-main">
      <div class="container footer-main__inner">

        <div class="footer-col footer-col--brand">
          <a href="${ROOT}/index.html" class="footer-logo" aria-label="SKY AGRO — go to homepage">
            <img src="${ROOT}/assets/logos/sky-agro-logo-white.svg" alt="SKY AGRO" width="224" height="78">
          </a>
          <div class="footer-contact" aria-label="Contact details">
            <a href="mailto:info@sky-agro.com" class="footer-contact__link">
              <img src="${ROOT}/assets/icons/contact-icons/email-icon-white.svg" alt="" class="footer-contact__icon" width="16" height="16" aria-hidden="true">
              info@sky-agro.com
            </a>
            <a href="tel:+447460379173" class="footer-contact__link">
              <img src="${ROOT}/assets/icons/contact-icons/phone-icon-white.svg" alt="" class="footer-contact__icon" width="16" height="16" aria-hidden="true">
              07460 379 173
            </a>
          </div>
          <address class="footer-address">
            Unit C, West March Industrial Estate,<span class="footer-address__break" aria-hidden="true"><br></span>
            Daventry NN11 4SA,<span class="footer-address__break" aria-hidden="true"><br></span>
            United Kingdom
          </address>
        </div>

        <div class="footer-col footer-col--company">
          <h2 class="footer-col__heading">Company</h2>
          <ul class="footer-col__links" role="list">
            <li><a href="${ROOT}/about.html" class="footer-col__link">About Us</a></li>
            <li><a href="${ROOT}/blog.html" class="footer-col__link">Blog</a></li>
            <li><a href="${ROOT}/catalogues.html" class="footer-col__link">Catalogues</a></li>
            <li><a href="${ROOT}/contact.html" class="footer-col__link">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-col footer-col--shop">
          <h2 class="footer-col__heading">Shop</h2>
          <ul class="footer-col__links" role="list">
            <li><a href="${ROOT}/shop/brewing-ingredients/" class="footer-col__link">Brewing Ingredients</a></li>
            <li><a href="${ROOT}/shop/chemical-products/" class="footer-col__link">Chemicals</a></li>
            <li><a href="${ROOT}/shop/equipment/" class="footer-col__link">Equipment</a></li>
            <li><a href="${ROOT}/shop/kegs-packaging/" class="footer-col__link">Kegs &amp; Packaging</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h2 class="footer-col__heading">Customer Service</h2>
          <ul class="footer-col__links" role="list">
            <li><a href="${ROOT}/login.html" class="footer-col__link">My Account</a></li>
            <li><a href="${ROOT}/cart.html" class="footer-col__link">My Cart</a></li>
            <li><a href="${ROOT}/legal/delivery-policy.html" class="footer-col__link">Delivery Policy</a></li>
            <li><a href="${ROOT}/legal/equipment-warranty-policy.html" class="footer-col__link">Equipment Warranty</a></li>
            <li><a href="${ROOT}/legal/wholesale-pre-order.html" class="footer-col__link">Wholesale &amp; Pre-Order</a></li>
            <li><a href="${ROOT}/legal/returns-policy.html" class="footer-col__link">Returns Policy</a></li>
          </ul>
        </div>

        <div class="footer-col footer-col--newsletter">
          <h2 class="footer-col__heading">Stay in touch</h2>
          <p class="footer-col__description">Subscribe to get trade updates, new products and stock alerts.</p>
          <form class="footer-subscribe" aria-label="Newsletter subscription">
            <label for="footer-email" class="sr-only">Your email address</label>
            <input type="email" id="footer-email" name="email" class="footer-subscribe__input" placeholder="Enter your email" autocomplete="email">
            <button type="submit" class="btn btn--gold">Subscribe</button>
          </form>
          <div class="footer-social">
            <a href="https://uk.linkedin.com/company/skyagroltd" class="footer-social__link" aria-label="SKY AGRO on LinkedIn" target="_blank" rel="noopener noreferrer">
              <img src="${ROOT}/assets/icons/social-media-icons/linkedin-icon-light.svg" alt="LinkedIn" width="30" height="30">
            </a>
            <a href="https://www.facebook.com/people/Sky-Malt/61567143255365/" class="footer-social__link" aria-label="SKY AGRO on Facebook" target="_blank" rel="noopener noreferrer">
              <img src="${ROOT}/assets/icons/social-media-icons/facebook-icon-light.svg" alt="Facebook" width="30" height="30">
            </a>
            <a href="https://www.instagram.com/skymalt.uk/" class="footer-social__link" aria-label="SKY AGRO on Instagram" target="_blank" rel="noopener noreferrer">
              <img src="${ROOT}/assets/icons/social-media-icons/instagram-icon-light.svg" alt="Instagram" width="30" height="30">
            </a>
          </div>
        </div>

      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom__inner">
        <p class="footer-bottom__copyright">&copy; 2026 SKY AGRO LTD. All rights reserved.</p>
        <nav class="footer-bottom__nav" aria-label="Legal links">
          <a href="${ROOT}/legal/privacy.html" class="footer-bottom__link">Privacy Policy</a>
          <a href="${ROOT}/legal/terms.html" class="footer-bottom__link">Terms &amp; Conditions</a>
          <a href="${ROOT}/legal/cookie-policy.html" class="footer-bottom__link">Cookie Policy</a>
          <a href="${ROOT}/legal/chemical-safety-notice.html" class="footer-bottom__link">Chemical Safety Notice</a>
        </nav>
      </div>
    </div>
  `;

  const footer = document.querySelector('footer.site-footer');
  if (!footer) return;
  footer.innerHTML = FOOTER_HTML;
})();
