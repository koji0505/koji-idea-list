# モバイルアプリの修正（require エラー対応）

## 問題

```
[runtime not ready]: ReferenceError: Property 'require' doesn't exist
```

## 原因

React 19.1.0とExpo SDK 54の組み合わせに互換性の問題がありました。

## 解決策

より安定したバージョンに変更しました：

### 変更内容

- **Expo SDK**: 54 → **52**
- **React**: 19.1.0 → **18.3.1**
- **React Native**: 0.81.5 → **0.76.3**
- **React Navigation**: v7 → **v6**（安定版）
- **Babel設定**: シンプルな構成に戻しました

## セットアップ手順

### ステップ1: 完全クリーンアップ

```cmd
cd mobile
rmdir /s /q node_modules
del package-lock.json
```

または PowerShell:
```powershell
cd mobile
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

### ステップ2: 依存関係の再インストール

```cmd
npm install
```

### ステップ3: キャッシュをクリアして起動

```cmd
npm start -- --clear
```

### ステップ4: Expo Goで接続

1. **スマホのExpo Goアプリを開く**
   - App Store/Google Playで最新版に更新してください
   - SDK 52に対応している必要があります

2. **QRコードをスキャン**
   - PCのターミナルに表示されるQRコードをスキャン

3. **アプリが起動**
   - 「こーじの思い付きリスト」が表示されます

## 確認事項

### バックエンドAPIが起動していること

モバイルアプリはバックエンド（ポート3001）に接続します。

```cmd
start-backend.bat
```

### API URLの設定

実機でテストする場合、`mobile/src/config/api.js` を確認：

```javascript
export const API_URL = 'http://192.168.0.1:3001/api';
```

- `192.168.0.1` を自分のPCのIPアドレスに変更
- PCとスマホが同じWi-Fiに接続されていること

IPアドレスの確認:
```cmd
ipconfig
```

## トラブルシューティング

### "Project is incompatible with this version of Expo Go"

**解決**: Expo Goアプリを最新版に更新してください

### "Unable to connect to the server"

**原因**: バックエンドが起動していない、またはIPアドレスが間違っている

**解決**:
1. `start-backend.bat` でバックエンドを起動
2. `mobile/src/config/api.js` のIPアドレスを確認
3. PCとスマホが同じWi-Fiに接続されているか確認
4. Windowsファイアウォールでポート3001を許可

### 起動時に古いエラーが出る

**解決**: 完全にクリーンアップして再インストール

```cmd
cd mobile
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm start -- --clear
```

## 完全な起動コマンド（まとめ）

### PowerShellの場合

```powershell
# 完全クリーンアップ
cd "C:\c_works\random idea list\mobile"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# 再インストール
npm install

# キャッシュクリアして起動
npm start -- --clear
```

### コマンドプロンプトの場合

```cmd
cd "C:\c_works\random idea list\mobile"
rmdir /s /q node_modules
del package-lock.json
npm install
npm start -- --clear
```

## 成功時の動作

1. ターミナルにQRコードが表示される
2. Expo Goでスキャンするとアプリが読み込まれる
3. 「こーじの思い付きリスト」画面が表示される
4. サンプルデータ（5件）が表示される
5. アイデアの追加・編集・削除ができる

---

**注意**: Expo SDK 52は安定版です。SDK 54よりも互換性が高く、ほとんどのライブラリで問題なく動作します。
