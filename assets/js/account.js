let submitBtn = document.querySelector(".account__submit-btn");
let form = document.querySelector(".account__form");
form.onsubmit = (e) => {
    e.preventDefault();
};
const accountUrl = "https://66570a3f9f970b3b36c7b59a.mockapi.io/v1/xeotodien/account";

let dataAccount = [];
fetch(accountUrl)
    .then((res) => res.json())
    .then((res) => {
        dataAccount = res;
    });

let dataAccountExit = [];
fetch(accountUrl)
    .then((res) => res.json())
    .then((res) => {
        dataAccountExit = res;
    });
function handleLogin() {
    console.log(dataAccount);
}

function checkEnableAccount(account) {
    let check = true;
    for (let i = 0; i < dataAccount.length; i++) {
        if (dataAccount[i].email == account.email) {
            check = false;
            break;
        }
    }
    return check;
}

function handleRegister() {
    let firstName = document.querySelector(".regis-first-name");
    let lastName = document.querySelector(".regis-last-name");
    let email = document.querySelector(".regis-email");
    let password = document.querySelector(".regis-password");
    let repassword = document.querySelector(".regis-repassword");
    let account = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        repassword: repassword.value.trim(),
    };
    if (
        firstName.value != "" &&
        lastName.value != "" &&
        validateEmail(email.value) &&
        password.value.length >= 6 &&
        password.value != "" &&
        repassword.value != "" &&
        repassword.value == password.value
    ) {
        if (checkEnableAccount(account)) {
            firstName.value = "";
            lastName.value = "";
            email.value = "";
            password.value = "";
            repassword.value = "";
            fetch(accountUrl, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(account),
            });
            confirm("Đăng ký thành công !");
        } else {
            alert("Email này đã có người đăng ký");
            email.value = "";
            email.focus();
        }
    }
}

submitBtn.onclick = function () {
    let type = submitBtn.dataset.type;
    if (type == "login") {
        handleLogin();
    } else if (type == "register") {
        handleRegister();
    }
};
