# セットアップガイド

## 修正完了事項

### 1. ポート番号の明確化 ✅
- **バックエンドAPIサーバー**: `http://localhost:3001`
- **Webアプリ**: `http://localhost:3000`
- スマホアプリはバックエンド（3001）に接続します

### 2. データベースの作成 ✅
- `database/ideas.db` が作成されました
- サンプルデータが挿入されています

### 3. モバイルアプリのパッケージ更新 ✅
- Expo SDK 54対応の正しいバージョンに更新
- Babelプラグインを追加（class private methods対応）

## 起動手順

### ステップ1: バックエンドサーバーの起動

```cmd
start-backend.bat
```

または

```bash
cd backend
npm install
npm start
```

**確認**: http://localhost:3001 にアクセスして、JSONが返ってくればOK

### ステップ2: Webアプリの起動

**別のターミナルで**:

```cmd
start-web.bat
```

または

```bash
cd web
npm install
npm start
```

**確認**: ブラウザが自動で開き、http://localhost:3000 でアプリが表示される

### ステップ3: モバイルアプリの起動（オプション）

**さらに別のターミナルで**:

```cmd
start-mobile.bat
```

または

```bash
cd mobile
# 古いnode_modulesを削除して再インストール
rmdir /s /q node_modules
npm install
npm start
```

**重要**:
- モバイルアプリの依存関係を再インストールしてください（`node_modules`を削除してから`npm install`）
- Expo Goアプリは最新版（SDK 54対応）を使用してください
- 実機でテストする場合は `mobile/src/config/api.js` のIPアドレスを変更:

```javascript
// PCのIPアドレスに変更（ipconfig で確認）
export const API_URL = 'http://192.168.1.XXX:3001/api';
```

## トラブルシューティング

### Webアプリで保存できない

**原因**: バックエンドサーバーが起動していない

**解決**: `start-backend.bat` を実行して、http://localhost:3001 にアクセスできることを確認

### モバイルアプリのエラー

#### "Project is incompatible with this version of Expo Go"

**解決**:
```bash
cd mobile
rmdir /s /q node_modules
npm install
```

#### "Class private methods are not enabled"

**解決**: 既に修正済みです。`node_modules`を削除して再インストールしてください

```bash
cd mobile
rmdir /s /q node_modules
npm install
```

### バックエンドが起動できない

**原因**: 依存関係がインストールされていない

**解決**:
```bash
cd backend
npm install
```

## 正常に動作しているかの確認

### 1. バックエンド
- ブラウザで http://localhost:3001 を開く
- `{"message":"こーじの思い付きリスト API"}` と表示される

### 2. Webアプリ
- ブラウザで http://localhost:3000 を開く
- サンプルデータ（5件）が表示される
- 「＋ 新しいアイデアを追加」ボタンでアイデアを追加できる

### 3. モバイルアプリ
- Expo Goアプリでスキャン
- Homeスクリーン（こーじの思い付きリスト）が表示される
- サンプルデータが表示される

## データベースのリセット

データをリセットしたい場合:

```bash
cd database
del ideas.db
node init.js
```

## まとめ

必須:
1. ✅ データベース作成済み
2. ✅ バックエンドサーバー起動 (3001)
3. ✅ Webアプリ起動 (3000)

オプション:
4. モバイルアプリ起動 (`node_modules`を削除して再インストール)

これでWebアプリでアイデアの保存ができるようになります！
