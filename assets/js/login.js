let loginForm = document.querySelector(".form");
loginForm.onsubmit = (e) => {
    e.preventDefault();

    let email = loginForm.querySelector("[name='email']").value.trim();
    let password = loginForm.querySelector("[name='password']").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    const accountUrl = "https://66599465de346625136d0a61.mockapi.io/api/v1/otodien/account";

    fetch(accountUrl)
        .then((res) => res.json())
        .then((accounts) => {
            let account = accounts.find(acc => acc.email === email);

            if (account) {
                if (account.password === password) {
                    alert("Đăng nhập thành công!");
                    // Chuyển hướng về trang chủ
                    window.location.href = "../../index.html";

                } else {
                    alert("Sai mật khẩu.");
                    let inputpassword = loginForm.querySelector("input[name='password']");
                    inputpassword.value = ""; // Xóa mật khẩu đã điền
                    inputpassword.focus(); // Trỏ vào ô mật khẩu

                }
            } else {
                alert("Email này chưa được đăng ký.");
            }
        })
        .catch((error) => {
            console.error("Error fetching accounts:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        });
};

