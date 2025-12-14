const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'ideas.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
  } else {
    console.log('SQLiteデータベースに接続しました');
  }
});

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      details TEXT,
      level TEXT NOT NULL CHECK(level IN ('高', '中', '低')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('テーブル作成エラー:', err.message);
    } else {
      console.log('ideasテーブルを作成しました');
    }
  });

  // サンプルデータの挿入
  const sampleData = [
    ['技術', 'React Hooksの学習', 'useEffectとuseContextを深く理解する', '高'],
    ['ビジネス', '新しいアプリのアイデア', 'タスク管理とメモを統合したアプリ', '中'],
    ['趣味', '週末の料理', null, '低'],
    ['技術', 'TypeScript導入', 'プロジェクト全体をTypeScriptに移行', '高'],
    ['生活', '部屋の模様替え', '机の配置を変更して作業効率アップ', '中']
  ];

  const stmt = db.prepare('INSERT INTO ideas (category, title, details, level) VALUES (?, ?, ?, ?)');

  sampleData.forEach(data => {
    stmt.run(data, (err) => {
      if (err) {
        console.error('サンプルデータ挿入エラー:', err.message);
      }
    });
  });

  stmt.finalize(() => {
    console.log('サンプルデータを挿入しました');
  });
});

module.exports = db;
