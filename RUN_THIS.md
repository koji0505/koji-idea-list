# モバイルアプリ起動手順

Babelプラグインを追加したので、再インストールして起動してください。

## コマンド（コピー&ペーストで実行）

### PowerShell

```powershell
cd "C:\c_works\random idea list\mobile"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm start -- --clear
```

### コマンドプロンプト

```cmd
cd "C:\c_works\random idea list\mobile"
rmdir /s /q node_modules
del package-lock.json
npm install
npm start -- --clear
```

## 確認ポイント

1. ✅ インストール時にエラーが出ないこと
2. ✅ 起動時にバージョン警告が出ないこと
3. ✅ QRコードが表示されること
4. ✅ Expo Goでスキャンしてアプリが起動すること

## バックエンドの起動を忘れずに

別のターミナルで:
```cmd
start-backend.bat
```

## 構成

- **Expo SDK**: 54.0.0
- **React**: 18.3.1 (React 19ではない)
- **React Native**: 0.76.9
- **Babel**: private methods プラグイン付き

これで動作するはずです！
