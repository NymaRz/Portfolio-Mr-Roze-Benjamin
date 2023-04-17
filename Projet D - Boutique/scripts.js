// Gère l'ajout d'un produit au panier
function addToCart(productId, price) {
    const cart = getCart();
  
    if (cart[productId]) {
      cart[productId].quantity += 1;
    } else {
      cart[productId] = {
        price: price,
        quantity: 1,
      };
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  // Récupère le contenu du panier à partir du stockage local
  function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
  }
  
  // Met à jour le nombre d'articles dans le bouton du panier
  function updateCartCount() {
    const cart = getCart();
    let count = 0;
  
    for (const productId in cart) {
      count += cart[productId].quantity;
    }
  
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = count;
  }
  
  // Exécute la mise à jour du nombre d'articles au chargement de la page
  updateCartCount();
  
  