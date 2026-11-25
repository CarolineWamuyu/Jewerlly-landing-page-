const orderOverlay = document.querySelector('.order-overlay');
const orderPiece = document.querySelector('#order-piece');
let lastOrderTrigger;

function openOrder(product){
  lastOrderTrigger = document.activeElement;
  orderPiece.value = product || '';
  orderOverlay.classList.add('show');
  orderOverlay.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  orderOverlay.querySelector('input').focus();
}
function closeOrder(){
  orderOverlay.classList.remove('show');
  orderOverlay.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  if(lastOrderTrigger)lastOrderTrigger.focus();
}
document.querySelectorAll('.order-trigger').forEach(button=>button.addEventListener('click',()=>openOrder(button.dataset.product)));
document.querySelectorAll('.order-open').forEach(button=>button.addEventListener('click',event=>{
  event.preventDefault();
  openOrder('');
}));
document.querySelector('.order-close').addEventListener('click',closeOrder);
orderOverlay.addEventListener('click',event=>{if(event.target===orderOverlay)closeOrder()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&orderOverlay.classList.contains('show'))closeOrder()});
document.querySelector('#newsletter-form').addEventListener('submit',e=>{
  e.preventDefault();document.querySelector('#newsletter-message').textContent='THANK YOU — YOU ARE ON THE LIST.';e.target.reset();
});
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.menu-toggle').classList.toggle('active'));

// Editorial motion: restrained reveals, image drift and staggered entrances.
if(window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-copy .reveal',{y:35,opacity:0,duration:1,stagger:.14,ease:'power3.out',delay:.15});
  gsap.from('.hero-image-wrap',{clipPath:'inset(8% 8% 8% 8%)',opacity:0,duration:1.35,ease:'power3.inOut',delay:.25});
  gsap.utils.toArray('.editorial-tile,.product-float,.collection-card,.product-card,.craft-copy,.craft-image').forEach((el)=>{
    gsap.from(el,{y:45,opacity:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
  });
  gsap.utils.toArray('.campaign>img').forEach(img=>gsap.to(img,{yPercent:8,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
}