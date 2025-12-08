import '../style.css';

// Toast Notification Logic
const showToast = (message, isError = false) => {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMessage || !toastIcon) return;

  // Set message
  toastMessage.textContent = message;

  // Set styling based on type
  if (isError) {
    toastIcon.className = 'text-red-400 text-xl';
    toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
  } else {
    toastIcon.className = 'text-green-400 text-xl';
    toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
  }

  // Show toast
  toast.classList.remove('hidden', 'opacity-0', 'translate-y-10');
  toast.classList.add('flex', 'opacity-100', 'translate-y-0');

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('flex', 'opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-10');

    // Wait for transition to finish before hiding completely
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3000);
};

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.add('hidden');
  });
});

// Navbar Background on Scroll
// Smart Scroll Logic for Floating Navbar
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Always show if at the very top
  if (currentScrollY <= 0) {
    navbar.classList.remove('-translate-y-[150%]');
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling DOWN -> Hide
    navbar.classList.add('-translate-y-[150%]');
  } else {
    // Scrolling UP -> Show
    navbar.classList.remove('-translate-y-[150%]');
  }

  lastScrollY = currentScrollY;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Form Submission Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos de los inputs
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Validar que no estén vacíos
    if (!data.nombre || !data.email || !data.mensaje) {
      showToast('Por favor, completa todos los campos.', true);
      return;
    }

    try {
      // Enviar los datos al backend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.');
        contactForm.reset();
      } else {
        showToast(result.error || 'Error al enviar el mensaje.', true);
      }

    } catch (error) {
      console.error('Error de red:', error);
      showToast('Problema de conexión con el servidor.', true);
    }
  });
}

// Hero Background Slideshow
const heroImages = ['/hero-bg.jpg', '/hero-bg-2.jpg', '/hero-bg-3.jpg'];
let currentImageIndex = 0;

// Preload images
heroImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % heroImages.length;
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
  }
}, 5000);

// Currency Switch Logic
const btnCop = document.getElementById('btn-cop');
const btnUsd = document.getElementById('btn-usd');
const priceBasic = document.getElementById('price-basic');
const pricePro = document.getElementById('price-pro');
const currencyLabels = document.querySelectorAll('.currency-label');

if (btnCop && btnUsd && priceBasic && pricePro) {

  const setCurrency = (currency) => {
    if (currency === 'USD') {
      // Styles for USD Active
      btnUsd.classList.add('bg-white', 'text-acta-dark', 'shadow-sm');
      btnUsd.classList.remove('text-gray-400');

      btnCop.classList.remove('bg-white', 'text-acta-dark', 'shadow-sm');
      btnCop.classList.add('text-gray-400');

      // Update Prices
      // Accessing childNodes[0] because the price text is the first text node before the span
      priceBasic.childNodes[0].nodeValue = priceBasic.dataset.usd + ' ';
      pricePro.childNodes[0].nodeValue = pricePro.dataset.usd + ' ';

      // Update Labels
      currencyLabels.forEach(label => label.textContent = 'USD');

    } else {
      // Styles for COP Active
      btnCop.classList.add('bg-white', 'text-acta-dark', 'shadow-sm');
      btnCop.classList.remove('text-gray-400');

      btnUsd.classList.remove('bg-white', 'text-acta-dark', 'shadow-sm');
      btnUsd.classList.add('text-gray-400');

      // Update Prices
      priceBasic.childNodes[0].nodeValue = priceBasic.dataset.cop + ' ';
      pricePro.childNodes[0].nodeValue = pricePro.dataset.cop + ' ';

      // Update Labels
      currencyLabels.forEach(label => label.textContent = 'COP');
    }
  };

  btnUsd.addEventListener('click', () => setCurrency('USD'));
  btnCop.addEventListener('click', () => setCurrency('COP'));
}
