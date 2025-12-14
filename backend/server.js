const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// データベース接続
const dbPath = path.join(__dirname, '../database/ideas.db');
const db = new sqlite3.Database(dbPath);

// ルート
app.get('/', (req, res) => {
  res.json({ message: 'こーじの思い付きリスト API' });
});

// 全アイデア取得（フィルター対応）
app.get('/api/ideas', (req, res) => {
  const { category, level } = req.query;

  let query = 'SELECT * FROM ideas WHERE 1=1';
  const params = [];

  if (category && category !== 'すべて') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (level && level !== 'すべて') {
    query += ' AND level = ?';
    params.push(level);
  }

  query += ' ORDER BY category, CASE level WHEN "高" THEN 1 WHEN "中" THEN 2 WHEN "低" THEN 3 END, created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// アイデア1件取得
app.get('/api/ideas/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM ideas WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'アイデアが見つかりません' });
      return;
    }
    res.json(row);
  });
});

// アイデア作成
app.post('/api/ideas', (req, res) => {
  const { category, title, details, level } = req.body;

  if (!category || !title || !level) {
    res.status(400).json({ error: 'カテゴリー、タイトル、レベルは必須です' });
    return;
  }

  if (!['高', '中', '低'].includes(level)) {
    res.status(400).json({ error: 'レベルは「高」「中」「低」のいずれかである必要があります' });
    return;
  }

  const query = 'INSERT INTO ideas (category, title, details, level) VALUES (?, ?, ?, ?)';

  db.run(query, [category, title, details || null, level], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: this.lastID,
      category,
      title,
      details,
      level
    });
  });
});

// アイデア更新
app.put('/api/ideas/:id', (req, res) => {
  const { id } = req.params;
  const { category, title, details, level } = req.body;

  if (!category || !title || !level) {
    res.status(400).json({ error: 'カテゴリー、タイトル、レベルは必須です' });
    return;
  }

  if (!['高', '中', '低'].includes(level)) {
    res.status(400).json({ error: 'レベルは「高」「中」「低」のいずれかである必要があります' });
    return;
  }

  const query = 'UPDATE ideas SET category = ?, title = ?, details = ?, level = ? WHERE id = ?';

  db.run(query, [category, title, details || null, level, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'アイデアが見つかりません' });
      return;
    }
    res.json({ id, category, title, details, level });
  });
});

// アイデア削除
app.delete('/api/ideas/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM ideas WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'アイデアが見つかりません' });
      return;
    }
    res.json({ message: '削除しました', id });
  });
});

// カテゴリー一覧取得
app.get('/api/categories', (req, res) => {
  db.all('SELECT DISTINCT category FROM ideas ORDER BY category', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => row.category));
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
  console.log(`http://localhost:${PORT}`);
});
