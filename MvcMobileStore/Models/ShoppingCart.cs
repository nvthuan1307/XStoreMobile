using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;//

namespace MvcMobileStore.Models
{
    public partial class ShoppingCart
    {
        DataClassesDataContext db = new DataClassesDataContext();

        string GioMuaHangId { get; set; }

        public const string GioHangSessionKey = "MaGH";

        #region GIỎ HÀNG
        #region Lấy giỏ hàng
        public static ShoppingCart LayGioHang(HttpContextBase context)
        {
            var _GioHang = new ShoppingCart();
            _GioHang.GioMuaHangId = _GioHang.LayMaGH(context);
            return _GioHang;
        }

        public static ShoppingCart LayGioHang(Controller controller)
        {
            return LayGioHang(controller.HttpContext);
        }
        #endregion

        //Hàm thêm sản phẩm vào giỏ hàng
        #region Thêm giỏ hàng
        public void ThemVaoGioHang(SanPham sp)
        {
            //lấy ra sản phẩm trong giỏ hàng
            var SP_TrongGio = db.GioHangs.SingleOrDefault(
                gh => gh.MaGH == GioMuaHangId
                    && gh.MaSP == sp.MaSP);

            if (SP_TrongGio == null)
            {
                //Tạo mới 1 giỏ hàng nếu sản phẩm đó chưa tồn tại trong bảng GioHang(CSDL)
                SP_TrongGio = new GioHang
                {
                    MaSP = sp.MaSP,//Gán MaSP = MaSP của sản phẩm muốn mua
                    MaGH = GioMuaHangId,//Gán MaGH = MaGH đang mua
                    SoLuong = 1,//Gán số lượng =1
                    NgayMua = DateTime.Now, //Ngày mua là ngày hiện tại
                    //Ở đây thêm 1 cột thành tiền đã tính khuyến mãi trong giỏ hàng để Show lên cột thành tiền
                    Thanhtien = 1 * sp.GiaHienTai * Convert.ToDecimal(1 - sp.KhuyenMai * 0.01)
                };
                //Thực hiện thêm mới giỏ hàng
                db.GioHangs.InsertOnSubmit(SP_TrongGio);//Ở đây là thêm vào CSDL nên InsertOnSubmit chứ không phải Add như Code Firs
            }
            else
            {
                //Ngược lại, sản phẩm đó đã có trong giỏ hàng thì tăng số lượng lên 1
                SP_TrongGio.SoLuong++;
                //Tính lại thành tiền
                SP_TrongGio.Thanhtien = SP_TrongGio.SoLuong * sp.GiaHienTai * Convert.ToDecimal(1 - sp.KhuyenMai * 0.01);
            }
            //Lưu thay đổi
            db.SubmitChanges();//Ở đây cũng SubmitChanges chứ không SaveChanges như Code Firs
        }
        #endregion

        //Ở đây, như hướng dẫn trong dự án MusicStore: thì nếu sản phẩm đó >1 thì SoLuong--, còn nếu sản phẩm đó =1 thì xóa luôn sản phẩm đó trong giỏ hàng.
        //Nhưng như vậy không đc hay lắm, nhỡ sản phẩm đó đang có số lượng là 100, mà xóa như vậy thì mỏi tay mệt nghỉ luôn
        //Nên ở đây chúng ta cải tiến lại là Click xóa là xóa sạch thằng sản phẩm đó luôn, còn về thêm bớt số lượng để thằng "Cập Nhật Số Lượng" Lo.
        #region Xóa giỏ hàng
        public void XoaGioHang(int id)//Lưu ý đây không giảm số lượng để trả về số lượng mà xóa hết sản phẩm đó nên ta dùng hàm void thay int
        {
            //lấy ra sản phẩm muốn xóa trong giỏ hàng
            var SP_TrongGio = db.GioHangs.SingleOrDefault(
                gh => gh.MaGH == GioMuaHangId
                    && gh.Id == id);

            //Kiểm tra sản phẩm muốn xóa đang có trong giỏ mới thực hiện tiếp
            if (SP_TrongGio != null)
            {
                //Thực hiện xóa sản phẩm đó khỏi giỏ hàng
                db.GioHangs.DeleteOnSubmit(SP_TrongGio);//Ở đây cũng DeleteOnSubmit chứ không Remove như Code Firs

                //Lưu thay đổi
                db.SubmitChanges();//Ở đây cũng SubmitChanges chứ không SaveChanges như Code Firs
            }
        }
        #endregion

