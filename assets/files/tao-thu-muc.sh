#!/bin/sh
# Tao cau truc thu muc hoc tap - Bai tap 1 (macOS/Linux): sh tao-thu-muc.sh
R=HocTap_2026-2027; H=$R/01_HK1/INF2501_CongNgheSo-AI
mkdir -p "$R/00_Inbox" "$H/01_BaiGiang" "$H/03_TaiLieuThamKhao" "$H/04_Portfolio-BaoCao/HinhAnh" "$H/04_Portfolio-BaoCao/NopBai" \
  "$R/01_HK1/MaHP_TenHocPhan" "$R/02_HK2" "$R/03_KyNang-ChungChi" "$R/04_CaNhan-CV" "$R/99_LuuTru"
for b in 01 02 03 04 05 06; do mkdir -p "$H/02_BaiTap/Bai$b"; done
echo "Da tao xong $R"
