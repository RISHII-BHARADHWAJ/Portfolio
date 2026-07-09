// ── MOBILE NAV
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

// ── ACTIVE NAV ON SCROLL & NAVBAR BLUR EFFECT
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  // Update Navbar style on scroll
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Update active links
  let current = '';
  sections.forEach(s => {
    // Adding 150 offset to ensure accuracy 
    if (window.scrollY >= s.offsetTop - 150) {
      current = s.id;
    }
  });

  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });
// ── RENDER ARTICLES
const articlesGrid = document.getElementById('articles-grid');
if (articlesGrid && typeof articles !== 'undefined') {
  articles.forEach((art, index) => {
    const card = document.createElement('div');
    card.className = `article-card reveal reveal-delay-${(index % 4) + 1}`;
    
    card.addEventListener('click', () => {
      window.open(art.url, '_blank');
    });

    const tagsHtml = art.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('');

    card.innerHTML = `
      <div class="article-image-container">
        <img class="article-image" src="${art.coverImage}" alt="${art.title}" loading="lazy" />
      </div>
      <div class="article-content">
        <div class="article-meta">
          <span class="article-date">${art.published}</span>
          <span class="article-dot">•</span>
          <span class="article-read-time">${art.readTime}</span>
        </div>
        <h3 class="article-title">${art.title}</h3>
        <p class="article-summary">${art.description}</p>
        <div class="article-tags">
          ${tagsHtml}
        </div>
        <div class="article-footer">
          <span class="article-link">
            Read on Medium
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </span>
        </div>
      </div>
    `;
    articlesGrid.appendChild(card);
  });
}

// ── REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); // Stop observing once it's visible
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// ── CONTACT FORM
const formBtn = document.getElementById('form-btn');
if (formBtn) {
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const msg = document.getElementById('f-msg').value.trim();

    if (!name || !email || !msg) {
      formBtn.textContent = 'Please fill all fields';
      formBtn.style.background = '#ffca28';
      formBtn.style.color = '#000';
      setTimeout(() => {
        formBtn.textContent = 'Send Message →';
        formBtn.style.background = '';
        formBtn.style.color = '';
      }, 2000);
      return;
    }

    formBtn.textContent = 'Sending...';
    formBtn.style.opacity = '0.7';

    // Simulate network request
    setTimeout(() => {
      formBtn.style.display = 'none';
      const successMsg = document.getElementById('form-success');
      successMsg.style.display = 'block';
      
      // Clear inputs
      document.getElementById('f-name').value = '';
      document.getElementById('f-email').value = '';
      document.getElementById('f-msg').value = '';

      // Reset form after a few seconds
      setTimeout(() => {
        successMsg.style.display = 'none';
        formBtn.style.display = 'block';
        formBtn.style.opacity = '1';
        formBtn.textContent = 'Send Another Message →';
      }, 5000);
    }, 1200);
  });
}

// ── BACK TO TOP FLOATING BUTTON
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

