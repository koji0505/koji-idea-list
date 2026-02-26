export const LEVELS = ['未', '進行中', '済'];
export const ALL_FILTER = 'すべて';
export const LEVEL_OPTIONS = [ALL_FILTER, ...LEVELS];
export const DEFAULT_LEVEL = '未';
export const PREVIEW_MAX_LENGTH = 50;

export const getLevelColor = (level) => {
  switch (level) {
    case '未':    return '#95a5a6';
    case '進行中': return '#f39c12';
    case '済':    return '#27ae60';
    default:      return '#95a5a6';
  }
};

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

export const formatDateTime = (dateString) =>
  new Date(dateString).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
