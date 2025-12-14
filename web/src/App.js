import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import IdeaList from './components/IdeaList';
import IdeaDetail from './components/IdeaDetail';
import IdeaForm from './components/IdeaForm';
import FilterBar from './components/FilterBar';
import { supabase } from './lib/supabase';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedLevel, setSelectedLevel] = useState('すべて');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);

  const fetchIdeas = useCallback(async () => {
    try {
      let query = supabase.from('ideas').select('*').order('created_at', { ascending: false });

      if (selectedCategory !== 'すべて') {
        query = query.eq('category', selectedCategory);
      }
      if (selectedLevel !== 'すべて') {
        query = query.eq('level', selectedLevel);
      }

      const { data, error } = await query;

      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      console.error('アイデア取得エラー:', error);
    }
  }, [selectedCategory, selectedLevel]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('ideas').select('category');

      if (error) throw error;
      const categoryList = [...new Set(data?.map(item => item.category) || [])];
      setCategories(['すべて', ...categoryList.sort()]);
    } catch (error) {
      console.error('カテゴリー取得エラー:', error);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
    fetchCategories();
  }, [fetchIdeas, fetchCategories]);

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
  };

  const handleCloseDetail = () => {
    setSelectedIdea(null);
  };

  const handleAddClick = () => {
    setEditingIdea(null);
    setShowForm(true);
  };

  const handleEditClick = (idea) => {
    setEditingIdea(idea);
    setShowForm(true);
    setSelectedIdea(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        const { error } = await supabase.from('ideas').delete().eq('id', id);

        if (error) throw error;

        fetchIdeas();
        fetchCategories();
        setSelectedIdea(null);
      } catch (error) {
        console.error('削除エラー:', error);
        alert('削除に失敗しました');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingIdea) {
        const { error } = await supabase
          .from('ideas')
          .update(formData)
          .eq('id', editingIdea.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('ideas').insert([formData]);

        if (error) throw error;
      }
      setShowForm(false);
      setEditingIdea(null);
      fetchIdeas();
      fetchCategories();
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingIdea(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>こーじの思い付きリスト</h1>
      </header>

      <main className="App-main">
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          onCategoryChange={setSelectedCategory}
          onLevelChange={setSelectedLevel}
        />

        <button className="add-button" onClick={handleAddClick}>
          ＋ 新しいアイデアを追加
        </button>

        <IdeaList
          ideas={ideas}
          onIdeaClick={handleIdeaClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {selectedIdea && (
          <IdeaDetail
            idea={selectedIdea}
            onClose={handleCloseDetail}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {showForm && (
          <IdeaForm
            idea={editingIdea}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
