const cart = [];
const cartPanel = document.getElementById('cartPanel');
const scrim = document.getElementById('scrim');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function renderCart(){
  cartItems.innerHTML = '';
  cart.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `<div><strong>${item.name}</strong><small>£${item.price.toFixed(2)}</small></div>
      <button class="remove-item" data-index="${i}">Remove</button>`;
    cartItems.appendChild(row);
  });
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, x)=>sum+x.price,0);
  cartTotal.textContent = `£${total.toFixed(2)}`;
  document.querySelectorAll('.remove-item').forEach(btn=>{
    btn.addEventListener('click', e=>{
      cart.splice(Number(e.currentTarget.dataset.index),1);
      renderCart();
    });
  });
}
function openCart(){
  cartPanel.classList.add('open');
  scrim.classList.add('show');
  cartPanel.setAttribute('aria-hidden','false');
}
function closeCart(){
  cartPanel.classList.remove('open');
  scrim.classList.remove('show');
  cartPanel.setAttribute('aria-hidden','true');
}
document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    cart.push({name:btn.dataset.name, price:Number(btn.dataset.price)});
    renderCart();
    openCart();
  });
});
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
scrim.addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  alert('Checkout is not connected yet. Link this button to Stripe, Shopify, WooCommerce, Square or Nicepage Ecommerce.');
});
document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
