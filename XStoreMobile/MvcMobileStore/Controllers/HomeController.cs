using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcMobileStore.Models;//
using PagedList;//Phân trang
using System.IO;//Upload File

namespace MvcMobileStore.Controllers
{
    public class HomeController : Controller
    {
        //Kết nối CSDL
        DataClassesDataContext db = new DataClassesDataContext();

        #region Trang chủ (Index - Hàng hot - Hàng mới - Hàng cao cấp - Hàng trung cấp)
        #region Index
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region Hàng Hot
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pHangHot(int? page)
        {
            int PageSize = 12;//Chỉ lấy ra 12 dòng (12 Sản Phẩm)
            int PageNum = (page ?? 1);

            //Lấy ra sản phẩm bán chạy nhất
            var SP_NoiBat = (from sp in db.SanPhams
                             where sp.AnHien == true && sp.NhaSanXuat.AnHien == true
                             orderby sp.SLDaBan descending
                             select sp).ToPagedList(PageNum, PageSize);
            return PartialView(SP_NoiBat);
        }
        #endregion

        #region Hàng mới
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pHangMoi(int? page)
        {
            int PageSize = 12;//Chỉ lấy ra 12 dòng (12 Sản Phẩm)
            int PageNum = (page ?? 1);

            //Lấy ra sản phẩm mới nhất
            var SP_Moi = (from sp in db.SanPhams
                          where sp.AnHien == true && sp.NhaSanXuat.AnHien == true
                          orderby sp.MaSP descending
                          select sp).ToPagedList(PageNum, PageSize);
            return PartialView(SP_Moi);
        }
        #endregion

        #region Hàng cao cấp
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pHangCaoCap(int? page)
        {
            int PageSize = 12;//Chỉ lấy ra 12 dòng (12 Sản Phẩm)
            int PageNum = (page ?? 1);

            //Lấy ra sản phẩm giá cao nhất
            var SP_CaoCap = (from sp in db.SanPhams
                             where sp.AnHien == true && sp.NhaSanXuat.AnHien == true
                             orderby sp.GiaHienTai descending
                             select sp).ToPagedList(PageNum, PageSize);
            return PartialView(SP_CaoCap);
        }
        #endregion

        #region Hàng trung cấp
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pHangTrungCap(int? page)
        {
            int PageSize = 12;//Chỉ lấy ra 12 dòng (12 Sản Phẩm)
            int PageNum = (page ?? 1);

            //Lấy ra sản phẩm giá thấp nhất
            var SP_TrungCap = (from sp in db.SanPhams
                               where sp.AnHien == true && sp.NhaSanXuat.AnHien == true
                               orderby sp.GiaHienTai
                               select sp).ToPagedList(PageNum, PageSize);
            return PartialView(SP_TrungCap);
        }
        #endregion
        #endregion

        #region Chi tiết sản phẩm (Details)
        public ActionResult Details(int id)
        {
            //Lấy ra thông tin sản phẩm từ mã sản phẩm truyền vào
            var CT_SanPham = (db.SanPhams.First(sp => sp.MaSP == id));

            //Bộ đếm lượt xem cho Sản Phẩm
            CT_SanPham.LuotXem += 1;
            UpdateModel(CT_SanPham);
            db.SubmitChanges();

            return View(CT_SanPham);
        }
        #endregion

        #region Sản phẩm theo nhà sản xuất (Producer)
        public ActionResult Producer(int id)
        {
            //Lấy ra danh sách sản phẩm từ mã nhà sản xuất truyền vào
            var SP_NSX = (from sp in db.SanPhams
                          where sp.AnHien == true && sp.MaNSX == id && sp.NhaSanXuat.AnHien == true //Lưu ý, ở đây truyền vào để Where MaNSX==id chứ không thể dùng .First như trang Details được                                                                     
                          orderby sp.GiaHienTai descending                                          //(Nếu dùng .First thì không sử dụng được vòng lặp để lấy Danh Sách SP)
                          select sp).ToList();

            //Lấy ra các sản phẩm khác (Không có sản phẩm của nhà sản xuất đang xem)
            ViewBag.SP_Khac = (from sp in db.SanPhams
                               where sp.AnHien == true && sp.MaNSX != id && sp.NhaSanXuat.AnHien == true
                               orderby sp.GiaHienTai descending
                               select sp).ToList();

            //Lấy dữ liệu bảng nhà sản xuất để gán TenNSX vào breadcrumbs và Title
            ViewBag.TenNSX = (from nsx in db.NhaSanXuats
                              where nsx.MaNSX == id
                              select nsx);

            return View(SP_NSX);
        }
        #endregion

        #region Sản phẩm khuyến mãi (Promotions)
        public ActionResult Promotions(int? page)
        {
            int PageSize = 12;//Chỉ lấy ra 12 dòng (12 Sản Phẩm)
            int PageNum = (page ?? 1);

            //Lấy ra sản phẩm khuyến mãi
            var SP_KhuyenMai = (from sp in db.SanPhams
                                where sp.AnHien == true
                                orderby sp.KhuyenMai descending
                                select sp).ToPagedList(PageNum, PageSize);
            return View(SP_KhuyenMai);
        }
        #endregion



   


   


  

    

          }
}
