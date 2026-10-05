/**
 * Global Image Lightbox Modal Utility
 * DataCore Systems
 */

// Inject Lightbox HTML dynamically into the page DOM if it doesn't already exist
function injectLightboxHTML() {
  if (document.getElementById('imageLightbox')) return;

  const lightboxHTML = `
    <div id="imageLightbox" class="fixed inset-0 z-[9999] hidden bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
      <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <!-- Close Button -->
        <button onclick="closeLightbox()" class="absolute -top-10 right-0 text-slate-400 hover:text-white text-base font-mono focus:outline-none flex items-center gap-2">
          <i class="fa-solid fa-xmark text-lg"></i> Close [ESC]
        </button>
        <!-- Expanded Image Container -->
        <img id="lightboxImg" src="" alt="Enlarged view" class="max-h-[85vh] max-w-full rounded-2xl border border-brand-border shadow-2xl object-contain">
        <!-- Image Caption -->
        <p id="lightboxCaption" class="text-xs font-mono text-slate-400 mt-3 text-center"></p>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}

// Open Lightbox with targeted image
function openLightbox(src, alt = '') {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightboxCaption.textContent = alt || 'System Screenshot View';
  
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent page scrolling behind modal
}

// Close Lightbox
function closeLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore page scrolling
  }
}

// Initialize listeners & click events on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Lightbox HTML structure
  injectLightboxHTML();

  // 2. Automatically bind click events & cursors to images inside <main> or marked .clickable-img
  const images = document.querySelectorAll('main img, .clickable-img');
  
  images.forEach(img => {
    img.classList.add('cursor-zoom-in', 'transition-transform', 'hover:scale-[1.01]');
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // 3. Close modal when clicking outside the image container
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // 4. Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});