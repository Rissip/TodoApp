const db = require('../../db/db');

async function getTodo() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM list', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

async function addTodo(title, content, category) {
  try {
    const categoryId = await getCategory(category);
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO list (titre, contenue, category_id) VALUES (?, ?, ?)', [title, content, categoryId], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
}

async function searchName(title) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM list WHERE titre = ?', [title], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
async function searchDescription(content) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM list WHERE contenue = ?', [content], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

async function getCategory(category) {
  return new Promise((resolve, reject) => {
    db.query('SELECT id FROM category WHERE titre = ?', [category], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result[0].id);
    });
  });
}

async function getTodoByCategory(category) {
  try {
    const id = await getCategory(category);
    return new Promise((resolve, reject) => {
      db.query('SELECT l.titre, l.contenue FROM list l INNER JOIN category c ON l.category_id = c.id WHERE c.id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
}

async function addCategory(category) {
  try {
    const existingCategory = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM category WHERE titre = ?', [category], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });

    if (existingCategory.length > 0) {
      throw new Error('La catégorie existe déjà dans la base de données.');
    }

    return new Promise((resolve, reject) => {
      db.query('INSERT INTO category (titre) VALUES (?)', [category], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
}

async function getAllCategories() {
  try {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM category', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
}

async function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM list WHERE id = ?', [id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = { getTodo, deleteTodo, addTodo, searchName, searchDescription, getTodoByCategory, addCategory, getAllCategories };
