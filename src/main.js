// Importamos el CSS para que Vite lo empaquete correctamente
import './style.css';

// --- 1. Lógica de la Barra de Navegación Flotante (Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Bajando y ya pasamos el Hero: ocultar
      navbar.classList.remove('translate-y-0');
      navbar.classList.add('-translate-y-32');
    } else {
      // Subiendo: mostrar
      navbar.classList.remove('-translate-y-32');
      navbar.classList.add('translate-y-0');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }, false);

  // Lógica para botón de menú móvil
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
});

// --- 2. Lógica del Conversor de Moneda (COP/USD) ---
document.addEventListener('DOMContentLoaded', () => {
  const btnCop = document.getElementById('btn-cop');
  const btnUsd = document.getElementById('btn-usd');
  const priceBasic = document.getElementById('price-basic');
  const pricePro = document.getElementById('price-pro');
  const currencyLabels = document.querySelectorAll('.currency-label');

  function updatePrices(currency) {
    let priceTarget = (currency === 'USD') ? 'data-usd' : 'data-cop';
    let labelText = (currency === 'USD') ? 'USD' : 'COP';

    // Actualizar precios
    if (priceBasic) priceBasic.innerHTML = `${priceBasic.getAttribute(priceTarget)} <span class="text-lg font-normal text-gray-500 currency-label">${labelText}</span>`;
    if (pricePro) pricePro.innerHTML = `${pricePro.getAttribute(priceTarget)} <span class="text-lg font-normal text-gray-500 currency-label">${labelText}</span>`;

    // Actualizar estilos del botón
    if (btnCop && btnUsd) {
      if (currency === 'USD') {
        btnUsd.classList.remove('bg-white', 'text-gray-400');
        btnUsd.classList.add('bg-white', 'text-acta-dark');
        btnCop.classList.remove('bg-white', 'text-acta-dark');
        btnCop.classList.add('text-gray-400');
      } else {
        btnCop.classList.remove('bg-white', 'text-gray-400');
        btnCop.classList.add('bg-white', 'text-acta-dark');
        btnUsd.classList.remove('bg-white', 'text-acta-dark');
        btnUsd.classList.add('text-gray-400');
      }
    }
  }

  if (btnCop && btnUsd) {
    btnCop.addEventListener('click', () => updatePrices('COP'));
    btnUsd.addEventListener('click', () => updatePrices('USD'));
  }
});
