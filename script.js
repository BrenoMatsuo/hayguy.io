class SinhVien {
    constructor(maSV, hoTen, ngaySinh, lop, gpa) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lop = lop;
        this.gpa = gpa;
    }

    capNhatThongTin(hoTen, ngaySinh, lop, gpa) {
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lop = lop;
        this.gpa = gpa;
    }
}

let danhSachSinhVien = [];
let indexDangSua = -1;

function themHoacCapNhat() {
    const maSV = document.getElementById("maSV").value.trim();
    const hoTen = document.getElementById("hoTen").value.trim();
    const ngaySinh = document.getElementById("ngaySinh").value.trim();
    const lop = document.getElementById("lop").value.trim();
    const gpa = document.getElementById("gpa").value.trim();

    if (!maSV || !hoTen || !ngaySinh || !lop || !gpa) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    if (!laNgayHopLe(ngaySinh)) {
        alert("Ngày sinh không hợp lệ (dd/mm/yyyy)");
        return;
    }

    if (indexDangSua === -1) {
        danhSachSinhVien.push(
            new SinhVien(maSV, hoTen, ngaySinh, lop, gpa)
        );
    } else {
        danhSachSinhVien[indexDangSua].capNhatThongTin(
            hoTen, ngaySinh, lop, gpa
        );
        indexDangSua = -1;
        document.getElementById("maSV").disabled = false;
    }

    lamRongForm();
    hienThiDanhSach();
}

function hienThiDanhSach() {
    const tbody = document.getElementById("studentTable");
    tbody.innerHTML = "";

    danhSachSinhVien.forEach((sv, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.hoTen}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.lop}</td>
                <td>${sv.gpa}</td>
                <td>
                    <button onclick="suaSinhVien(${index})">Sửa</button>
                    <button onclick="xoaSinhVien(${index})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

function suaSinhVien(index) {
    const sv = danhSachSinhVien[index];

    document.getElementById("maSV").value = sv.maSV;
    document.getElementById("hoTen").value = sv.hoTen;
    document.getElementById("ngaySinh").value = sv.ngaySinh;
    document.getElementById("lop").value = sv.lop;
    document.getElementById("gpa").value = sv.gpa;

    document.getElementById("maSV").disabled = true;
    indexDangSua = index;
}

function xoaSinhVien(index) {
    if (confirm("Bạn có chắc muốn xóa sinh viên này?")) {
        danhSachSinhVien.splice(index, 1);
        hienThiDanhSach();
    }
}

function lamRongForm() {
    document.getElementById("maSV").value = "";
    document.getElementById("hoTen").value = "";
    document.getElementById("ngaySinh").value = "";
    document.getElementById("lop").value = "";
    document.getElementById("gpa").value = "";
}

function laNgayHopLe(ngaySinh) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(ngaySinh);
}
