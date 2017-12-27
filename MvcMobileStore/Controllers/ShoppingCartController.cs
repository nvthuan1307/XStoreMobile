using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcMobileStore.Models;//
using MvcMobileStore.ViewModels;//

namespace MvcMobileStore.Controllers
{
    public class ShoppingCartController : Controller
    {
        DataClassesDataContext db = new DataClassesDataContext();

        #region Giỏ hàng (Index)
        public ActionResult Index()
        {
            //Lấy giỏ hàng
            var _GioHang = ShoppingCart.LayGioHang(this.HttpContext);

            //Thiết lập ViewModel
            var _ViewModel = new ShoppingCartViewModel
            {
                SP_TrongGio = _GioHang.LaySanPhamTrongGio(),
                TT_GioHang = _GioHang.LayTongTien(),
                //Thêm biến tổng số lượng để tính tổng số sản phẩm các loại trong giỏ hàng
                Tong_SL=_GioHang.LaySoLuong()
            };
            return View(_ViewModel);
        }
        #endregion

        #region Thêm vào giỏ (AddToCart)
        public ActionResult AddToCart(int id)
        {
            //Lấy sản phẩm từ CSDL
            var _ThemSP = db.SanPhams.Single(sp => sp.MaSP == id);

            //Thêm sản phẩm vào giỏ hàng
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);
            GioHang.ThemVaoGioHang(_ThemSP);

            //Add xong đến trang giỏ hàng
            return RedirectToAction("Index");
        }
        #endregion

        #region Xóa giỏ hàng (RemoveFromCart)
        [HttpPost]
        public ActionResult RemoveFromCart(int id)
        {
            //Lấy giỏ hàng
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);

            //Xóa khỏi giỏ hàng
            GioHang.XoaGioHang(id);

            //Khởi tạo biến _KetQua từ ShoppingCartRemoveViewModel để cập nhật là Tổng tiền và Tổng số lượng của giỏ hàng sau khi xóa
            var _KetQua = new ShoppingCartRemoveViewModel
            {
                TT_GioHang = GioHang.LayTongTien(),//Gán lại tổng tiền
                Tong_SL = GioHang.LaySoLuong(),//Gán lại tổng số lượng
                XoaId=id//Gán id truyền vào để xóa (không cần gán cũng xóa đc nhưng muốn có hiệu ứng xóa xong nó mất dần cho đẹp thì gán vào)
            };
            new EmptyResult();
            return Json(_KetQua);
        }
        #endregion

        #region Xóa hết giỏ hàng (EmptyCart)
        public ActionResult EmptyCart()
        {
            //Lấy giỏ hàng
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);
            //Gọi hàm xóa hết giỏ hàng về
            GioHang.XoaHetGioHang();

            new EmptyResult();
            return View();
        }
        #endregion

        #region Giảm số lượng (ExceptCount)
        [HttpPost]
        public ActionResult ExceptCount(int id)
        {
            //Lấy giỏ hàng
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);

            //Biến đếm số lượng sản phẩm
            int itemCount = GioHang.GiamSoLuong(id);
            
            //Biến này dùng để cập nhật cột thành tiền
            decimal _ThanhTien = GioHang.LayThanhTien(id);
            
            //Khởi tạo biến _KetQua từ ShoppingCartRemoveViewModel để cập nhật là Tổng tiền và Tổng số lượng của giỏ hàng sau khi giảm số lượng
            var _KetQua = new ShoppingCartRemoveViewModel
            {
                TT_GioHang = GioHang.LayTongTien(),//Gán lại tổng tiền để cập nhật trên Form
                Tong_SL = GioHang.LaySoLuong(),//Gán lại tổng số lượng để cập nhật trên Form
                Tong_SP = itemCount,//Gán lại số lượng của sản phẩm đã giảm để cập nhật trên Form
                ThanhTien=_ThanhTien,//Gán lại thành tiền để cập nhật trên Form
                XoaId=id//Gán id truyền vào để cập nhật cho đúng sản phẩm đó
            };
            return Json(_KetQua);
        }
        #endregion

        #region Tăng số lượng (AscendCount)
        [HttpPost]
        public ActionResult AscendCount(int id)
        {
            //Lấy giỏ hàng
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);

            //Biến đếm số lượng sản phẩm
            int itemCount = GioHang.TangSoLuong(id);

            //Biến này dùng để cập nhật cột thành tiền
            decimal _ThanhTien = GioHang.LayThanhTien(id);

            //Khởi tạo biến _KetQua từ ShoppingCartRemoveViewModel để cập nhật là Tổng tiền và Tổng số lượng của giỏ hàng sau khi tăng số lượng
            //Ở đây ShoppingCartRemoveViewModel là biến lưu trữ để cập nhật lại thông tin khi xóa hay giảm số lượng, còn ở đây tăng cũng như vậy nên xài lại 
            var _KetQua = new ShoppingCartRemoveViewModel
            {
                TT_GioHang = GioHang.LayTongTien(),//Gán lại tổng tiền để cập nhật trên Form
                Tong_SL = GioHang.LaySoLuong(),//Gán lại tổng số lượng để cập nhật trên Form
                Tong_SP = itemCount,//Gán lại số lượng của sản phẩm đã giảm để cập nhật trên Form
                ThanhTien = _ThanhTien,//Gán lại thành tiền để cập nhật trên Form
                XoaId = id//Gán id truyền vào để cập nhật cho đúng sản phẩm đó
            };
            return Json(_KetQua);
        }
        #endregion

        #region Giỏ hàng tóm tắt (CartSummary)
        [ChildActionOnly]
        public ActionResult CartSummary()
        {
            //Lấy giỏ hàng
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);
            ViewData["Tong_SL"] = GioHang.LaySoLuong();
            return PartialView("CartSummary");
        }
        #endregion
    }
}
