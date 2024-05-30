let array = [];
const contentSlider = document.querySelector(".content-slider");
let numberslider = 7;

//Load main conten
const dataUrl = "https://66570a3f9f970b3b36c7b59a.mockapi.io/v1/xeotodien/otodien";
fetch(dataUrl)
    .then((res) => res.json())
    .then((res) => {
        array = res;
    });

function showAlert() {
    let alertBox = document.querySelector(".alertBox");
    alertBox.style.transform = "translateX(0%)";
    alertBox.style.opacity = "1";
    setTimeout(() => {
        closeAlert(alertBox);
    }, 2500);
}

function closeAlert(alertBox) {
    alertBox.style.transform = "translateX(100%)";
    alertBox.style.opacity = "0";
}

function handleXedien() {
    //render slider
    if (contentSlider) {
        let sliders = "";
        for (let i = 1; i <= numberslider; i++) {
            sliders += `
                <div class="content-slider__item">
                    <img
                        src="../imgs/slider/slider_${i}.jpg"
                        alt="slide ${i}"
                        class="content-slider__item-img"
                    />
                </div>
                `;
        }
        contentSlider.innerHTML = sliders;
    }

    //setup slider
    $(document).ready(function () {
        $(".content-slider").slick({
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            cssEase: "linear",
            variableWidth: true,
            variableHeight: true,
            arrows: false,
        });
    });

    //tùy chỉnh nút next prev của slider
    $(".content-slider__prev-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickPrev");
    });

    $(".content-slider__next-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickNext");
    });
}

function handleLikeItemCar(data) {
    localStorage.setItem("like-items", JSON.stringify(cartItems));
}
function handleItemCar(idx) {
    //tạo biến để ngắn gọn code
    let data = array[idx];

    //Chuyển từ dạng 1000 => 1.000
    let giaCu = Number(data.giaCu).toLocaleString("en-US");
    let giaVe = Number(data.giaVe).toLocaleString("en-US");

    // Show thông tin xe ra
    content.innerHTML = `
        <div style="margin-top:${(header.clientHeight / 2)}px;" class="alertBox">
            Đã đặt xe thành công !
            <span
                class="closebtn"
                onclick="this.parentElement.style.transform='translateX(100%)';"
                >&times;</span
            >
        </div>
        <div class="content__current-position">
            <a
                href="../../index.html"
                class="content__current-position__home-page"
                >Trang chủ</a
            >
            <span style="margin: 0 5px">/</span>
            <a
                href="../pages/carsPage.html"
                class="content__current-position__current-page"
                >Danh mục xe</a
            >
            <span style="margin: 0 5px">/</span>
            <a
                class="content__current-position__current-page"
                >${data.tenXe}</a
            >
        </div>
        <div class="itemCar">
            <div class="itemCar__leftcolumn">
                <div class="itemCar__leftcolumn--card">
                    <div class="card-content">
                        <img
                            class="itemCar__leftcolumn--card--picture"
                            src="${data.imgsCar[0]}"
                        />
                    </div>
                </div>
            </div>
            <div class="itemCar__rightcolumn">
                <div class="itemCar__rightcolumn--card">
                    <h2>
                        ${data.tenXe}
                    </h2>
                    <p class="itemCar__rightcolumn--card--newprice">
                        Giá: ${Number(data.price).toLocaleString("en-US")} vnd
                    </p>
                    <p class="itemCar__rightcolumn--card--oldprice">
                        Giá cũ: ${giaCu} vnd
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="speedometer-outline"></ion-icon>
                        Công suất: ${data.power}
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="battery-charging-outline"></ion-icon>
                        Quãng đường mỗi lần sạc: ${data.range}
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="time-outline"></ion-icon>
                        Thời gian sạc: ${data.charging_time}
                    </p>    
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                        Bảo hành: ${data.warranty}
                    </p>
                    <p
                        class="itemCar__rightcolumn--card--car--item__title"
                        style="font-size: 14px"
                    >
                        ${data.gioiThieu}
                    </p>
                    <button data-item=${idx} class="itemCar__rightcolumn--card--btn order-btn">
                        Đặt Xe
                    </button>
                    <button data-item=${idx} class="itemCar__rightcolumn--card--btn order-btn">
                        <a href="https://forms.gle/3XAqbs3RbfDLQKh49">Đánh giá</a>
                    </button>
                </div>
            </div>
        </div>
        `;

    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    let datVe = document.querySelector(".order-btn");
    datVe.addEventListener("click", function (e) {
        let orderCar = array[Number(e.target.dataset.item)];
        let amount = cartItems.amount;
        cartItems.items.push(orderCar);
        cartItems = {
            amount: ++amount,
            items: cartItems.items,
        };
        localStorage.setItem("cart-items", JSON.stringify(cartItems));
        showAlert();
        //Set số lượng hàng trong cart cho thằng status
        cartAmount.forEach((e) => {
            e.innerHTML = cartItems.amount || 0;
        });
    });
}

handleXedien();
