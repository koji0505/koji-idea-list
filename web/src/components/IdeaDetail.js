import React from 'react';
import './IdeaDetail.css';

const IdeaDetail = ({ idea, onClose, onEdit, onDelete }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case '高':
        return '#e74c3c';
      case '中':
        return '#f39c12';
      case '低':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>詳細</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <label>カテゴリー:</label>
            <span className="detail-category">{idea.category}</span>
          </div>

          <div className="detail-row">
            <label>レベル:</label>
            <span
              className="detail-level"
              style={{ backgroundColor: getLevelColor(idea.level) }}
            >
              {idea.level}
            </span>
          </div>

          <div className="detail-row">
            <label>タイトル:</label>
            <span>{idea.title}</span>
          </div>

          {idea.details && (
            <div className="detail-row">
              <label>詳細内容:</label>
              <p className="detail-text">{idea.details}</p>
            </div>
          )}

          <div className="detail-row">
            <label>登録日:</label>
            <span>{formatDate(idea.created_at)}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-edit-btn" onClick={() => onEdit(idea)}>
            編集
          </button>
          <button className="modal-delete-btn" onClick={() => onDelete(idea.id)}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
