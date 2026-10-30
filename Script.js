/* =========================================
   LEWO MEN'S WEAR
   WEAR YOUR VOICE.
========================================= */


/* PRODUCTS */

const products = [

  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "T-Shirts",
    price: 899,
    oldPrice: 1199,
    tag: "NEW",
    description: "Premium everyday oversized fit."
  },

  {
    id: 2,
    name: "LEWO Signature Tee",
    category: "T-Shirts",
    price: 799,
    oldPrice: 999,
    tag: "BESTSELLER",
    description: "Minimal branding. Maximum attitude."
  },

  {
    id: 3,
    name: "Heavyweight Boxy Tee",
    category: "T-Shirts",
    price: 999,
    oldPrice: 1299,
    tag: "PREMIUM",
    description: "Heavyweight cotton with structured fit."
  },

  {
    id: 4,
    name: "Relaxed Linen Shirt",
    category: "Shirts",
    price: 1299,
    oldPrice: 1699,
    tag: "NEW",
    description: "Relaxed shirt for effortless style."
  },

  {
    id: 5,
    name: "Everyday Oxford Shirt",
    category: "Shirts",
    price: 1199,
    oldPrice: 1499,
    tag: "ESSENTIAL",
    description: "Clean everyday Oxford shirt."
  },

  {
    id: 6,
    name: "Urban Overshirt",
    category: "Layers",
    price: 1499,
    oldPrice: 1899,
    tag: "LIMITED",
    description: "Layer it. Own the room."
  },

  {
    id: 7,
    name: "Relaxed Straight Jeans",
    category: "Bottoms",
    price: 1599,
    oldPrice: 1999,
    tag: "NEW",
    description: "Relaxed silhouette with premium finish."
  },

  {
    id: 8,
    name: "Utility Cargo",
    category: "Bottoms",
    price: 1499,
    oldPrice: 1899,
    tag: "TRENDING",
    description: "Functional cargo built for everyday movement."
  },

  {
    id: 9,
    name: "LEWO Essential Joggers",
    category: "Essentials",
    price: 1099,
    oldPrice: 1399,
    tag: "ESSENTIAL",
    description: "Comfort-first everyday joggers."
  },

  {
    id: 10,
    name: "Minimal Hoodie",
    category: "Layers",
    price: 1499,
    oldPrice: 1899,
    tag: "WINTER",
    description: "Clean heavyweight hoodie."
  },

  {
    id: 11,
    name: "Signature Polo",
    category: "Essentials",
    price: 999,
    oldPrice: 1299,
    tag: "BESTSELLER",
    description: "Smart casual everyday polo."
  },

  {
    id: 12,
    name: "Relaxed Co-ord",
    category: "Essentials",
    price: 1799,
    oldPrice: 2299,
    tag: "DROP 01",
    description: "Complete look. Zero effort."
  }

];


/* STATE */

let cart = JSON.parse(localStorage.getItem("lewoCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("lewoWishlist")) || [];


/* DOM */

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");


/* LOADER */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {

    loader.style.transition = "opacity 0.7s ease";
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);

  }, 1200);

});


/* PRODUCTS */

