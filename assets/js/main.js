//Định nghĩa các biến của chương trình
let header = document.getElementById("header");
let content = document.getElementById("content");
let sublist = document.querySelector(".navbar-item__sublist");
let cartAmount = document.querySelectorAll(".cart-box .status");
const contentMain = document.querySelector(".content-main .row");

//Danh sách đã đặt lấy từ local storage
let cartItems = JSON.parse(localStorage.getItem("cart-items")) || {
    amount: 0,
    items: [],
};

//Kiểm tra giá trị nhập vào có phải email hay không
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//Margin cho thằng header
function marginHeader() {
    /* 
        Kiểm tra nếu màn hình lớn hơn hoặc bằng 1024px thì sẽ margin cho thằng header 
        nếu nhỏ hơn thì cho thằng header mobile
    */
    if (window.innerWidth >= 1024) {
        //Margin top cho phần content
        if (sublist.clientHeight > window.innerHeight - header.clientHeight) {
            sublist.style.overflow = "scroll";
        }
        sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
        content.style.marginTop = `${header.clientHeight}px`;
    } else {
        //Margin top cho phần content
        let headerMobile = document.getElementById("header-mobile");
        if (
            sublist.clientHeight >
            window.innerHeight - headerMobile.clientHeight
        ) {
            sublist.style.overflow = "scroll";
        }
        sublist.style.maxHeight = `calc((100vh) - ${headerMobile.clientHeight}px)`;
        content.style.marginTop = `${headerMobile.clientHeight}px`;
    }
}

function updateStatusCart() {
    //Set số lượng hàng trong cart cho thằng status
    cartAmount.forEach((e) => {
        e.innerHTML = cartItems.amount || 0;
    });
}

async function load() {
    let searchInput = document.querySelector(".search-input");
    //Định nghĩa biết chứa thông tin link database từ server
    const dataUrl =
        "https://66570a3f9f970b3b36c7b59a.mockapi.io/v1/xeotodien/otodien";
    //Lấy dữ liệu từ server
    const response = await fetch(dataUrl);
    //Chuyển từ json sang object
    const jsonData = await response.json();

    updateStatusCart();

    //Margin thằng body bằng với thằng header
    marginHeader();

    //Khi lăn chuột lớn hơn so với header thì sẽ cho thằng header dính lên màn hình
    window.onscroll = function () {
        if (window.scrollY > header.clientHeight) {
            header.style.position = "fixed";
        } else {
            header.style.position = "absolute";
        }
    };

    //Khi vừa load thì sẽ nhảy lên trên đầu
    document.body.scrollTop = 0;

    //render tourDuLich
    async function loadDataMainContent(dataMain) {
        let innerHtmlMainContent = "";
        if (dataMain.length != 0) {
            //Lặp qua từng từng trong database
            dataMain.forEach((element, index) => {
                if (element.giaCu != 0) {
                    //Ghép dữ liệu và html lại với nhau
                    innerHtmlMainContent += `
                    <div class="col l-3 m-4 s-12 center-mobile car-item">
                    <div class="widget">
                        <div style="background: url(${element.imgsCar[0]})
                        no-repeat center/cover;" class="widget__photo"></div>
                        <div data-idx=${index} onclick="handleItemCar(${index})" class="widget__button">Đặt xe</div>
                        <div class="widget__details">
                            <div class="widget__name">
                                ${element.tenXe}
                            </div>
                            <div class="widget__vehicle">${element.manufacturer}</div>
                            <div class="widget__info">
                                <div class="center">
                                    <span>Công suất: </span>
                                    <span class="widget__info-power">
                                        ${element.power}
                                    </span>
                                </div>
                                <div class="center">
                                    <span>Quãng đường: </span>
                                    <span class="widget__info-range">
                                        ${element.range} km
                                    </span>
                                </div>
                                <div class="center">
                                    <span>Thời gian sạc: </span>
                                    <span class="widget__info-charging-time">
                                        ${element.charging_time} giờ
                                    </span>
                                </div>
                                <div class="center">
                                    <span>Bảo hành: </span>
                                    <span class="widget__info-warranty">
                                        ${element.warranty}
                                    </span>
                                </div>
                                <div class="center">
                                    <span>Giá: </span>
                                    <span class="widget__info-price">
                                        ${Number(element.price).toLocaleString("en-US")} vnđ
                                    </span>
                                </div>
                                <div class="center">
                                    <span class="widget__info-price--old">
                                        ${element.giaCu != 0 ? element.giaCu : ""} vnđ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                }
            });
        } else {
            innerHtmlMainContent += `
                <h1 class="not-found-item">Không tìm thấy dữ liệu</h1>
            `
        }
        //Render dữ liệu html khi nãy vừa có được
        contentMain.innerHTML = innerHtmlMainContent;

        // close mobile menu
        document.querySelectorAll(".nav-link").forEach((n) =>
            n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            })
        );
    }

    //Load dữ liệu của thằng tour du lịch
    if (contentMain) {
        loadDataMainContent(jsonData);
    }

    //Responsive header
    const hamburger = document.querySelector("#header-mobile .hamburger");
    const navMenu = document.querySelector("#header-mobile .nav-menu");

    hamburger.addEventListener("click", () => {
        /* Toggle active class */
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        /* Toggle thay đổi giá trị menu có mở hoặc không mở */
        let menuOpen = navMenu.classList.contains("active");
        let newMenuOpenStatus = menuOpen;
        hamburger.setAttribute("aria-expanded", newMenuOpenStatus);
    });

    //Khi kích thước cửa sổ thay đổi thì thay đổi margin của thằng header
    window.onresize = () => {
        marginHeader();
    };


    //Xử lý tìm kiếm
    let searchBtn = document.querySelector(".search-btn");
    let foundArray = []
    let currentArray = []
    jsonData.forEach((item) => {
        currentArray.push(item);
    })

    searchInput.oninput = (e) => {
        foundArray = [];
        currentArray.forEach((item) => {
            if (item.tenXe.search(e.target.value) != -1) {
                foundArray.push(item);
            } else if (searchInput.value == "") {
                foundArray = currentArray;
            }
        })
    }

    searchInput.onkeypress = (e) => {
        if (searchInput.value == "") {
            loadDataMainContent(currentArray);
        } else {
            if (e.keyCode === 13) {
                e.preventDefault();
                loadDataMainContent(foundArray);
            }
        }
    }

    searchBtn.onclick = () => {
        if (searchInput.value == "") {
            loadDataMainContent(currentArray);
        } else {
            loadDataMainContent(foundArray);
        }
    }
}

//Khi cửa sổ được load thì chạy chương trình
window.onload = () => {
    load();
};
