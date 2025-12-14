import React from 'react';
import './IdeaList.css';

const IdeaList = ({ ideas, onIdeaClick, onEditClick, onDeleteClick }) => {
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
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="idea-list">
      {ideas.length === 0 ? (
        <p className="no-ideas">アイデアがありません</p>
      ) : (
        ideas.map((idea) => (
          <div key={idea.id} className="idea-item">
            <div className="idea-content" onClick={() => onIdeaClick(idea)}>
              <div className="idea-header">
                <span className="idea-category">{idea.category}</span>
                <span
                  className="idea-level"
                  style={{ backgroundColor: getLevelColor(idea.level) }}
                >
                  {idea.level}
                </span>
              </div>
              <h3 className="idea-title">{idea.title}</h3>
              {idea.details && (
                <p className="idea-preview">
                  {idea.details.length > 50
                    ? `${idea.details.substring(0, 50)}...`
                    : idea.details}
                </p>
              )}
              <p className="idea-date">{formatDate(idea.created_at)}</p>
            </div>
            <div className="idea-actions">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(idea);
                }}
              >
                編集
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(idea.id);
                }}
              >
                削除
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default IdeaList;
