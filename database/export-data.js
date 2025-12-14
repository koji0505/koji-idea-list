const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'ideas.db');
const db = new sqlite3.Database(dbPath);

db.all('SELECT * FROM ideas ORDER BY id', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  console.log('-- SQLiteデータ（Supabase SQL Editorにコピーして実行）\n');

  if (rows.length === 0) {
    console.log('-- データがありません');
    db.close();
    return;
  }

  rows.forEach(row => {
    const category = row.category.replace(/'/g, "''");
    const title = row.title.replace(/'/g, "''");
    const details = row.details ? row.details.replace(/'/g, "''") : null;
    const level = row.level;

    if (details) {
      console.log(`INSERT INTO ideas (category, title, details, level) VALUES ('${category}', '${title}', '${details}', '${level}');`);
    } else {
      console.log(`INSERT INTO ideas (category, title, level) VALUES ('${category}', '${title}', '${level}');`);
    }
  });

  console.log('\n-- 合計 ' + rows.length + ' 件のデータ');
  db.close();
});