function renderProducts(list = products) {

  productGrid.innerHTML = "";

  if (!list.length) {

    productGrid.innerHTML = `
      <div style="grid-column:1/-1;padding:50px 0;">
        <h3>No products found.</h3>
        <p style="color:#777;margin-top:8px;">
          Try another search.
        </p>
      </div>
    `;

    return;
  }


  list.forEach(product => {

    const isLiked = wishlist.includes(product.id);

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">

        <div class="product-placeholder">
          LEWO
        </div>

        <span class="product-tag">
          ${product.tag}
        </span>

        <button
          class="wishlist-btn"
          onclick="toggleWishlist(${product.id})"
        >
          ${isLiked ? "♥" : "♡"}
        </button>

      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <p style="font-size:.65rem;color:#888;">
          ${product.description}
        </p>

        <div class="product-price">
          <strong>₹${product.price.toLocaleString("en-IN")}</strong>
          <del>₹${product.oldPrice.toLocaleString("en-IN")}</del>
        </div>

        <button
          class="add-btn"
          onclick="addToCart(${product.id})"
        >
          ADD TO CART
        </button>

      </div>

    `;

    productGrid.appendChild(card);

  });

}


/* FILTER */

function filterProducts(category, button = null) {

  let filtered = products;

  if (category !== "All") {
    filtered = products.filter(
      product => product.category === category
    );
  }

  document
    .querySelectorAll(".filter-tabs button")
    .forEach(btn => btn.classList.remove("active"));

  if (button) {
    button.classList.add("active");
  }

  renderProducts(filtered);

  document.getElementById("shop").scrollIntoView({
    behavior: "smooth"
  });

}


/* SEARCH */

function openSearch() {

  document
    .getElementById("searchOverlay")
    .classList.add("open");

  setTimeout(() => {
    document.getElementById("searchInput").focus();
  }, 200);

}


function closeSearch() {

  document
    .getElementById("searchOverlay")
    .classList.remove("open");

}


function searchProducts() {

  const query =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();

  const results =
    products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );

  const container =
    document.getElementById("searchResults");

  if (!query) {

    container.innerHTML = `
      <p style="color:#777;font-size:.75rem;">
        Try "oversized", "shirt", "cargo"...
      </p>
    `;

    return;
  }

  container.innerHTML = results
    .slice(0, 6)
    .map(product => `
      <div
        onclick="addToCart(${product.id}); closeSearch();"
        style="
          padding:15px 0;
          border-bottom:1px solid #ddd;
          cursor:pointer;
        "
      >
        <strong>${product.name}</strong>
        <small style="display:block;color:#777;">
          ${product.category} · ₹${product.price}
        </small>
      </div>
    `)
    .join("");

}


/* CART */

function addToCart(id) {

  const product = products.find(
    product => product.id === id
  );

  if (!product) return;

  cart.push(product);

  saveData();

  updateCart();

  showToast(`${product.name} added to cart`);

}


function removeFromCart(index) {

  cart.splice(index, 1);

  saveData();

  updateCart();

}


function updateCart() {

  document.getElementById("cartCount").textContent =
    cart.length;

  const total =
    cart.reduce(
      (sum, product) => sum + product.price,
      0
    );

  document.getElementById("cartTotal").textContent =
    `₹${total.toLocaleString("en-IN")}`;


  if (!cart.length) {

    cartItems.innerHTML = `
      <div style="text-align:center;padding:70px 20px;">
        <h3>Your cart is empty.</h3>
        <p style="color:#777;margin-top:10px;">
          Find something that feels like you.
        </p>
      </div>
    `;

    return;
  }


  cartItems.innerHTML = cart
    .map((product, index) => `

      <div class="cart-item">

        <div class="cart-item-image">
          LEWO
        </div>

        <div>
          <h4>${product.name}</h4>

          <p>
            ${product.category}
          </p>

          <p>
            ₹${product.price.toLocaleString("en-IN")}
          </p>
        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          ×
        </button>

      </div>

    `)
    .join("");

}


function openCart() {

  updateCart();

  document
    .getElementById("cartPanel")
    .classList.add("open");

}


function closeCart() {

  document
    .getElementById("cartPanel")
    .classList.remove("open");

}


/* WISHLIST */

function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(item => item !== id);

    showToast("Removed from wishlist");

  } else {

    wishlist.push(id);

    showToast("Added to wishlist");

  }

  saveData();

  updateWishlist();

  renderProducts();

}


function updateWishlist() {

  document.getElementById("wishlistCount").textContent =
    wishlist.length;


  if (!wishlist.length) {

    wishlistItems.innerHTML = `
      <div style="text-align:center;padding:70px 20px;">
        <h3>Your wishlist is empty.</h3>
      </div>
    `;

    return;
  }


  const items = wishlist
    .map(id =>
      products.find(product => product.id === id)
    )
    .filter(Boolean);


  wishlistItems.innerHTML = items
    .map(product => `

      <div class="cart-item">

        <div class="cart-item-image">
          LEWO
        </div>

        <div>
          <h4>${product.name}</h4>
          <p>₹${product.price}</p>
        </div>

        <button
          class="remove-btn"
          onclick="toggleWishlist(${product.id})"
        >
          ×
        </button>

      </div>

    `)
    .join("");

}


function openWishlist() {

  updateWishlist();

  document
    .getElementById("wishlistPanel")
    .classList.add("open");

}


function closeWishlist() {

  document
    .getElementById("wishlistPanel")
    .classList.remove("open");

}


/* CHECKOUT */

function openCheckout() {

  if (!cart.length) {

    showToast("Your cart is empty");

    return;
  }

  closeCart();

  document
    .getElementById("checkoutModal")
    .classList.add("open");

}


function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.remove("open");

}


function placeOrder(event) {

  event.preventDefault();

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const address =
    document.getElementById("customerAddress").value;

  const city =
    document.getElementById("customerCity").value;


  const items =
    cart
      .map(product => product.name)
      .join(", ");


  const total =
    cart.reduce(
      (sum, product) => sum + product.price,
      0
    );


  const message =

`Hello LEWO 👋

I want to place an order.

Name: ${name}
Phone: ${phone}
Address: ${address}
City: ${city}

Products:
${items}

Total: ₹${total}

WEAR YOUR VOICE.`;


  /*
    IMPORTANT:
    Replace 91XXXXXXXXXX with
    your actual LEWO WhatsApp number.
  */

  const whatsappNumber = "91XXXXXXXXXX";

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


  window.open(url, "_blank");

  cart = [];

  saveData();

  updateCart();

  closeCheckout();

  showToast("Order request created");

}


/* STYLE ASSISTANT */

function openStyleAssistant() {

  document
    .getElementById("styleModal")
    .classList.add("open");

}


function closeStyleAssistant() {

  document
    .getElementById("styleModal")
    .classList.remove("open");

}


function styleResult(style) {

  const recommendations = {

    Casual:
      "Try the Essential Oversized Tee + Relaxed Straight Jeans. Clean, comfortable and effortless.",

    Street:
      "Go for the Heavyweight Boxy Tee + Utility Cargo. Add the Urban Overshirt for layering.",

    Smart:
      "Try the Everyday Oxford Shirt + Straight Fit. Add the Signature Polo for a relaxed-smart look.",

    Minimal:
      "Choose the LEWO Signature Tee + Essential Joggers. Keep the colours neutral and let the fit speak."

  };


  document.getElementById("styleResult").innerHTML = `

    <strong>Your LEWO direction:</strong>

    <p style="margin-top:10px;">
      ${recommendations[style]}
    </p>

    <button
      onclick="closeStyleAssistant(); document.getElementById('shop').scrollIntoView({behavior:'smooth'})"
      style="
        margin-top:15px;
        border:none;
        background:#101010;
        color:white;
        padding:12px 18px;
        font-size:.65rem;
      "
    >
      SHOP THE LOOK →
    </button>

  `;

}


/* MOBILE MENU */

function toggleMenu() {

  document
    .getElementById("mobileMenu")
    .classList.toggle("open");

}


/* TOAST */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* STORAGE */

function saveData() {

  localStorage.setItem(
    "lewoCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "lewoWishlist",
    JSON.stringify(wishlist)
  );

}


/* INITIALIZE */

renderProducts();

updateCart();

updateWishlist();


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeSearch();
    closeCart();
    closeWishlist();
    closeCheckout();
    closeStyleAssistant();

  }

});
