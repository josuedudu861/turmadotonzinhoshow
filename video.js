const video = document.querySelector('.hero-video');
const control = document.querySelector('.video-control');
control?.addEventListener('click', () => {
  video.muted = !video.muted;
  const enabled = !video.muted;
  control.setAttribute('aria-pressed', String(enabled));
  control.setAttribute('aria-label', enabled ? 'Desativar som da vinheta' : 'Ativar som da vinheta');
  control.innerHTML = enabled ? '🔊 <span>Desativar som</span>' : '🔇 <span>Ativar som</span>';
});
