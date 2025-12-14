# トラブルシューティング

## Webアプリで保存できない

### 症状
- 追加ボタンを押しても保存されない
- フォームに入力しても反応がない

### 原因と解決方法

#### 1. バックエンドサーバーが起動していない
**確認方法**:
- http://localhost:3001 にアクセスして、JSONレスポンスが返ってくるか確認

**解決方法**:
```cmd
start-backend.bat
```
または
```bash
cd backend
npm install
npm start
```

#### 2. データベースが初期化されていない
**確認方法**:
- `database/ideas.db` ファイルが存在するか確認

**解決方法**:
```bash
cd database
npm install
node init.js
```

#### 3. ブラウザのコンソールエラーを確認
**確認方法**:
1. ブラウザでF12キーを押して開発者ツールを開く
2. Consoleタブを確認
3. エラーメッセージがあれば内容を確認

**よくあるエラー**:
- `Network Error` → バックエンドが起動していない
- `CORS Error` → CORSの設定問題（通常は発生しない）
- `404 Error` → APIのURLが間違っている

## モバイルアプリのエラー

### 症状: "Project is incompatible with this version of Expo Go"

**原因**:
- Expo GoアプリのSDKバージョンとプロジェクトのSDKバージョンが一致していない

**解決方法**:
1. Expo Goアプリを最新版に更新（SDK 54以降）
2. または、プロジェクトのSDKバージョンをExpo Goに合わせる

プロジェクトを最新版に更新する場合：
```bash
cd mobile
rm -rf node_modules
npm install
```

### 症状: モバイルアプリでAPIに接続できない

**原因**:
- APIのURLがlocalhost（実機から接続不可）

**解決方法**:
1. PCのIPアドレスを確認:
   ```cmd
   ipconfig
   ```
   IPv4アドレスをメモ（例: 192.168.1.100）

2. `mobile/src/config/api.js` を編集:
   ```javascript
   export const API_URL = 'http://192.168.1.100:3001/api';
   ```

3. PCとスマートフォンが同じWi-Fiネットワークに接続されているか確認

4. Windowsファイアウォールでポート3001を許可

## その他の問題

### ポートが既に使用されている

**症状**:
- `Port 3000 is already in use` などのエラー

**解決方法**:
1. 使用中のプロセスを終了
2. または、別のポートを使用:
   ```bash
   # Webアプリの場合
   set PORT=3002 && npm start
   ```

### 依存関係のエラー

**症状**:
- `Cannot find module ...` などのエラー

**解決方法**:
```bash
# 該当ディレクトリで
rm -rf node_modules package-lock.json
npm install
```

### データベースのリセット

データをリセットしたい場合：
```bash
cd database
del ideas.db
node init.js
```

サンプルデータなしで開始したい場合は、`database/init.js` を編集してサンプルデータ挿入部分をコメントアウトしてください。
