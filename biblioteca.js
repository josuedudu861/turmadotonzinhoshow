const menuToggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#nav');
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open);});
const cards=[...document.querySelectorAll('.book-card')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));cards.forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);const n=cards.filter(c=>!c.hidden).length;document.querySelector('#filter-status').textContent=`${n} ${n===1?'material disponível':'materiais disponíveis'}`;}));
const reader=document.querySelector('.reader-dialog');
let pageNumber=1, pageTotal=1, pagePrefix='', bookTitle='';
function renderPage(){const image=document.querySelector('#reader-image');image.src=`leitura-${pagePrefix}-${String(pageNumber).padStart(2,'0')}.jpg`;image.alt=`${bookTitle}, página ${pageNumber} de ${pageTotal}`;document.querySelector('#reader-counter').textContent=`${pageNumber} / ${pageTotal}`;document.querySelector('#reader-prev').disabled=pageNumber===1;document.querySelector('#reader-next').disabled=pageNumber===pageTotal;document.querySelector('.reader-pages').scrollTop=0;}
document.querySelectorAll('.read-book').forEach(button=>button.addEventListener('click',()=>{bookTitle=button.dataset.title;pageTotal=Number(button.dataset.pages);pagePrefix=button.dataset.prefix;pageNumber=1;document.querySelector('#reader-title').textContent=bookTitle;document.querySelector('#reader-external').href=button.dataset.pdf;document.querySelector('#reader-download').href=button.dataset.pdf;renderPage();reader.showModal();document.body.classList.add('reader-open');}));
document.querySelector('#reader-prev').addEventListener('click',()=>{if(pageNumber>1){pageNumber--;renderPage();}});
document.querySelector('#reader-next').addEventListener('click',()=>{if(pageNumber<pageTotal){pageNumber++;renderPage();}});
reader.addEventListener('keydown',event=>{if(event.key==='ArrowRight'&&pageNumber<pageTotal){event.preventDefault();pageNumber++;renderPage();}if(event.key==='ArrowLeft'&&pageNumber>1){event.preventDefault();pageNumber--;renderPage();}});
document.querySelector('.close-reader').addEventListener('click',()=>reader.close());
reader.addEventListener('close',()=>{document.querySelector('#reader-image').removeAttribute('src');document.body.classList.remove('reader-open');});
reader.addEventListener('click',event=>{if(event.target===reader)reader.close();});
document.querySelector('#year').textContent=new Date().getFullYear();
