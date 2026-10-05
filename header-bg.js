/**
 * Global Header Loader
 * DataCore Systems
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('header-container');
  if (!container) return;

  fetch('/header-bg.html')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      container.innerHTML = data;
    })
    .catch(error => console.error('Error loading navigation header:', error));
});