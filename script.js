const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeshopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listcard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

let products = [
    { id: 1, name: "PRODUCT 1", image: "1.png", price: 2000 },
    { id: 2, name: "PRODUCT 2", image: "2.png", price: 2200 },
    { id: 3, name: "PRODUCT 3", image: "3.png", price: 1200 },
    { id: 4, name: "PRODUCT 4", image: "4.png", price: 3000 },
    { id: 5, name: "PRODUCT 5", image: "5.png", price: 4500 },
    { id: 6, name: "PRODUCT 6", image: "6.png", price: 2400 }
];

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="img/${value.image}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
            <button onclick="likeProduct(${key})" class="like-button"><i class="far fa-heart"></i></button>
        `;
        list.appendChild(newDiv);
    });
};

initApp();

const addToCart = (key) => {
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity += 1;
    }
    reloadCart();
};

const reloadCart = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="img/${value.image}" alt="${value.name}" height="10%" width="100%"></div>
                <div class="cardtitle">${value.name}</div>
                <div class="cardprice">${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button style="background-color: #2279c2" class="cardbutton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button style="background-color: #2279c2" class="cardbutton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
};

const changeQuantity = (key, qty) => {
    if (qty === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = qty;
    }
    reloadCart();
};

const likeProduct = (key) => {
    // Toggle the heart icon between filled and empty
    const likeButton = document.querySelectorAll('.like-button')[key];
    const heartIcon = likeButton.querySelector('.fa-heart');
    heartIcon.classList.toggle('far');
    heartIcon.classList.toggle('fas');
};
