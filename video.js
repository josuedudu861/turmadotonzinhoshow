(() => {
 const video=document.querySelector('.hero-video'),control=document.querySelector('.video-control'),hero=document.querySelector('.hero');
 if(!video||!control||!hero)return;
 video.autoplay=false;video.loop=false;video.muted=true;video.pause();
 const music=new Audio(video.querySelector('source').getAttribute('src'));music.loop=true;music.preload='none';let enabled=false,waiting=true,scheduled=false;
 const sync=()=>{control.setAttribute('aria-pressed',String(enabled));control.setAttribute('aria-label',enabled?'Desativar áudio da vinheta':'Ativar áudio da vinheta');control.innerHTML=enabled?'🔊 <span>Desativar áudio</span>':'🔇 <span>Ativar áudio</span>';};
 const enable=()=>{music.play().then(()=>{enabled=true;waiting=false;sync();}).catch(()=>{enabled=false;sync();});};
 control.addEventListener('click',()=>{waiting=false;if(enabled){music.pause();enabled=false;sync();}else enable();});
 document.addEventListener('click',event=>{if(waiting&&!control.contains(event.target))enable();});
 const update=()=>{scheduled=false;if(!Number.isFinite(video.duration))return;const rect=hero.getBoundingClientRect();const progress=Math.max(0,Math.min(1,-rect.top/Math.max(400,rect.height*.75)));const target=.05+progress*Math.max(0,video.duration-.10);if(Math.abs(video.currentTime-target)>.035)video.currentTime=target;};
 const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};
 video.addEventListener('loadedmetadata',schedule);video.addEventListener('loadeddata',schedule);video.load();video.addEventListener('play',()=>video.pause());addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);sync();enable();schedule();
})();
