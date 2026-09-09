const cart = JSON.parse(localStorage.getItem('wildeveld-cart') || '[]');
const cartPanel = document.getElementById('cartPanel');
const checkoutModal = document.getElementById('checkoutModal');
const scrim = document.getElementById('scrim');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const floatingCount = document.getElementById('floatingCount');
const cartTotal = document.getElementById('cartTotal');
const cartEmpty = document.getElementById('cartEmpty');
let orderMessage = '';

const money = n => `£${n.toFixed(2)}`;
const itemCount = () => cart.reduce((n,x)=>n+x.qty,0);
const total = () => cart.reduce((n,x)=>n+(x.price*x.qty),0);
function saveCart(){ localStorage.setItem('wildeveld-cart', JSON.stringify(cart)); }

function renderCart(){
  cartItems.innerHTML='';
  cart.forEach((item,i)=>{
    const row=document.createElement('div'); row.className='cart-item';
    row.innerHTML=`<div class="cart-item-info"><strong>${item.name}</strong><small>${money(item.price)} each</small></div><div class="qty-control"><button data-action="minus" data-index="${i}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-action="plus" data-index="${i}" aria-label="Increase quantity">+</button></div><strong>${money(item.price*item.qty)}</strong><button class="remove-item" data-index="${i}">Remove</button>`;
    cartItems.appendChild(row);
  });
  cartCount.textContent=itemCount(); floatingCount.textContent=itemCount(); cartTotal.textContent=money(total());
  cartEmpty.style.display=cart.length?'none':'flex'; document.getElementById('checkoutBtn').disabled=!cart.length;
  saveCart(); updatePreview();
}
function addItem(btn){
  const id=btn.dataset.id||btn.dataset.name; const found=cart.find(x=>x.id===id);
  if(found) found.qty++; else cart.push({id,name:btn.dataset.name,price:Number(btn.dataset.price),qty:1});
  renderCart(); openCart();
}
function openCart(){cartPanel.classList.add('open');scrim.classList.add('show');cartPanel.setAttribute('aria-hidden','false');}
function closeCart(){cartPanel.classList.remove('open');cartPanel.setAttribute('aria-hidden','true');if(!checkoutModal.classList.contains('open'))scrim.classList.remove('show');}
function openCheckout(){if(!cart.length){openCart();return;}closeCart();checkoutModal.classList.add('open');checkoutModal.setAttribute('aria-hidden','false');scrim.classList.add('show');updatePreview();}
function closeCheckout(){checkoutModal.classList.remove('open');checkoutModal.setAttribute('aria-hidden','true');scrim.classList.remove('show');}
function updatePreview(){
  const box=document.getElementById('orderPreview'); if(!box)return;
  if(!cart.length){box.innerHTML='<p>Add biltong to your basket first.</p>';return;}
  box.innerHTML=`<strong>Order summary</strong>${cart.map(x=>`<div><span>${x.qty} × ${x.name}</span><b>${money(x.qty*x.price)}</b></div>`).join('')}<div class="preview-total"><span>Total</span><b>${money(total())}</b></div>`;
}
function buildMessage(){
  const name=document.getElementById('customerName').value.trim(); const contact=document.getElementById('customerContact').value.trim(); const method=document.getElementById('orderMethod').value; const area=document.getElementById('customerArea').value.trim(); const notes=document.getElementById('orderNotes').value.trim();
  const lines=['WILDEVELD BILTONG — ORDER REQUEST','',`Name: ${name}`,`Contact: ${contact}`,`Method: ${method}`]; if(area)lines.push(`Postcode / area: ${area}`); lines.push('','Order:'); cart.forEach(x=>lines.push(`• ${x.qty} × ${x.name} — ${money(x.qty*x.price)}`)); lines.push('',`Order total: ${money(total())}`); if(notes)lines.push('',`Notes: ${notes}`); lines.push('','Please confirm availability, delivery/collection and payment details.'); return lines.join('\n');
}

document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>addItem(btn)));
cartItems.addEventListener('click',e=>{const btn=e.target.closest('button');if(!btn)return;const i=Number(btn.dataset.index);if(btn.dataset.action==='plus')cart[i].qty++;if(btn.dataset.action==='minus'){cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1);}if(btn.classList.contains('remove-item'))cart.splice(i,1);renderCart();});
document.getElementById('cartBtn').addEventListener('click',openCart);document.getElementById('floatingOrder').addEventListener('click',openCart);document.getElementById('openOrderBtn').addEventListener('click',()=>cart.length?openCheckout():document.getElementById('shop').scrollIntoView());document.getElementById('closeCart').addEventListener('click',closeCart);document.getElementById('checkoutBtn').addEventListener('click',openCheckout);document.getElementById('closeCheckout').addEventListener('click',closeCheckout);document.getElementById('emptyShopLink').addEventListener('click',closeCart);
scrim.addEventListener('click',()=>{closeCart();closeCheckout();});
document.getElementById('orderForm').addEventListener('submit',e=>{e.preventDefault();orderMessage=buildMessage();document.getElementById('sharePanel').hidden=false;document.getElementById('sharePanel').scrollIntoView({behavior:'smooth',block:'nearest'});});
document.getElementById('copyOrderBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(orderMessage);document.getElementById('copyStatus').textContent='Order copied — paste it into WhatsApp, Messenger, email or SMS.';}catch{document.getElementById('copyStatus').textContent='Copy was blocked by your browser. Use Share instead.';}});
document.getElementById('shareOrderBtn').addEventListener('click',async()=>{if(!orderMessage)orderMessage=buildMessage();if(navigator.share){try{await navigator.share({title:'Wildeveld Biltong order',text:orderMessage});}catch{}}else{try{await navigator.clipboard.writeText(orderMessage);document.getElementById('copyStatus').textContent='Sharing is not supported here, so the order was copied instead.';}catch{}}});

document.getElementById('year').textContent=new Date().getFullYear();const menuBtn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
renderCart();