        //Hàm thực thi xóa sạch giỏ hàng (Ở hàm XoaGioHang phía trên là chỉ xóa 1 sản phẩm trong giỏ hàng)
        #region Xóa hết giỏ hàng
        public void XoaHetGioHang()
        {
            //Lấy ra giỏ hàng muốn xóa sạch
            var _GioHang = db.GioHangs.Where(gh => gh.MaGH == GioMuaHangId);

            //Vì trong giỏ hàng có thể có nhiều sản phẩm
            //Nên ta duyệt vòng lặp để xóa hết tất cả sản phẩm trong giỏ
            foreach (var Sp_TrongGio in _GioHang)
            {
                db.GioHangs.DeleteOnSubmit(Sp_TrongGio);//Xóa từng sản phẩm trong giỏ=> vòng lặp sẽ duyệt theo thứ tự và lần lượt xóa sạch
            }
            //Lưu thay đổi
            db.SubmitChanges();
        }
        #endregion

        ////Hàm thực thi giảm số lượng 1 sản phẩm (hàm viết thêm)
        #region Giảm số lượng
        public int GiamSoLuong(int id)
        {
            //lấy ra sản phẩm muốn giảm số lượng trong giỏ hàng
            var SP_TrongGio = db.GioHangs.SingleOrDefault(
                gh => gh.MaGH == GioMuaHangId
                    && gh.Id == id);

            int itemCount = 0;//Tạo biến đếm sản phẩm

            //Kiểm tra sản phẩm đang có trong giỏ mới thực hiện tiếp
            if (SP_TrongGio != null)
            {
                if (SP_TrongGio.SoLuong > 1)//Số lượng sản phẩm trong giỏ hàng > 1
                {
                    SP_TrongGio.SoLuong--;//Giảm số lượng sản phẩm xuống 1
                    //Vì làm thêm cột thành tiền nên ở đậy cũng phải cập nhật lại Thành tiền
                    SP_TrongGio.Thanhtien = SP_TrongGio.SoLuong * SP_TrongGio.SanPham.GiaHienTai * Convert.ToDecimal(1 - SP_TrongGio.SanPham.KhuyenMai * 0.01);
                    itemCount = int.Parse(SP_TrongGio.SoLuong.ToString());//Gán lại số lượng vào biến đếm
                }
                else
                {
                    db.GioHangs.DeleteOnSubmit(SP_TrongGio);//Ngược lại số lượng <=1 thì xóa hết
                }
                //Lưu thay đổi
                db.SubmitChanges();
            }
            //trả về số lượng sản phẩm
            return itemCount;
        }
        #endregion

        ////Hàm thực thi Tăng số lượng 1 sản phẩm (hàm viết thêm)
        #region Tăng số lượng
        public int TangSoLuong(int id)
        {
            //lấy ra sản phẩm muốn tăng số lượng trong giỏ hàng
            var SP_TrongGio = db.GioHangs.SingleOrDefault(
                gh => gh.MaGH == GioMuaHangId
                    && gh.Id == id);

            int itemCount = 0;//Tạo biến đếm sản phẩm

            //Kiểm tra sản phẩm đang có trong giỏ mới thực hiện tiếp
            if (SP_TrongGio != null)
            {
                if (SP_TrongGio.SoLuong >= 1)//Số lượng sản phẩm trong giỏ hàng >= 1 (lưu ý >= chứ ko phải >)
                {
                    SP_TrongGio.SoLuong++;//tăng số lượng sản phẩm lên 1
                    //Vì làm thêm cột thành tiền nên ở đậy cũng phải cập nhật lại Thành tiền
                    SP_TrongGio.Thanhtien = SP_TrongGio.SoLuong * SP_TrongGio.SanPham.GiaHienTai * Convert.ToDecimal(1 - SP_TrongGio.SanPham.KhuyenMai * 0.01);
                    itemCount = int.Parse(SP_TrongGio.SoLuong.ToString());//Gán lại số lượng vào biến đếm
                }
                //Lưu thay đổi
                db.SubmitChanges();
            }
            //trả về số lượng sản phẩm
            return itemCount;
        }
        #endregion

