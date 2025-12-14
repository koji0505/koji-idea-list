# モバイルアプリ最終セットアップ

## 問題の整理

1. ❌ **SDK 54 + React 19** → `require` エラーが発生
2. ❌ **SDK 52にダウングレード** → Expo Go（SDK 54）と互換性なし
3. ✅ **SDK 54 + React 18.3.1** → 正解！

## 最終的な構成

| パッケージ | バージョン | 理由 |
|-----------|-----------|------|
| Expo SDK | **54.0.0** | Expo Goアプリに合わせる |
| React | **18.3.1** | 安定版（React 19は避ける） |
| React Native | **0.76.9** | Expo SDK 54推奨バージョン |
| React Navigation | **v6** | 安定版 |

**重要**: React 19ではなく、React 18.3.1を使用することで`require`エラーを回避します。

---

## セットアップ手順

### ステップ1: 完全クリーンアップ

**PowerShell**:
```powershell
cd "C:\c_works\random idea list\mobile"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
```

**コマンドプロンプト**:
```cmd
cd "C:\c_works\random idea list\mobile"
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
```

### ステップ2: 依存関係の再インストール

```cmd
npm install
```

インストール時に警告が出ないことを確認してください。

### ステップ3: キャッシュをクリアして起動

```cmd
npm start -- --clear
```

### ステップ4: 確認

コンソールに以下のような警告が**出ないこと**を確認：
```
✅ The following packages should be updated... (警告なし)
```

もし警告が出る場合は、もう一度ステップ1からやり直してください。

### ステップ5: Expo Goで接続

1. スマホのExpo Goアプリを開く
2. QRコードをスキャン
3. アプリが読み込まれる
4. 「こーじの思い付きリスト」が表示される

---

## 完全な実行コマンド（コピー&ペースト用）

### PowerShell版（推奨）

```powershell
# 移動
cd "C:\c_works\random idea list\mobile"

# 完全クリーンアップ
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force

# 再インストール
npm install

# 起動
npm start -- --clear
```

### コマンドプロンプト版

```cmd
cd "C:\c_works\random idea list\mobile"
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm start -- --clear
```

---

## バックエンド接続の確認

### 1. バックエンドが起動していること

```cmd
start-backend.bat
```

ブラウザで http://localhost:3001 を開き、JSONレスポンスが返ることを確認。

### 2. API URLの設定

`mobile/src/config/api.js` を確認：

```javascript
export const API_URL = 'http://192.168.0.1:3001/api';
```

**PCのIPアドレスを確認**:
```cmd
ipconfig
```

IPv4アドレス（例: 192.168.0.1）をメモし、`api.js`に設定。

### 3. ファイアウォール設定

Windowsファイアウォールでポート3001を許可する必要がある場合があります。

---

## トラブルシューティング

### まだ "Project is incompatible" エラーが出る

**原因**: `node_modules`が古いキャッシュを持っている

**解決**:
```cmd
cd mobile
rmdir /s /q node_modules
rmdir /s /q .expo
del package-lock.json
npm cache clean --force
npm install
npm start -- --clear
```

### "Unable to connect to the server"

**原因**: バックエンドが起動していない、またはIPアドレスが間違っている

**解決**:
1. `start-backend.bat` でバックエンドを起動
2. PCとスマホが同じWi-Fiに接続されていることを確認
3. `mobile/src/config/api.js` のIPアドレスを確認
4. Windowsファイアウォールの設定を確認

### パッケージバージョンの警告が出る

**警告例**:
```
The following packages should be updated for best compatibility...
```

**原因**: `node_modules`が完全にクリアされていない

**解決**: ステップ1からやり直す

---

## 成功時の動作

✅ コンソールにQRコードが表示される
✅ バージョン警告が出ない
✅ Expo Goでスキャン後、アプリが読み込まれる
✅ 「こーじの思い付きリスト」画面が表示される
✅ サンプルデータ（5件）が表示される
✅ アイデアの追加・編集・削除ができる

---

## まとめ

- **Expo SDK 54** を使用（Expo Goに合わせる）
- **React 18.3.1** を使用（React 19は避ける）
- **完全クリーンアップ** が重要（`node_modules`, `package-lock.json`, キャッシュ）
- **バックエンドの起動** を忘れずに
- **IPアドレスの設定** を確認

この構成で、`require`エラーもSDK互換性エラーも解決します！
