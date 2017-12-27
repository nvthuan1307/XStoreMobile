using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcMobileStore.ViewModels
{
    public class ShoppingCartRemoveViewModel
    {
        //Ở đây 1 số biến thấy không cần thiết dùng mình đã bỏ, chỉ dùng những cái cần thiết
        public decimal TT_GioHang { get; set; }//Biến tổng tiền để tính lại Tổng giá trị giỏ hàng sau khi xóa 1 sản phẩm nào đó
        public int Tong_SL { get; set; }// Biến tổng số lượng để tính lại tổng số sản phẩm còn lại sau khi giảm hoặc tăng số lượng SP
        public int Tong_SP { get; set; }//Biến số lượng của 1 sản phẩm để tính lại số lượng còn sau khi giảm.
        public decimal ThanhTien { get; set; }//Biến tính thành tiền của 1 sản phẩm để cập nhật lại sau khi giảm hoặc thêm số lượng SP
        public int XoaId { get; set; }//Biến XoaId để truyền vào Id muôn giảm số lượng 1 sản phẩm      
    }
}