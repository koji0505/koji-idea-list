# 修正完了事項

## 問題と解決策

### 1. バックエンドの `express` モジュールが見つからない ✅

**エラー**:
```
Error: Cannot find module 'express'
```

**原因**: バックエンドの依存関係がインストールされていなかった

**解決**:
```bash
cd backend
npm install
```

既に実行済みです。

---

### 2. バッチファイルの文字化け ✅

**エラー**:
```
'繝舌・繧定ｵｷ蜍輔＠縺ｦ縺・∪縺・..' は、内部コマンドまたは外部コマンド...
```

**原因**: バッチファイルに日本語が含まれており、Windowsのコマンドプロンプトで文字化けが発生

**解決**: すべてのバッチファイルを英語表記に変更
- `start-backend.bat`
- `start-web.bat`
- `start-mobile.bat`

---

### 3. Babelの loose mode エラー ✅

**エラー**:
```
'loose' mode configuration must be the same for @babel/plugin-transform-class-properties,
@babel/plugin-transform-private-methods and @babel/plugin-transform-private-property-in-object
```

**原因**: React 19とReact Native 0.81では、Babelプラグインのloose modeを統一する必要がある

**解決**: `mobile/babel.config.js` を更新
```javascript
plugins: [
  ['@babel/plugin-transform-class-properties', { loose: true }],
  ['@babel/plugin-transform-private-methods', { loose: true }],
  ['@babel/plugin-transform-private-property-in-object', { loose: true }]
]
```

また、`package.json` に必要なプラグインを追加。

---

### 4. アセットファイルが見つからない ✅

**エラー**:
```
Unable to resolve asset "./assets/icon.png" from "icon" in your app.json
```

**原因**: `app.json` で指定されているアイコンファイルが存在しない

**解決**: `mobile/app.json` を簡素化し、アセットファイルへの参照を削除

---

## 正しいセットアップ手順

### ステップ1: バックエンドサーバーを起動

ターミナル1で:
```bash
start-backend.bat
```

または

```bash
cd backend
npm start
```

**確認**: http://localhost:3001 にアクセスしてJSONレスポンスが返ることを確認

---

### ステップ2: Webアプリを起動

ターミナル2で:
```bash
start-web.bat
```

または

```bash
cd web
npm start
```

**確認**: ブラウザで http://localhost:3000 が開き、アイデアリストが表示される

---

### ステップ3: モバイルアプリを起動（オプション）

ターミナル3で:

**重要**: 必ず `node_modules` を削除して再インストールしてください

```bash
cd mobile
rmdir /s /q node_modules
del package-lock.json
npm install
npm start
```

**または** PowerShellの場合:
```powershell
cd mobile
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm start
```

**確認**:
- QRコードが表示される
- スマホのExpo Goアプリ（最新版）でスキャン
- アプリが起動してアイデアリストが表示される

---

## トラブルシューティング

### Webアプリで保存できない

1. バックエンドサーバーが起動しているか確認
   - http://localhost:3001 にアクセス
   - JSONレスポンスが返ってくればOK

2. ブラウザのコンソール（F12）でエラーを確認

### モバイルアプリのBabelエラー

**以下のコマンドを実行**:
```bash
cd mobile
rmdir /s /q node_modules
del package-lock.json
npm install
```

キャッシュもクリア:
```bash
npm start -- --clear
```

### ポート番号の整理

- **3001**: バックエンドAPIサーバー（必須）
- **3000**: Webアプリ（必須）
- **8081**: Expo Metro Bundler（モバイルアプリ使用時のみ）

### 実機でモバイルアプリをテストする場合

1. PCのIPアドレスを確認:
   ```cmd
   ipconfig
   ```

2. `mobile/src/config/api.js` を編集:
   ```javascript
   export const API_URL = 'http://192.168.0.1:3001/api';
   ```
   （192.168.0.1 を実際のIPアドレスに変更）

3. PCとスマホが同じWi-Fiに接続されていることを確認

4. Windowsファイアウォールでポート3001を許可

---

## まとめ

すべての問題が修正されました：

✅ バックエンドの依存関係インストール済み
✅ バッチファイルの文字化け解消
✅ Babel設定修正（loose mode統一）
✅ アセットファイル問題解決

**次のステップ**:
1. `start-backend.bat` を実行
2. `start-web.bat` を実行
3. http://localhost:3000 でWebアプリを使用

モバイルアプリを使う場合は、必ず `node_modules` を削除して再インストールしてください！
