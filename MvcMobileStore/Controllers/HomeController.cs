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

        #region Sản phẩm tìm kiếm (Search)
        public ActionResult Search(string id)
        {
            //Lấy ra danh sách sản phẩm từ chuỗi tìm kiếm truyền vào
            var SP_TK = (from sp in db.SanPhams
                         where (sp.AnHien == true) && (sp.TenSP.Contains(id)) && (sp.NhaSanXuat.AnHien == true) //Lưu ý, ở đây truyền vào để Where TenSP == id chứ không thể dùng .First như trang Details được                                                                     
                         orderby sp.GiaHienTai descending                                          //(Nếu dùng .First thì không sử dụng được vòng lặp để lấy Danh Sách SP)
                         select sp).ToList();

            //Lấy ra các sản phẩm khác (Không có sản phẩm của nhà sản xuất đang xem)
            ViewBag.SP_Khac = (from sp in db.SanPhams
                               where (sp.AnHien == true) && (!sp.TenSP.Contains(id)) && (sp.NhaSanXuat.AnHien == true)
                               orderby sp.GiaHienTai descending
                               select sp).ToList();

            //Lấy từ khóa tìm kiếm để gán thông báo "Có ? sản phẩm mang tên ?"
            ViewBag.TuKhoa = id;

            return View(SP_TK);
        }
        #endregion

        #region Tin công nghệ (News)
        public ActionResult News(int? page)
        {
            int PageSize = 2;//Chỉ lấy ra 2 dòng (2 tin tức)
            int PageNum = (page ?? 1);

            //Lấy ra tin tức mới nhất
            var TinCongNghe = (from tt in db.TinTucs
                               where tt.AnHien == true
                               orderby tt.NgayCapNhat descending
                               select tt).ToPagedList(PageNum, PageSize);
            return View(TinCongNghe);
        }
        #endregion

        #region Chi tiết tin (Reader)
        public ActionResult Reader(int id)
        {
            //Lấy ra tin tức từ mã tin truyền vào
            var CT_Tin = (db.TinTucs.First(tt => tt.MaTin == id));

            //Lấy ra 10 tin khác (10 tin trong đó không có tin đang đọc)
            ViewBag.TinKhac = (from tt in db.TinTucs
                               where tt.AnHien == true && tt.MaTin != id
                               orderby tt.NgayCapNhat descending
                               select tt).Take(10).ToList();

            //Bộ đếm lượt xem cho Tin tức
            CT_Tin.LuotXem += 1;
            UpdateModel(CT_Tin);
            db.SubmitChanges();

            return View(CT_Tin);
        }

        #endregion

        #region Giới thiệu (About)
        public ActionResult About()
        {
            var GioiThieu = (from tt in db.ThongTins select tt);
            return View(GioiThieu);
        }
        #endregion

        #region Liên hệ (Contact và gửi tin - CheckRead)
        #region Contact và gửi tin
        public ActionResult Contact(int? page)
        {
            if (Session["Username"] == null)
                return Content("<script>alert('Bạn cần Đăng Nhập để gửi liên hệ đến quản trị !');window.location='/Home';</script>");

            int PageSize = 4;//Chỉ lấy ra 4 dòng (4 tin nhắn mới nhất)
            int PageNum = (page ?? 1);

            //Load dữ liệu tin nhắn
            var _LienHe = (from lh in db.LienHes
                           where lh.MaKH == int.Parse(Session["MaKH"].ToString()) && lh.Anhien == true
                           orderby lh.MaLH descending
                           select lh).ToPagedList(PageNum, PageSize);

            //Kiểm tra trong hộp thư có tin nhắn thì thực hiện tiếp, không thì ở hàm _LayLH sẽ bị lỗi vì ko tìm đc liên hệ để lấy ra
            var _DemLH = db.LienHes.Where(m => m.MaKH == int.Parse(Session["MaKH"].ToString()));
            if (_DemLH.Count() > 0)
            {
                //Hàm lấy ra 1 Liên hệ mới nhất để xem Khách hàng đã đọc tin nhắn đấy chưa
                var _LayLH = (from lh in db.LienHes
                              where lh.MaKH == int.Parse(Session["MaKH"].ToString()) && lh.Anhien == true
                              orderby lh.MaLH descending
                              select lh).First();

                //Hàm Kiểm tra chưa đọc thì Update lại là khách hàng đã đọc
                if (_LayLH != null)//Kiểm tra trong hộp thư có tin nhắn thì thực hiện tiếp
                {
                    if (_LayLH.LuotGui == true && _LayLH.DaDocKH == false)//Lượt gửi Là Admin và Khách Hàng chưa đọc
                    {
                        //Vào đây thì đã đọc tin nhắn => Cập nhật tin nhắn đã đọc của KH là true
                        _LayLH.DaDocKH = true;

                        //Thực hiện cập nhật
                        UpdateModel(_LayLH);
                        db.SubmitChanges();
                    }
                }
            }
            return View(_LienHe);
        }

        [HttpPost]
        [ValidateInput(false)]//Cho phép nhập kiểu HTML
        public ActionResult Contact(FormCollection collection, LienHe lh)
        {
            try
            {
                //Lấy giá trị ở Form Contact
                int _MaKH = int.Parse(Session["MaKH"].ToString());
                string _Avatar = Session["Avatar"].ToString();
                string _TenNguoiGui = Session["HoTen"].ToString();
                string _NoiDung = collection["txt_NoiDung"];

                //Bắt lỗi không cho Liên hệ trống
                if (_NoiDung == "")
                    return Content("<script>alert('Vui lòng nhập nội dung để gửi liên hệ!');window.location='/Home/Contact';</script>");

                //Gán giá trị để thêm mới
                lh.MaKH = _MaKH;
                lh.Avatar = _Avatar;
                lh.TenNguoiGui = _TenNguoiGui;
                lh.NoiDung = _NoiDung;
                lh.NgayGui = DateTime.Now;//Ngày hiện tại
                lh.LuotGui = false;//Khách hàng gửi
                lh.DaDocKH = true;//Khách hàng đã đọc
                lh.DaDocAD = false;//Admin chưa đọc
                lh.Anhien = true;//Hiện

                //Thực hiện thêm mới
                db.LienHes.InsertOnSubmit(lh);
                db.SubmitChanges();
                return Content("<script>alert('Gửi liên hệ đến quản trị thành công!');window.location='/Home/Contact';</script>");
            }
            catch
            {
                return Content("<script>alert('Lỗi hệ thống!');window.location='/Home/Contact';</script>");
            }
        }
        #endregion

        #region CheckRead
        //Hàm kiểm tra và trả về tin nhắn đã đọc chưa để Show thông báo có tin nhắn mới trên Header
        public void CheckRead()
        {
            //Kiểm tra Đã đăng nhập mới thực hiện tiếp, không thì ở hàm _LayLH sẽ bị lỗi vì ko tìm đc Session["MaKH"]
            if (Session["MaKH"] != null)
            {
                //Kiểm tra trong hộp thư có tin nhắn thì thực hiện tiếp, không thì ở hàm _LayLH sẽ bị lỗi vì ko tìm đc liên hệ để lấy ra
                var _DemLH = db.LienHes.Where(m => m.MaKH == int.Parse(Session["MaKH"].ToString()));
                if (_DemLH.Count() > 0)
                {
                    //Hàm lấy ra 1 Liên hệ mới nhất để xem Khách hàng đã đọc tin nhắn đấy chưa
                    var _LayLH = (from lh in db.LienHes
                                  where lh.MaKH == int.Parse(Session["MaKH"].ToString()) && lh.Anhien == true
                                  orderby lh.MaLH descending
                                  select lh).First();

                    if (_LayLH.LuotGui == true && _LayLH.DaDocKH == false)//Lượt gửi Là Admin và Khách Hàng chưa đọc
                    {
                        //Xuất ra (Trả về) là khách hàng chưa đọc
                        Response.Write("ChuaDoc");
                    }
                    else
                    {
                        //Ngược lại xuất ra (Trả về) là khách hàng đã đọc
                        Response.Write("DaDoc");
                    }
                }
                else // Mặc định đã hiện thông báo, nếu ko có tin nhắn nào trong liên hệ thì trả về DaDoc cho thông báo ẩn đi
                {
                    //Xuất ra (Trả về) là khách hàng chưa đọc
                    Response.Write("DaDoc");
                }
            }
        }
        #endregion
        #endregion

        #region Tài khoản (Login - SuccessLogin - Logout - Account - ChangePassword - Register - SuccessRegister)
        #region Đăng nhập (Login)
        [HttpGet]
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pLogin()
        {
            return PartialView();
        }

        [HttpPost]
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pLogin(FormCollection collection)
        {
            if (collection["rdb_Chon"] == "1")
            {
                try
                {
                    //Lấy giá trị ở Form Login
                    string _Username = collection["txt_Username"];
                    string _Password = collection["txt_password"];

                    //Tạo biến _UserLogin để kiểm tra tài khoản đăng nhập có trong CSDL không
                    var _UserLogin = db.KhachHangs.SingleOrDefault(k => k.Username == _Username && k.Password == _Password);
                    if (ModelState.IsValid && _UserLogin != null)
                    {
                        if (_UserLogin.AnHien == true)//không bị lock tài khoản
                        {
                            //Lưu các thông tin vào Session
                            Session.Add("MaKH", _UserLogin.MaKH);
                            Session.Add("Username", _Username);
                            Session.Add("HoTen", _UserLogin.HoTen);
                            Session.Add("Avatar", _UserLogin.Avatar);

                            //Liên kết với giỏ hàng
                            DiChuyenGioMuaHang(_UserLogin.MaKH.ToString());

                            //Chuyển đến trang thông báo Login thành công (Ở đây không dùng được RedirectToAction vì [ChildActionOnly])
                            return Content("<script>window.location='/Home/SuccessLogin';</script>"); ;
                        }
                        else
                            return Content("<script>alert('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ ban quản trị!');window.location='/Home';</script>");
                    }
                    else
                        return Content("<script>alert('Tên đăng nhập hoặc mật khẩu không đúng!');window.location='/Home';</script>");
                }
                catch
                {
                    return Content("<script>alert('Đăng nhập thất bại!');window.location='/Home';</script>");
                }
            }
            else if (collection["rdb_Chon"] == "0")
            {
                return Content("<script>window.location='/Home/Register';</script>");
            }
            return PartialView();
        }
        #endregion

        #region Đăng nhập thành công (SuccessLogin)
        public ActionResult SuccessLogin()
        {
            //Đăng nhập xong về lại trang hiện hành
            if (Request.UrlReferrer != null)
            {
                this.ViewData["back"] = Request.UrlReferrer.PathAndQuery;
            }

            string url = this.ViewData["back"].ToString();
            Response.AddHeader("refresh", "2;url=" + url);

            return View();
        }
        #endregion

        #region Đăng xuất (Logout)
        public ActionResult Logout()
        {
            Session.RemoveAll();
            Session.Abandon();
            return View();
        }
        #endregion

        #region Thông tin cá nhân (Account)
        public ActionResult Account()
        {
            if (Session["Username"] == null)
                return RedirectToAction("Index");

            int _MaKH = int.Parse(Session["MaKH"].ToString());
            var ttcn = db.KhachHangs.SingleOrDefault(k => k.MaKH == _MaKH);
            return View(ttcn);
        }

        [HttpPost]
        public ActionResult Account(FormCollection collection)
        {
            try
            {
                //Lấy giá trị ở Form Account                
                string _Email = collection["txt_Email"];
                string _HoTen = collection["txt_HoTen"];
                string _DiaChi = collection["txt_DiaChi"];
                string _DienThoai = collection["txt_DienThoai"];
                string _Cmnd = collection["txt_Cmnd"];
                string _NgaySinh = collection["txt_NgaySinh"];
                int _GioiTinh = int.Parse(collection["sl_GioiTinh"]);

                int _MaKH = int.Parse(Session["MaKH"].ToString());
                var ttcn = db.KhachHangs.SingleOrDefault(k => k.MaKH == _MaKH);

                //Gán giá trị để chỉnh sửa
                ttcn.Email = _Email;
                ttcn.HoTen = _HoTen;
                ttcn.DiaChi = _DiaChi;
                ttcn.DienThoai = _DienThoai;
                ttcn.CMND = _Cmnd;
                ttcn.NgaySinh = Convert.ToDateTime(_NgaySinh);

                if (_GioiTinh == 0)//Ở đây không thể Convert sang kiểu Bool nên gán điều kiện
                    ttcn.GioiTinh = false;
                else
                    ttcn.GioiTinh = true;

                //Khai báo _FileUpload ở <input type="file" id="_FileUpload" name="_FileUpload" /> trên Form Account
                HttpPostedFileBase _FileUpload = Request.Files["_FileUpload"];
                if (_FileUpload != null && _FileUpload.ContentLength > 0)//Kiểm tra đã chọn 1 file Upload để thực hiện tiếp
                {
                    //khai báo biến _FileName là tên File
                    string _FileName = Path.GetFileName(_FileUpload.FileName);

                    //Khai báo biến _Path là đường dẫn Upload File
                    string _Path = Path.Combine(Server.MapPath("~/Content/Images/Upload/"), _FileName);

                    //Kiểm tra chỉ cho Upload File có kính thước < 1 MB
                    if (_FileUpload.ContentLength > 1 * 1024 * 1024)
                    {
                        return Content("<script>alert('Kích thước của tập tin không được vượt quá 1 MB!');window.location='/Home/Account';</script>");
                    }

                    //Ngoài hạn chế dung lượng File Upload lên Server thì quan trọng nhất là chỉ cho phép User Upload được dạng File ảnh lên
                    //Vì nếu cho Upload được tất cả các File thì User có thể Upload File Backdoor, Shell lên Server dẫn đến Site bị hacker tấn công

                    //Khai báo mảng chứa các đuôi file hợp lệ cho Upload
                    var _DuoiFile = new[] { "jpg", "jpeg", "png", "gif" };

                    //Khai báo biến _FileExt: trong đó GetExtension là lấy phần mở rộng (đuôi File), Substring(1): lấy từ vị trí thứ nhất => Tức sẽ lấy ra đuôi File
                    var _FileExt = Path.GetExtension(_FileUpload.FileName).Substring(1);

                    //Kiểm tra trong mảng _DuoiFile KHÔNG chứa phần đuôi file của tập tin User upload lên
                    if (!_DuoiFile.Contains(_FileExt))
                    {
                        return Content("<script>alert('Bảo mật Website! Chỉ được Upload tập tin hình ảnh dạng (.jpg, .jpeg, .png, .gif)!');window.location='/Home/Account';</script>");
                    }

                    //Thực thi Upload tập tin lên Server
                    _FileUpload.SaveAs(_Path);

                    //Gán giá trị Avatar là đường dẫn của tập tin vừa Upload để Update trong Database
                    ttcn.Avatar = "/Content/Images/Upload/" + _FileName;
                }

                //Thực hiện chỉnh sửa
                UpdateModel(ttcn);
                db.SubmitChanges();
                return Content("<script>alert('Cập nhật thông tin cá nhân thành công!');window.location='/Home/Account';</script>");
            }
            catch
            {
                return Content("<script>alert('Lỗi hệ thống.Vui lòng thử lại!');window.location='/Home/Account';</script>");
            }
        }
        #endregion

        #region Đổi mật khẩu (ChangePassword)
        public ActionResult ChangePassword()
        {
            if (Session["Username"] == null)
                return RedirectToAction("Index");

            return View();
        }

        [HttpPost]
        public ActionResult ChangePassword(FormCollection collection)
        {
            try
            {
                //Lấy giá trị ở Form ChangePassword
                string _PassOld = collection["txt_Password"];
                string _PassNew = collection["txt_PasswordNew"];
                string _RePassNew = collection["txt_NhapLaiPass"];

                int _MaKH = int.Parse(Session["MaKH"].ToString());
                var kh = db.KhachHangs.SingleOrDefault(k => k.MaKH == _MaKH);

                if (kh.Password == _PassOld)
                {
                    if (_RePassNew == _PassNew)
                    {
                        if (_PassNew.Length >= 6)
                        {
                            //Gán giá trị để chỉnh sửa
                            kh.Password = _PassNew;

                            //Thực thi chỉnh sửa và thông báo
                            UpdateModel(kh);
                            db.SubmitChanges();
                            return Content("<script>alert('Đổi mật khẩu thành công!');window.location='/Home/ChangePassword';</script>");
                        }
                        else
                            return Content("<script>alert('Mật khẩu mới phải có ít nhất 6 ký tự!');window.location='/Home/ChangePassword';</script>");
                    }
                    else
                        return Content("<script>alert('Mật khẩu nhập lại không đúng!');window.location='/Home/ChangePassword';</script>");
                }
                else
                    return Content("<script>alert('Mật Khẩu cũ không đúng!');window.location='/Home/ChangePassword';</script>");
            }
            catch
            {
                return Content("<script>alert('Thao tác đổi mật khẩu thất bại!');window.location='/Home/ChangePassword';</script>");
            }
        }
        #endregion

        #region Đăng ký (Register)
        public ActionResult Register()
        {
            //Đã Đăng Nhập thì không cho vào Form Đăng Ký
            if (Session["Username"] != null)
                return RedirectToAction("Index");
            return View();
        }

        [HttpPost]
        public ActionResult Register(FormCollection collection, KhachHang kh)
        {
            try
            {
                //Lấy giá trị ở Form Register         
                string _Username = collection["txt_Username"];
                string _Password = collection["txt_Password"]; string _RePassword = collection["txt_NhapLaiPass"];
                string _Email = collection["txt_Email"];
                string _HoTen = collection["txt_HoTen"];
                string _DiaChi = collection["txt_DiaChi"];
                string _DienThoai = collection["txt_DienThoai"];
                string _Cmnd = collection["txt_Cmnd"];
                string _NgaySinh = collection["txt_Ngay"] + "/" + collection["dl_Thang"] + "/" + collection["txt_Nam"];
                int _GioiTinh = int.Parse(collection["sl_GioiTinh"]);

                //Gán giá trị để Đăng Ký mới tài khoản

                //Kiểm tra xem tài khoản đã có người sử dụng chưa?
                var _CheckUser = db.KhachHangs.FirstOrDefault(k => k.Username == _Username);
                if (_CheckUser != null)
                    return Content("<script>alert('Tên đăng nhập đã có người sử dụng!');window.location='/Home/Register';</script>");
                else
                    kh.Username = _Username;

                //Kiểm tra Mật khẩu nhập lại có giống Mật khẩu đăng ký không?
                if (_RePassword != _Password)
                    return Content("<script>alert('Mật khẩu nhập lại không đúng!');window.location='/Home/Register';</script>");
                else
                    kh.Password = _Password;

                //Kiểm tra xem Email đã có người sử dụng chưa?
                var _CheckEmail = db.KhachHangs.FirstOrDefault(k => k.Email == _Email);
                if (_CheckEmail != null)
                    return Content("<script>alert('Email đã có người sử dụng!');window.location='/Home/Register';</script>");
                else
                    kh.Email = _Email;

                kh.HoTen = _HoTen;
                kh.DiaChi = _DiaChi;
                kh.DienThoai = _DienThoai;
                kh.CMND = _Cmnd;
                kh.NgaySinh = Convert.ToDateTime(_NgaySinh);

                if (_GioiTinh == 0)//Ở đây không thể Convert sang kiểu Bool nên gán điều kiện
                    kh.GioiTinh = false;
                else
                    kh.GioiTinh = true;

                kh.NgayDangKy = DateTime.Now;

                //Khai báo _FileUpload ở <input type="file" id="_FileUpload" name="_FileUpload" /> trên Form Register
                HttpPostedFileBase _FileUpload = Request.Files["_FileUpload"];
                if (_FileUpload != null && _FileUpload.ContentLength > 0)//Kiểm tra đã chọn 1 file Upload để thực hiện tiếp
                {
                    //khai báo biến _FileName là tên File
                    string _FileName = Path.GetFileName(_FileUpload.FileName);

                    //Khai báo biến _Path là đường dẫn Upload File
                    string _Path = Path.Combine(Server.MapPath("~/Content/Images/Upload/"), _FileName);

                    //Kiểm tra chỉ cho Upload File có kính thước < 1 MB
                    if (_FileUpload.ContentLength > 1 * 1024 * 1024)
                    {
                        return Content("<script>alert('Kích thước của tập tin không được vượt quá 1 MB!');window.location='/Home/Register';</script>");
                    }

                    //Ngoài hạn chế dung lượng File Upload lên Server thì quan trọng nhất là chỉ cho phép User Upload được dạng File ảnh lên
                    //Vì nếu cho Upload được tất cả các File thì User có thể Upload File Backdoor, Shell lên Server dẫn đến Site bị hacker tấn công

                    //Khai báo mảng chứa các đuôi file hợp lệ cho Upload
                    var _DuoiFile = new[] { "jpg", "jpeg", "png", "gif" };

                    //Khai báo biến _FileExt: trong đó GetExtension là lấy phần mở rộng (đuôi File), Substring(1): lấy từ vị trí thứ nhất => Tức sẽ lấy ra đuôi File
                    var _FileExt = Path.GetExtension(_FileUpload.FileName).Substring(1);

                    //Kiểm tra trong mảng _DuoiFile KHÔNG chứa phần đuôi file của tập tin User upload lên
                    if (!_DuoiFile.Contains(_FileExt))
                    {
                        return Content("<script>alert('Bảo mật Website! Chỉ được Upload tập tin hình ảnh dạng (.jpg, .jpeg, .png, .gif)!');window.location='/Home/Register';</script>");
                    }

                    //Thực thi Upload tập tin lên Server
                    _FileUpload.SaveAs(_Path);

                    //Gán giá trị Avatar là đường dẫn của tập tin vừa Upload để Update trong Database
                    kh.Avatar = "/Content/Images/Upload/" + _FileName;
                }
                else
                {
                    //Ở đây, mặc định trong CSDL khi Thêm mới thì Avatar khách hàng đã mặc định sẵn là "/Content/Images/Upload/avatar.jpg"
                    //Nhưng thêm trên Form xuống CSDL nếu KHÔNG chọn Avatar thì nó gán là Null => không có Avatar và Session["Avatar"] cũng = Null
                    //Session["Avatar"] = Null => sẽ bị lỗi ở _PHeader (K có ảnh Avatar để Show lên)
                    //Nên nếu khách hàng không chọn Avatar ta sẽ Lưu Url Avatar mặc định cho khách hàng.
                    kh.Avatar = "/Content/Images/Upload/avatar.jpg";
                }

                kh.AnHien = true;//Mặc định cho tài khoản là Hiện

                //Thực hiện thêm mới
                db.KhachHangs.InsertOnSubmit(kh);
                db.SubmitChanges();

                //Lưu thông tin khách hàng vừa đăng ký vào Session để tự động đăng nhập
                Session.Add("MaKH", kh.MaKH);
                Session.Add("Username", _Username);
                Session.Add("HoTen", _HoTen);
                Session.Add("Avatar", kh.Avatar);

                //Liên kết với giỏ hàng
                DiChuyenGioMuaHang(kh.MaKH.ToString());

                //Chuyển đến trang thông báo Đăng ký thành công
                return RedirectToAction("SuccessRegister");
            }
            catch
            {
                return Content("<script>alert('Đăng ký thất bại.Vui lòng kiểm tra Ngày/Tháng/Năm sinh đã hợp lệ chưa?!');window.location='/Home/Register';</script>");
            }
        }
        #endregion

        #region Đăng ký thành công (SuccessRegister)
        public ActionResult SuccessRegister()
        {
            //Ở đây khi đăng ký thành công thì sẽ lưu thông tin tài khoản vào Session => chưa có thì về trang chủ
            if (Session["Username"] == null)
                return RedirectToAction("Index");

            return View();
        }
        #endregion
        #endregion

        #region Layout (Menu Top - Slider - Quảng cáo - Menu Footer)
        #region Menu Top
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pMenuTop()
        {
            /*Vì sử dụng Menu Metro nên các Class của các thẻ <ul>, <li> hoàn toàn khác nhau
             nên không thể load lên theo List sử dụng vòng lặp được (nếu Load theo vòng lặp foreach thì sẽ bị lặp lại các thẻ <ul> => tạo ra 11 cái menu)
             => Sử dụng cách load lên fix cứng đúng 11 item (Khi làm Admin chỉ cho sửa, không được xóa hoặc thêm để Menu không bị vỡ)*/
            ViewBag.mn1 = (from mn in db.Menus where mn.Thutu == 1 select mn);
            ViewBag.mn2 = (from mn in db.Menus where mn.Thutu == 2 select mn);
            ViewBag.mn3 = (from mn in db.Menus where mn.Thutu == 3 select mn);
            ViewBag.mn4 = (from mn in db.Menus where mn.Thutu == 4 select mn);
            ViewBag.mn5 = (from mn in db.Menus where mn.Thutu == 5 select mn);
            ViewBag.mn6 = (from mn in db.Menus where mn.Thutu == 6 select mn);
            ViewBag.mn7 = (from mn in db.Menus where mn.Thutu == 7 select mn);
            ViewBag.mn8 = (from mn in db.Menus where mn.Thutu == 8 select mn);
            ViewBag.mn9 = (from mn in db.Menus where mn.Thutu == 9 select mn);
            ViewBag.mn10 = (from mn in db.Menus where mn.Thutu == 10 select mn);
            ViewBag.mn11 = (from mn in db.Menus where mn.Thutu == 11 select mn);

            return PartialView();
        }
        #endregion

        #region Slider
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pSlider()
        {
            //Lấy ra Danh sách bảng Slider
            var Slider = (from s in db.Sliders
                          where s.AnHien == true
                          orderby s.Thutu
                          select s).ToList();
            return PartialView(Slider);
        }
        #endregion

        #region Quảng cáo
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pQuangCao()
        {
            //Lấy ra hình quảng cáo với ràng buộc chưa hết hạn quảng cáo
            var QuangCao = (from qc in db.QuangCaos
                            where (qc.AnHien == true) && (qc.Ngayhethan >= DateTime.Now) && (qc.vitri == "1")
                            select qc).ToList();
            return PartialView(QuangCao);
        }
        #endregion

        #region Menu Footer
        [ChildActionOnly]//Gọi từ View sang Controll
        public ActionResult _pMenuFooter()
        {
            //Lấy ra danh sách Menu
            var MenuFooter = (from mn in db.Menus
                              orderby mn.Thutu
                              select mn).ToList();
            return PartialView(MenuFooter);
        }
        #endregion
        #endregion

        #region Liên kết giỏ hàng
        public void DiChuyenGioMuaHang(string MaKH)
        {
            //Liên kết các sản phẩm giỏ hàng với người sử dụng đăng nhập vào
            var GioHang = ShoppingCart.LayGioHang(this.HttpContext);

            GioHang.DiChuyenGH(MaKH);
            Session[ShoppingCart.GioHangSessionKey] = MaKH;
        }
        #endregion
    }
}
