@echo off
echo ================================
echo こーじの思い付きリスト - セットアップ
echo (Supabase版)
echo ================================
echo.

echo [1/2] Webアプリの依存関係をインストール中...
cd web
if not exist node_modules (
    call npm install
) else (
    echo Webアプリの依存関係は既にインストール済みです
)
cd ..
echo.

echo [2/2] Mobileアプリの依存関係をインストール中...
cd mobile
if not exist node_modules (
    call npm install
) else (
    echo Mobileアプリの依存関係は既にインストール済みです
)
cd ..
echo.

echo ================================
echo セットアップ完了！
echo ================================
echo.
echo データベース: Supabase (クラウド)
echo バックエンド: なし (Supabase直接接続)
echo.
echo 起動方法:
echo - Webアプリ: start-web.bat を実行
echo - Mobileアプリ: start-mobile.bat を実行
echo.
echo 注意: .envファイルにSupabaseの認証情報が設定されている必要があります
echo.
pause
