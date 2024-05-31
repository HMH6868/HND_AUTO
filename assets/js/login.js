let formDangNhap = document.querySelector(".form");

formDangNhap.onsubmit = async function (e) {
    e.preventDefault();
    let email = formDangNhap.querySelector("input[name='email']").value.trim();
    let matKhau = formDangNhap.querySelector("input[name='password']").value.trim();
    
    // Lấy danh sách tài khoản từ API
    const urlAPI = "https://66599465de346625136d0a61.mockapi.io/api/v1/otodien/account";
    let danhSachTaiKhoan = [];
    try {
        let phanHoi = await fetch(urlAPI);
        if (!phanHoi.ok) {
            throw new Error('Không thể kết nối mạng');
        }
        danhSachTaiKhoan = await phanHoi.json();
    } catch (loi) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', loi);
        alert('Đã xảy ra lỗi khi lấy dữ liệu tài khoản. Vui lòng thử lại sau.');
        return;
    }
    
    // Kiểm tra đăng nhập
    let timThay = false;
    for (let i = 0; i < danhSachTaiKhoan.length; i++) {
        if (danhSachTaiKhoan[i].email === email && danhSachTaiKhoan[i].password === matKhau) {
            timThay = true;
            break;
        }
    }
    
    if (timThay) {
        alert("Đăng nhập thành công!");
        // Chuyển hướng về trang chủ
        window.location.href = "../../index.html";
    } else {
        // Kiểm tra xem email có tồn tại trong danh sách không
        let taiKhoanTonTai = danhSachTaiKhoan.find(function(taiKhoan) {
            return taiKhoan.email === email;
        });
        if (taiKhoanTonTai) {
            alert("Mật khẩu không chính xác. Vui lòng nhập lại mật khẩu.");
            let inputMatKhau = formDangNhap.querySelector("input[name='password']");
            inputMatKhau.value = ""; // Xóa mật khẩu đã điền
            inputMatKhau.focus(); // Trỏ vào ô mật khẩu
        } else {
            alert("Email chưa được đăng ký.");
        }
    }
    
    
    
};