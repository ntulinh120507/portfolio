@echo off
chcp 65001 >nul
REM Tao cau truc thu muc hoc tap - Bai tap 1 (muc 1.4)
REM Cach dung: dat file nay vao noi muon tao (vi du thu muc Google Drive), nhap dup de chay.
set ROOT=HocTap_2026-2027
set HP=%ROOT%\01_HK1\INF2501_CongNgheSo-AI
mkdir "%ROOT%\00_Inbox"
mkdir "%HP%\01_BaiGiang"
for %%B in (01 02 03 04 05 06) do mkdir "%HP%\02_BaiTap\Bai%%B"
mkdir "%HP%\03_TaiLieuThamKhao"
mkdir "%HP%\04_Portfolio-BaoCao\HinhAnh"
mkdir "%HP%\04_Portfolio-BaoCao\NopBai"
mkdir "%ROOT%\01_HK1\MaHP_TenHocPhan"
mkdir "%ROOT%\02_HK2"
mkdir "%ROOT%\03_KyNang-ChungChi"
mkdir "%ROOT%\04_CaNhan-CV"
mkdir "%ROOT%\99_LuuTru"
echo Da tao xong cau truc thu muc %ROOT%
pause
