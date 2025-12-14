import React from 'react';
import './FilterBar.css';

const FilterBar = ({ categories, selectedCategory, selectedLevel, onCategoryChange, onLevelChange }) => {
  const levels = ['すべて', '高', '中', '低'];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category-select">カテゴリー:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="level-select">レベル:</label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
