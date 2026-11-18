(() => {
 const video = document.querySelector('.hero-video');
 const control = document.querySelector('.video-control');
 if (!video || !control) return;
 let waitingForGesture = true;
 const sync = () => {
  const enabled = !video.muted;
  control.setAttribute('aria-pressed', String(enabled));
  control.setAttribute('aria-label', enabled ? 'Desativar áudio da vinheta' : 'Ativar áudio da vinheta');
  control.innerHTML = enabled ? '🔊 <span>Desativar áudio</span>' : '🔇 <span>Ativar áudio</span>';
 };
 const startSound = async () => {
  video.muted = false;
  try { await video.play(); waitingForGesture = false; }
  catch { video.muted = true; video.play().catch(() => {}); }
  sync();
 };
 control.addEventListener('click', () => {
  waitingForGesture = false;
  video.muted = !video.muted;
  video.play().catch(() => { video.muted = true; sync(); });
  sync();
 });
 const firstGesture = event => {
  if (!waitingForGesture || control.contains(event.target)) return;
  if (event.type === 'keydown' && !['Enter',' '].includes(event.key)) return;
  startSound();
 };
 document.addEventListener('click', firstGesture);
 document.addEventListener('keydown', firstGesture);
 video.addEventListener('volumechange', sync);
 startSound();
})();
