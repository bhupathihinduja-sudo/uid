let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// DISPLAY CART
function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <div class="qty">
          <button onclick="decrease(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increase(${index})">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

// INCREASE
function increase(index) {
  cart[index].quantity++;
  updateCart();
}

// DECREASE
function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

// UPDATE
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// LOAD CART
displayCart();
function showOrderPopup() {
  let popup = document.getElementById("order-popup");
  popup.style.display = "flex";

  // Auto close after 2.5 sec
  setTimeout(() => {
    popup.style.display = "none";
  }, 2500);
}
let selectedRating = 0;

function showOrderPopup() {
  document.getElementById("order-popup").style.display = "flex";

  // After 2 seconds → hide order popup & show review popup
  setTimeout(() => {
    document.getElementById("order-popup").style.display = "none";
    document.getElementById("review-popup").style.display = "flex";
  }, 2000);
}

// STAR RATING
function rate(num) {
  selectedRating = num;
  let stars = document.querySelectorAll(".stars span");

  stars.forEach((star, index) => {
    if (index < num) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

// SUBMIT REVIEW
function submitReview() {
  let reviewText = document.getElementById("review-text").value;

  if (selectedRating === 0) {
    alert("Please select rating ⭐");
    return;
  }

  alert("Thank you for your review ❤️");

  document.getElementById("review-popup").style.display = "none";

  // Reset
  selectedRating = 0;
  document.getElementById("review-text").value = "";
  document.querySelectorAll(".stars span").forEach(s => s.classList.remove("active"));
}