        //Hàm lấy ra 1 danh sách các sản phẩm trong giỏ hàng để Show lên trang View cho người dùng xem hoặc xử lý(mua thêm hay xóa gì đó)
        #region Lấy sản phẩm trong giỏ
        public List<GioHang> LaySanPhamTrongGio()
        {
            //Trả về 1 danh sách sản phẩm
            return db.GioHangs.Where(gh => gh.MaGH == GioMuaHangId).ToList();
        }
        #endregion

        //Hàm lấy ra tổng số sản phẩm có trong giỏ hàng của họ (hàm LaySanPhamTrongGio ở trên là lấy ra 1 List sản phẩm, còn hàm này chỉ lấy tổng số lượng)
        #region Lấy số lượng
        public int LaySoLuong()
        {
            //Lấy ra số lượng từng sản phẩm trong giỏ hàng và Sum (tổng) lại
            int? _SoLuong = (from gh in db.GioHangs
                             where gh.MaGH == GioMuaHangId
                             select (int?)gh.SoLuong).Sum();

            //Trả về 0 nếu số lượng tất cả sản phẩm là trống
            return _SoLuong ?? 0;
        }
        #endregion

        //Hàm Tính tổng tiền của tất cả các sản phẩm trong giỏ hàng (đã - % khuyến mãi)
        #region Lấy tổng tiền
        public decimal LayTongTien()//Ở đây có thể tổng tiền của đơn hàng sẽ khá lớn nên dùng kiểu decimal chứ không dùng int hay float
        {
            //Lấy ra tổng tiền = Sum (số lượng * đơn giá * Khuyến mãi)
            //(ở đây đơn giá nằm trong bảng sản phẩm nhưng Linq sẽ tự kết bảng để lấy ra GiaHienTai chứ ta không cần phải Join bảng như trong cú pháp SQL)
            decimal? _TongTien = (from gh in db.GioHangs
                                  where gh.MaGH == GioMuaHangId
                                  //Lưu ý ở đây trong CSDL tất cả những gì liên quan đến tiền thì các bạn để kiểu Decimal hết nhé, vì kiểu khác nó không Convert qua được
                                  //Tổng tiền = Sum(số lượng * đơn giá * Khuyễn mãi).(Ví dụ khuyến mãi giảm 30% thì thành tiền = giá * 0.7)
                                  select (int?)gh.SoLuong * gh.SanPham.GiaHienTai * Convert.ToDecimal(1 - gh.SanPham.KhuyenMai * 0.01)).Sum();

            return _TongTien ?? decimal.Zero;
        }
        #endregion

        //Hàm lấy thành tiền (hàm viết thêm)
        //hàm này dùng để khi tăng hoặc giảm số lượng thì sẽ cập nhật lại cột thành tiền
        //(Cách lấy tương tự dựa vào Lấy số lượng ở bảng Tăng,Giảm giỏ hàng)
        #region Lấy thành tiền
        public decimal LayThanhTien(int id)
        {
            //lấy ra sản phẩm muốn tính thành tiền từ giỏ hàng với id truyền vào
            var SP_TrongGio = db.GioHangs.SingleOrDefault(
                gh => gh.MaGH == GioMuaHangId
                    && gh.Id == id);

            //Tạo biến đếm thành tiền
            decimal? _ThanhTien = 0;

            //Phải có Sản phẩm trong giỏ mới thực hiện tiếp, ví dụ số lượng đang 1, Click Giảm số lượng thì hàm này ko bắt lỗi sẽ ko chạy đc
            if (SP_TrongGio != null)
            {
                //Thực hiện tính thành tiền đã trừ khuyến mãi
                _ThanhTien = SP_TrongGio.SoLuong * SP_TrongGio.SanPham.GiaHienTai * Convert.ToDecimal(1 - SP_TrongGio.SanPham.KhuyenMai * 0.01);
            }
            //trả về số lượng sản phẩm
            return _ThanhTien ?? decimal.Zero;
        }
        #endregion
        #endregion

