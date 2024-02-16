const express = require('express');
const router = express.Router();

const { getTodo, deleteTodo, addTodo, searchName, searchDescription, getTodoByCategory, addCategory, getAllCategories } = require('./fonction/fonction');

router.post('/AddTodo', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const todo = await addTodo(title, content, category);
    res.status(201).send('Tâche créée');
  } catch (e) {
    res.status(500).send('Erreur lors de la création de la tâche');
  }
});

router.get('/GetTodo', async (req, res) => {
  try {
    const todo = await getTodo();
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).send('Erreur lors de la récupération des tâches');
  }
});

router.get('/searchName', async (req, res) => {
  const { title } = req.query;
  try {
    const todo = await searchName(title);
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).send('Erreur lors de la récupération des tâches');
  }
});
router.get('/searchDescription', async (req, res) => {
  const { content } = req.query;
  try {
    const todo = await searchDescription(content);
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).send('Erreur lors de la récupération des tâches');
  }
});

router.post('/AddCategory', async (req, res) => {
  const { name } = req.body;
  try {
    const cat = await addCategory(name);
    res.status(201).send('Catégorie créée');
  } catch (error) {
    res.status(500).send(error.message || 'Erreur lors de la création de la catégorie');
  }
});

router.get('/GetAllCategories', async (req, res) => {
  try {
    const todo = await getAllCategories();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des catégories');
  }
});

router.get('/getCategory', async (req, res) => {
  const { category } = req.query;
  try {
    const todo = await getTodoByCategory(category);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des tâches');
  }
});

router.delete(`/DeleteTodo`, async (req, res) => {
  const { id } = req.query;
  try {
    const todo = await deleteTodo(id);
    res.status(200).send('Tâche supprimée');
  } catch (e) {
    res.status(500).send('Erreur lors de la suppression de la tâche');
  }
});

module.exports = router;
