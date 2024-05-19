const cartContainer = document.querySelector(".cart-container .cart-box");
const payMoneyNow = document.querySelector(".pay-money-now");
const payMoney = document.querySelector(".pay-money");
let money = 0;
let cartDeleteBtn;
renderCart();

function renderCart() {
    if (cartItems.items.length > 0) {
        let cartInnerHTML = "";
        money = 0;
        cartItems.items.forEach((element, index) => {
            console.log(element)
            money += Number(element.price);
            cartInnerHTML += `
            <div class="cart-item">
                <img
                    src="${element.imgsCar[0]}"
                    alt="hinh anh"
                    class="cart-item__img"
                />
                <div class="cart-item__info">
                    <span class="cart-item__name">${element.tenXe}</span>
                    <p class="cart-item__desc">
                        Bảo hành :
                        <span class="cart-item__info-date">${element.warranty}</span>
                    </p>
                    <span data-cart=${index} class="cart-delete">Xóa</span>
                </div>
                <div class="cart__box-price">
                    <span class="cart__box-price-span"
                        >${Number(element.price).toLocaleString("en-US")} vnd</span
                    >
                </div>
            </div>
            `;
        });
        cartContainer.innerHTML = cartInnerHTML;
        cartDeleteBtn = document.querySelectorAll(".cart-delete");
        cartDeleteBtn.forEach((e) => {
            e.onclick = () => {
                let idx = Number(e.dataset.cart);
                cartItems.items.splice(idx, 1);
                let quantity = --cartItems.amount;
                cartItems = {
                    amount: quantity,
                    items: cartItems.items,
                };
                localStorage.setItem("cart-items", JSON.stringify(cartItems));
                updateStatusCart();
                e.closest(".cart-item").remove();
                renderCart();
            };
        });
    } else {
        cartContainer.innerHTML = `
            <div class="no-cart__img"></div>
            <div class="cart-box__bottom">
                <a href="./tourDuLich.html" class="cart-back">Tiếp tục chọn tour</a>
            </div>`;
    }
    if(cartItems.items.length <= 0)
    {
        money = 0;
    }
    payMoneyNow.innerHTML = money.toLocaleString("en-US").toString() + "₫";
    payMoney.innerHTML = money.toLocaleString("en-US").toString() + "₫";
}
renderCart();