        #region THANH TOÁN
        //Hàm Chuyển đổi từ giỏ hàng thành đơn đặt hàng khi người dùng thanh toán
        #region Tạo Đơn Hàng
        public int TaoDonHang(DonHang dh)
        {
            decimal _TriGia = 0;// Khởi tạo trị giá của đơn hàng = 0
            var SP_TrongGio = LaySanPhamTrongGio();//Khởi tại SP_TrongGio là danh sách các sản phẩm trong giỏ hàng

            //Dùng vòng lặp duyệt từng sản phẩm trong giỏ hàng để thêm vào bảng Chi tiết đơn hàng
            foreach (var item in SP_TrongGio)
            {
                var _CT_DonHang = new CT_DonHang
                {
                    MaSP = item.MaSP,//Gán mã sản phẩm
                    MaDH = dh.MaDH,//Gán mã đơn hàng
                    SoLuong = item.SoLuong,//gán số lượng
                    Gia = item.SanPham.GiaHienTai,//gán giá hiện tại lấy từ bảng sản phẩm
                    
                    //Ở đây Dũng làm thêm 1 cột thành tiền cho chi tiết từng đơn hàng để Show lên cho người dùng và lúc làm Admin rõ ràng hơn nhé
                    //Vì thành tiền của Dũng có tính toán Khuyến mãi nên làm như thế này, bài các bạn có thể bỏ hoặc tùy chỉnh
                    Thanhtien = (item.SoLuong) * (item.SanPham.GiaHienTai) * Convert.ToDecimal(1 - (item.SanPham.KhuyenMai * 0.01))
                    //Thành tiền = Số lượng * Đơn giá * Khuyễn mãi (Ví dụ khuyến mãi giảm 30% thì thành tiền = giá * 0.7)
                };
                //Thiết lập tổng trị giá của giỏ hàng cho bảng Đơn Hàng
                //Cái này tính như ThanhTien ở trên nhưng phải Convert sang kiểu Decimal lần nữa
                _TriGia += Convert.ToDecimal((item.SoLuong) * (item.SanPham.GiaHienTai) * Convert.ToDecimal(1 - (item.SanPham.KhuyenMai * 0.01)));

                //Thực hiện Add dữ liệu vào bảng Chi tiết đơn hàng
                db.CT_DonHangs.InsertOnSubmit(_CT_DonHang);

                //Bộ đếm lượt mua cho Sản Phẩm, Mua 1 sản phẩm thì tăng số lượng đã bán lên 1
                var _SanPham = (db.SanPhams.First(sp => sp.MaSP == item.MaSP));
                _SanPham.SLDaBan += 1;
            }
            //Gán Tổng trị giá cho Đơn Hàng
            dh.Trigia = _TriGia;
            
            //Lưu chỉnh sửa
            db.SubmitChanges();

            //Sau khi thêm dữ liệu xong ta xóa hết dữ liệu bảng Giỏ Hàng bằng cách gọi hàm XoaHetGiaHang về
            XoaHetGioHang();//Như bên aspx giỏ hàng lưu trong Session thì thanh toán xong sẽ tự Remove, còn đây ta sẽ xóa nó đi vì không cần dùng nữa(tối ưu dung lượng CSDL)

            return dh.MaDH;
        }
        #endregion

        //Sử dụng HttpContextBase để đọc thông tin từ Session của người sử dụng
        #region Lấy mã giỏ hàng
        public string LayMaGH(HttpContextBase context)
        {
            if (context.Session[GioHangSessionKey] == null)
            {
                //Tạo ra một GUID mới sử dụng lớp using System.Guid
                Guid _TempMaGH = Guid.NewGuid();

                //Gửi lại cho khách hàng _TempMaGH như một cookie
                context.Session[GioHangSessionKey] = _TempMaGH.ToString();
            }
            return context.Session[GioHangSessionKey].ToString();
        }
        #endregion

        //Khi người dùng đã đăng nhập, di chuyển giỏ hàng của họ để kết hợp với tên người dùng (Hàm này để khi chuyển qua thanh toán thì Add vào CSDL đơn hàng của User đó)
        #region Di chuyển giỏ hàng
        public void DiChuyenGH(string MaKH)
        {
            var _GioMuaHang = db.GioHangs.Where(gh => gh.MaGH == GioMuaHangId);
            foreach (GioHang item in _GioMuaHang)
            {
                item.MaGH = MaKH;
            }
            db.SubmitChanges();
        }
        #endregion
        #endregion
    }
}