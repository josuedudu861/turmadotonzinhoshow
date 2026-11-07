const photoButtons = [...document.querySelectorAll('.moment')];
const photoDialog = document.querySelector('.photo-dialog');
let photoIndex = 0;
function showPhoto(index) {
 photoIndex = (index + photoButtons.length) % photoButtons.length;
 const source = photoButtons[photoIndex].querySelector('img');
 const target = document.querySelector('#expanded-photo'); target.src = source.src; target.alt = source.alt;
 document.querySelector('#photo-caption').textContent = source.alt;
 document.querySelector('#photo-count').textContent = `${photoIndex + 1} / ${photoButtons.length}`;
}
photoButtons.forEach((button, index) => button.addEventListener('click', () => { showPhoto(index); photoDialog.showModal(); document.body.classList.add('photo-open'); }));
document.querySelector('.photo-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('close', () => document.body.classList.remove('photo-open'));
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
document.querySelector('#photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('#photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
photoDialog.addEventListener('keydown', event => { if(event.key === 'ArrowRight') {event.preventDefault();showPhoto(photoIndex + 1);} if(event.key === 'ArrowLeft') {event.preventDefault();showPhoto(photoIndex - 1);} });
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; }));
