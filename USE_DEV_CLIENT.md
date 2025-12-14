# Expo Development Clientで実行する方法

## なぜこの方法が必要か

- お使いのExpo GoはSDK 54
- プロジェクト（kaimono_v01と同じ構成）はSDK 52
- iOSでは古いExpo Goをインストールできない

## 解決策：Development Client

Development Clientを使えば、SDKバージョンに関係なく動作します。

---

## セットアップ手順

### ステップ1: expo-dev-clientをインストール

```bash
cd "C:\c_works\random idea list\mobile"
npm install expo-dev-client
```

### ステップ2: 開発ビルドを作成

#### Android（推奨）

USB経由またはWi-Fi経由でAndroid端末を接続してから：

```bash
npx expo run:android
```

初回は時間がかかります（5-10分程度）。

#### iOS（Macが必要）

```bash
npx expo run:ios
```

---

## 実行方法

一度ビルドすれば、次からは簡単です：

```bash
npm start --dev-client
```

スマホにインストールされた開発アプリを開くだけです。

---

## メリット

✅ SDKバージョンを気にしなくて良い
✅ Expo Goより高速
✅ ネイティブモジュールが使える
✅ 本番環境に近い

---

## 簡単な代替案：まずWebアプリ

モバイルアプリのセットアップが複雑なら、先にWebアプリで開発：

```cmd
start-backend.bat
start-web.bat
```

すべての機能が使えます！
