const openMenuIcon = document.querySelector('.menuIcon');
const closeMenuIcon = document.querySelector('.closeBtn');
const ul = document.querySelector('.navBar ul');


const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');


const thumbnails = document.querySelector('.thumbnails');


let currentSlide = 0;
const product = document.querySelector('.slide')


const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');


let afterSale = 125;
let itemBeforeSale = afterSale * 2;
let quantity = 0;


const counter = document.querySelector('.quantity span');


const cartBtn = document.getElementById('cartBtn');
const cartContainer = document.querySelector('.cart');
const addCartBtn = document.querySelector('.addCart');





const itemSpan = document.querySelector('.noOfItems');

function updateQuarterOverCart() {
    if (quantity > 0) {
        itemSpan.style.display = 'block';
        itemSpan.textContent = quantity;
    } else {
        itemSpan.style.display = 'none';
    }
}


incrementBtn.addEventListener('click', () => {
    quantity += 1;
    counter.textContent = quantity;
    updateQuarterOverCart()
})


decrementBtn.addEventListener('click', () => {
    quantity <= 0 ? quantity = 0 : quantity -= 1;
    counter.textContent = quantity;
    itemSpan.textContent = quantity;
    updateQuarterOverCart()
})


openMenuIcon.addEventListener('click', () => {
    ul.classList.toggle('visible');
});


closeMenuIcon.addEventListener('click', () => {
    ul.classList.remove('visible');
})


function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function prevSlide() {
    showSlide(currentSlide - 1);
}


nextBtn.addEventListener('click', () => showSlide(currentSlide - 1));
prevBtn.addEventListener('click', () => showSlide(currentSlide + 1));


cartBtn.addEventListener('click', () => {
    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none';
    } else {
        cartContainer.style.display = 'block';
    }
});


function fullCart() {
    if (quantity > 0) {
        return `<div class="cartHeader">
              <p class="title">cart</p>
              </div>
            <div class="cartBody">
            <div>
                <img class="cartImg" src="images/image-product-1-thumbnail.jpg" alt="">
              </div>
              <div class="cartContent">
                <div>
                    <p>Fall Limited Edition Sneakers</p>
                    <p class="cartPrice">$${afterSale * quantity}.00 x ${quantity} <span id="total">$${itemBeforeSale * quantity}.00</span></p>
                </div>
                <div>
                    <button id = "deleteBtn">
                        <img class = 'deleteIcon' src="images/icon-delete.svg" alt="delete cart">
                    </button>
                </div>
              </div>
            </div>
    <button class="checkOut">check out</button>`
    } else {
        return `<div class="cartHeader">
              <p class="title">cart</p>
            </div>
            <div class="cartBody">
              <div>
                <p>Your cart is empty.</p>
              </div>
            </div>`
    }
}

function updateCart() {
    cartContainer.innerHTML = fullCart();
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', handleDelete);
    }
}


function handleDelete() {
    quantity = 0;
    counter.textContent = quantity;
    updateQuarterOverCart();
    updateCart();
}


addCartBtn.addEventListener('click', () => {
    updateCart();
})


thumbnails.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        product.src = e.target.src.replace('-thumbnail', '');
    }
});


document.addEventListener('mousedown', (e) => {
    // Close the cart container if clicked outside
    if (!cartContainer.contains(e.target) && !cartBtn.contains(e.target)) {
        cartContainer.style.display = 'none';
    }
});


updateCart();




