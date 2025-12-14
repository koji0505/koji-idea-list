# こーじの思い付きリスト

思いついたアイデアを記録・管理するためのシンプルなアプリケーションです。Webアプリとモバイルアプリ（Expo）の両方が含まれています。

## プロジェクト構成

```
random idea list/
├── backend/          # Node.js + Express APIサーバー
├── database/         # SQLiteデータベース
├── web/             # Reactウェブアプリ
├── mobile/          # React Native (Expo) モバイルアプリ
└── README.md
```

## 機能

- アイデアの登録・編集・削除
- カテゴリーとレベルによるフィルタリング
- レベル別表示（高・中・低）
- 詳細内容の表示
- 自動登録日時記録

## セットアップ手順

### 簡単セットアップ（Windows）

**setup.bat** を実行してください。データベース、バックエンド、Webアプリの依存関係が自動でインストールされます。

```cmd
setup.bat
```

### 起動方法（Windows）

1. **start-backend.bat** を実行（バックエンドサーバー起動）
2. **start-web.bat** を実行（Webアプリ起動）
3. **start-mobile.bat** を実行（モバイルアプリ起動、オプション）

### 手動セットアップ

#### 1. データベースの初期化

```bash
cd database
npm install
node init.js
```

データベースファイル（ideas.db）が作成され、サンプルデータが挿入されます。

#### 2. バックエンドAPIサーバーの起動

```bash
cd backend
npm install
npm start
```

サーバーは `http://localhost:3001` で起動します。

開発時に自動再起動が必要な場合は：
```bash
npm run dev
```

#### 3. Webアプリの起動

別のターミナルで：

```bash
cd web
npm install
npm start
```

Webアプリは `http://localhost:3000` で起動します。

**重要**:
- **バックエンドAPIサーバー**: http://localhost:3001
- **Webアプリ**: http://localhost:3000
- Webアプリで保存できない場合は、バックエンドサーバー（3001）が起動しているか確認してください！

#### 4. モバイルアプリの起動（Expo）

さらに別のターミナルで：

```bash
cd mobile
npm install
npm start
```

ExpoのQRコードが表示されます。スマートフォンのExpo Goアプリでスキャンして実行できます。

**重要**:
- Expo Go アプリは最新版（SDK 54対応）を使用してください
- モバイルアプリで実機テストする場合は、`mobile/src/config/api.js`のAPI_URLをPCのIPアドレスに変更してください：

```javascript
export const API_URL = 'http://192.168.1.XXX:3001/api';
```

## API エンドポイント

- `GET /api/ideas` - アイデア一覧取得（クエリパラメータ: category, level）
- `GET /api/ideas/:id` - アイデア1件取得
- `POST /api/ideas` - アイデア作成
- `PUT /api/ideas/:id` - アイデア更新
- `DELETE /api/ideas/:id` - アイデア削除
- `GET /api/categories` - カテゴリー一覧取得

## データベーススキーマ

### ideas テーブル

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | INTEGER | 主キー（自動採番） |
| category | TEXT | カテゴリー（必須） |
| title | TEXT | タイトル（必須） |
| details | TEXT | 詳細内容（NULL許容） |
| level | TEXT | レベル（'高'、'中'、'低'のいずれか） |
| created_at | DATETIME | 登録日時（自動） |

## 今後の予定

- データベースをSupabaseに移行
- WebアプリをVercelにデプロイ
- 追加機能の実装

## 技術スタック

- **バックエンド**: Node.js, Express, SQLite3
- **Webフロントエンド**: React, Axios
- **モバイル**: React Native, Expo
- **データベース**: SQLite（将来的にSupabase）

## ライセンス

個人プロジェクト
