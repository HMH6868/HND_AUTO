document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector(".form");
    let submitBtn = document.querySelector(".form-submit-btn");

    form.onsubmit = (e) => {
        e.preventDefault();

        let emailInput = form.querySelector("[name='email']");
        let email = emailInput.value.trim();

        if (email === "") {
            alert("Vui lòng nhập email của bạn.");
            return;
        }

        const accountUrl = "https://66599465de346625136d0a61.mockapi.io/api/v1/otodien/account";

        fetch(accountUrl)
            .then(response => response.json())
            .then(accounts => {
                let accountExists = accounts.some(account => account.email === email);

                if (accountExists) {
                    // Email is registered, redirect to verification code page
                    window.location.href = "./veri-code.html";
                } else {
                    // Email is not registered, show alert
                    alert("Gmail này chưa đăng ký tài khoản.");
                    emailInput.focus(); // Focus back to the email input
                }
            })
            .catch(error => {
                console.error("Error fetching accounts:", error);
                alert("Có lỗi xảy ra. Vui lòng thử lại.");
            });
    };
});
