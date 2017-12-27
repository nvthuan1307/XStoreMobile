using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcMobileStore.Models;//

namespace MvcMobileStore.ViewModels
{
    public class ShoppingCartViewModel
    {
        public List<GioHang> SP_TrongGio { get; set; }//Danh sách thông tin sản phẩm trong giỏ như: MaSP,SoLuong,ThanhTien,NgayMua
        public decimal TT_GioHang { get; set; }//Biến tính tổng tiền giỏ hàng
        public int Tong_SL { get; set; }//Thêm biến tổng số lượng để tính tổng số sản phẩm các loại trong giỏ hàng
    }
}