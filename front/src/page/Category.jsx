import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/GetAllCategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post('http://localhost:8000/AddCategory', { name: newCategoryName });
      console.log('Catégorie ajoutée:', response.data);
      setNewCategoryName('');
      fetchCategories(); // Actualiser la liste des catégories après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <div>
        <h2>Liste des catégories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category.titre}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Ajouter une catégorie</h2>
        <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Nom de la catégorie" />
        <button onClick={handleAddCategory}>Ajouter</button>
      </div>
    </div>
  );
}

export default Category;
