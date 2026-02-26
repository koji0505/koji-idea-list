import React from 'react';
import './IdeaDetail.css';
import { getLevelColor, formatDateTime } from '../utils/ideaUtils';

const IdeaDetail = ({ idea, onClose, onEdit, onDelete }) => {
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
            <label>進捗:</label>
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
            <span>{formatDateTime(idea.created_at)}</span>
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
