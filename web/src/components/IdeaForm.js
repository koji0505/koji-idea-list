import React, { useState, useEffect } from 'react';
import './IdeaForm.css';
import { LEVELS, DEFAULT_LEVEL } from '../utils/ideaUtils';

const IdeaForm = ({ idea, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    details: '',
    level: DEFAULT_LEVEL
  });

  useEffect(() => {
    if (idea) {
      setFormData({
        category: idea.category,
        title: idea.title,
        details: idea.details || '',
        level: idea.level
      });
    }
  }, [idea]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.title) {
      alert('カテゴリーとタイトルは必須です');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{idea ? 'アイデアを編集' : '新しいアイデアを追加'}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="category">カテゴリー *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="例: 技術、ビジネス、趣味"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">タイトル *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="アイデアのタイトルを入力"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="level">進捗 *</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                {LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="details">詳細内容</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="詳細な内容を入力（任意）"
                rows="6"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              キャンセル
            </button>
            <button type="submit" className="submit-btn">
              {idea ? '更新' : '追加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaForm;
