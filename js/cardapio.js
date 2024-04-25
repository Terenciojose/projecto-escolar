const cartModal = document.querySelector('.card-bg')
const cartBtn = document.querySelector('#cart-btn')
const menu = document.querySelector('#menu')
const cartItemContainer = document.querySelector('#cart-item')
const cartTotal = document.querySelector('#cart-total')
const closeModalBtn = document.querySelector('#close-modal-btn')
const checkoutBtn = document.querySelector('#checkout-btn')
const cartCount = document.querySelector('#cart-count')
const address = document.querySelector('#address')
const addressWarn = document.querySelector('#address-warn')
const addToCartBtn = document.querySelector('.add-to-cart-btn')

let cart = [];

cartBtn.addEventListener('click', function(){
  updateCartModal()
  cartModal.classList.remove('hidden')
})
// cartModal.addEventListener('click', function(){
//   cartModal.classList.add('hidden')
// })
closeModalBtn.addEventListener('click', function(){
  cartModal.classList.add('hidden')
})
menu.addEventListener('click', function(event){
  let parentButton = event.target.closest(".add-to-cart-btn")
  
  if (parentButton) {
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    addToCart(name, price)

    toastr.success('Adicionado com sucesso ', 'produto')
  }
})

function addToCart(name, price){
  const existingItem = cart.find(item => item.name === name)

  if (existingItem) {
    existingItem.quantity  += 1;
  }else{
    cart.push({
      name,
      price,
      quantity: 1,
    })
  }

  updateCartModal()
}
function updateCartModal(){
   cartItemContainer.innerHTML = "";
   let total = 0;

   cart.forEach(item => {
    const cartItemElement = document.createElement("div")

    cartItemElement.classList.add("flex", "just", "mb", "flexCol")
    cartItemElement.innerHTML = `
    <div class="flex items just">
    <div>
    <p class="font-medium">${item.name}</p>
    <p>Qtd: ${item.quantity}</p>
    <p class="font-medium mt-2">kz ${item.price.toFixed(2)}</p>
    </div>

    <button class="bg remove-from-cart-btn" data-name="${item.name}">
    Remover
    </button>

    </div>
    `

    total += item.price * item.quantity;

    cartItemContainer.appendChild(cartItemElement)
  })

  cartTotal.textContent = total;

  cartCount.innerHTML = cart.length;
}


cartItemContainer.addEventListener("click", function(e){
  if (e.target.classList.contains("remove-from-cart-btn")) {
    const name = e.target.getAttribute("data-name");

    removeItemCart(name);
  }
})

function removeItemCart(name){
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) { 
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
}
address.addEventListener('input', function(event){
  let inptValue = event.target.value;
  if (inptValue !== "") {
    addressWarn.classList.add('hidden');
  }
})
checkoutBtn.addEventListener('click', function(){
  if (cart.length === 0) return;
  if (address.value === "") {
    addressWarn.classList.remove("hidden");
    return;
  }

    const cartItems = cart.map((item) => {
      return(
          `${item.name} Quantidade: (${item.quantity}) Preço: KZ${item.price} |`
      )
      }).join("")

      const message = encodeURIComponent(cartItems)
      const phone = "943400368"

      window.open(`https://wa.me/${phone}?text=${message} Enndereço:${address.value}`, "_blank")

      cart = [];
      updateCartModal();
      address.value = "";

})