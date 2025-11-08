// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Lightweight product data (replace with API)
const PRODUCT_DATA = {
  1:{title:'Deaken T-shirt',price:'₹3,499',img:'https://m.media-amazon.com/images/I/6161xaXUWDL.jpg',desc:'A modern, relaxed-fit utility jacket made from a recycled-cotton blend.'},
  2:{title:'Slim Denim',price:'₹2,099',img:'https://tokyorevengersstore.com/wp-content/uploads/2022/10/toman-mikey-kimono-506020-removebg-preview.png',desc:'Clean-lined denim with a slightly tapered fit.'},
  3:{title:'Rib Knit Sweater',price:'₹1,799',img:'https://images-cdn.ubuy.co.in/63b1abaf0e7749296f5d4863-toptok-tokyo-revengers-cosplay-costume.jpg',desc:'Comfortable ribbed sweater in a soft yarn.'},
  4:{title:'Classic Chino',price:'₹1,499',img:'https://i5.walmartimages.com/asr/3a5e1677-b02a-4fdc-9b6d-6606fb029dc9.0555ce6bc8504d27b3b145fce8748630.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',desc:'Everyday chinos with a modern cut.'},
  5:{title:'Organic Cotton Tee',price:'₹799',img:'https://i5.walmartimages.com/asr/3a5e1677-b02a-4fdc-9b6d-6606fb029dc9.0555ce6bc8504d27b3b145fce8748630.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',desc:'Staple tee made from certified organic cotton.'},
  6:{title:'Lightweight Bomber',price:'₹2,299',img:'https://via.placeholder.com/1600x1800.png?text=Lightweight+Bomber',desc:'A bomber jacket designed for layering.'},
  7:{title:'Wool Blend Coat',price:'₹4,999',img:'https://via.placeholder.com/1600x1800.png?text=Wool+Blend+Coat',desc:'A refined coat with a modern silhouette.'},
  8:{title:'Relaxed Shorts',price:'₹999',img:'https://via.placeholder.com/1600x1800.png?text=Relaxed+Shorts',desc:'Casual shorts with comfortable fit.'},
  9:{title:'Cotton Shirt',price:'₹1,199',img:'https://via.placeholder.com/1600x1800.png?text=Cotton+Shirt',desc:'Classic button-down cotton shirt.'},
  10:{title:'Everyday Joggers',price:'₹1,299',img:'https://via.placeholder.com/1600x1800.png?text=Everyday+Joggers',desc:'Soft joggers for daily comfort.'},
  11:{title:'Tiered Dress',price:'₹2,199',img:'https://via.placeholder.com/1600x1800.png?text=Tiered+Dress',desc:'Lightweight tiered dress with flowy fit.'},
  12:{title:'Woven Scarf',price:'₹599',img:'https://via.placeholder.com/1600x1800.png?text=Woven+Scarf',desc:'A soft woven scarf for layering.'}
};

// Elements
const header = document.getElementById('siteHeader');
const heroImage = document.querySelector('.hero-image img');
const heroTitle = document.querySelector('.hero-title');
const heroSub = document.querySelector('.hero-sub');
const cards = gsap.utils.toArray('.card');
const overlay = document.getElementById('overlay');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalImage = document.getElementById('modalImage');
const closeModalBtn = document.getElementById('closeModalBtn');

// 1) Header shrink on scroll (smooth)
gsap.to(header, {
  boxShadow: '0 8px 24px rgba(16,24,40,0.06)',
  padding: '12px 24px',
  ease: 'power1.out',
  paused: true,
  scrollTrigger: {
    start: 10,
    end: 99999,
    onEnter: () => header.classList.add('shrink'),
    onLeaveBack: () => header.classList.remove('shrink')
  }
});

// 2) Hero entrance
gsap.from(heroTitle, {y: 40, opacity: 0, duration: .9, ease: 'power3.out', delay: .12});
gsap.from(heroSub, {y: 20, opacity: 0, duration: .9, ease: 'power3.out', delay: .22});
gsap.from('.cta-row .btn', {y: 12, opacity: 0, duration: .7, stagger: .08, delay: .3});

// 3) Parallax hero image (smooth, based on scroll)
gsap.to(heroImage, {
  yPercent: -18,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 0.9
  }
});

// 4) Cards staggered reveal with ScrollTrigger
gsap.utils.toArray('.fade').forEach((elem, i) => {
  gsap.fromTo(elem, {y: 30, opacity: 0}, {
    y: 0, opacity: 1, duration: .7, ease: 'power2.out',
    scrollTrigger: {
      trigger: elem,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    delay: i * 0.03
  });
});

// 5) Card image subtle parallax on hover (GSAP mousemove)
cards.forEach(card => {
  const img = card.querySelector('img');
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {y: -10, duration: .28, ease: 'power2.out'});
    gsap.to(img, {scale: 1.06, duration: .9, ease: 'power3.out'});
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {y: 0, duration: .4, ease: 'power3.out'});
    gsap.to(img, {scale: 1, duration: .8, ease: 'power3.out'});
  });

  // micro tilt on pointer move (subtle)
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const tiltX = (py - 0.5) * 6; // degrees
    const tiltY = (px - 0.5) * -6;
    gsap.to(card, {rotationX: tiltX, rotationY: tiltY, transformPerspective: 800, transformOrigin: 'center', duration: .45, ease: 'power3.out'});
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {rotationX: 0, rotationY: 0, duration: .6, ease: 'power3.out'});
  });
});

// 6) Button press micro-interaction
gsap.utils.toArray('.btn').forEach(btn => {
  btn.addEventListener('mousedown', () => gsap.to(btn, {scale: .96, duration: .08}));
  btn.addEventListener('mouseup', () => gsap.to(btn, {scale: 1, duration: .12}));
  btn.addEventListener('mouseleave', () => gsap.to(btn, {scale: 1, duration: .12}));
});

// 7) Quick view modal (animated open/close)
function openQuickView(id){
  const p = PRODUCT_DATA[id];
  if(!p) return;
  modalTitle.textContent = p.title;
  modalPrice.textContent = p.price;
  modalDesc.textContent = p.desc;
  modalImage.innerHTML = `<img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:10px">`;
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden','false');

  // animate modal in
  gsap.fromTo('.modal', {y: 30, opacity: 0, scale: .98}, {y:0, opacity:1, scale:1, duration: .42, ease: 'power3.out'});
  gsap.fromTo('#modalImage img', {scale: 1.03}, {scale:1, duration: 1.1, ease:'power3.out'});
}

function closeQuickView(){
  // animate modal out then hide
  gsap.to('.modal', {y: 20, opacity: 0, scale: .98, duration: .36, ease: 'power2.in', onComplete: () => {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
  }});
}

// 8) Delegate click for quick view buttons
document.addEventListener('click', function(e){
  const btn = e.target.closest('[data-action="quickview"]');
  if(btn){
    const id = btn.getAttribute('data-id');
    if(id) openQuickView(id);
  }
});

// Close handlers
overlay.addEventListener('click', (e)=>{
  if(e.target === overlay) closeQuickView();
});
closeModalBtn.addEventListener('click', closeQuickView);
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeQuickView();
});

// 9) Mobile optimizations: reduce heavy motion for prefers-reduced-motion users
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if(prefersReduced && prefersReduced.matches){
  gsap.globalTimeline.timeScale(3); // speed up animations to feel less intrusive
  ScrollTrigger.getAll().forEach(st => st.disable());
}
