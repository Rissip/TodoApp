import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskContent, setTaskContent] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [todos, setTodos] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [categories, setCategories] = useState(['Dev', 'It', 'Business', 'Management']);

  useEffect(() => {
    handleViewAllTasks();
  }, []);

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:8000/DeleteTodo?id=${taskId}`)
      .then(() => {
        console.log('Tâche supprimée avec succès');
        handleViewAllTasks(); // Actualiser la liste des tâches après la suppression
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la tâche:', error);
      });
  };

  const handleViewAllTasks = () => {
    axios
      .get('http://localhost:8000/GetTodo')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
      });
  };

  const handleAddTask = () => {
    axios
      .post('http://localhost:8000/AddTodo', { title: taskTitle, content: taskContent, category: taskCategory })
      .then(() => {
        setTaskTitle('');
        setTaskContent('');
        setTaskCategory('');
        handleViewAllTasks();
        console.log('Tâche ajoutée avec succès');
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la tâche:", error);
      });
  };

  const handleSearchByTitle = () => {
    axios
      .get(`http://localhost:8000/searchName?title=${searchTitle}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche par titre:', error);
      });
  };

  const handleSearchByDescription = () => {
    axios
      .get(`http://localhost:8000/searchDescription?content=${searchContent}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche par description:', error);
      });
  };

  const handleSearchByCategory = () => {
    axios
      .get(`http://localhost:8000/getCategory?category=${searchCategory}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la recherche par catégorie:', error);
      });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Titre de la tâche" />
        <input type="text" value={taskContent} onChange={(e) => setTaskContent(e.target.value)} placeholder="Description de la tâche" />
        <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddTask}>Ajouter Tâche</button>
      </div>
      <div>
        <input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} placeholder="Rechercher par titre" />
        <button onClick={handleSearchByTitle}>Rechercher par titre</button>
      </div>
      <div>
        <input type="text" value={searchContent} onChange={(e) => setSearchContent(e.target.value)} placeholder="Rechercher par description" />
        <button onClick={handleSearchByDescription}>Rechercher par description</button>
      </div>
      <div>
        <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleSearchByCategory}>Rechercher par catégorie</button>
      </div>
      <div>
        <h2>Todos</h2>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <strong>Titre : </strong>
              {todo.titre} <br />
              <strong> Description: </strong>: {todo.contenue} <br />
              <button onClick={() => handleDeleteTask(todo.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
