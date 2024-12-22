const express = require('express');
const Todo = require('../models/Todo'); // Assuming you have a Todo model defined
const router = express.Router();

// GET all todos with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values: page = 1, limit = 10
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    const todos = await Todo.find()
      .skip((pageNumber - 1) * limitNumber) // Skip items for pagination
      .limit(limitNumber); // Limit the number of items

    const totalTodos = await Todo.countDocuments(); // Total number of todos
    res.json({
      todos,
      totalTodos,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalTodos / limitNumber),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  const newTodo = new Todo({ title, completed });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err.message });
  }
});

// PUT (update) a todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully', deletedTodo });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
});

router.put('/:id/toggleComplete', async (req, res) => {
  const { id } = req.params;
  console.log('Toggling completion for todo ID:', id); // Debugging line

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Toggle the completed status
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    console.log('Updated Todo:', updatedTodo); // Debugging line

    res.json(updatedTodo);
  } catch (err) {
    console.error('Error:', err.message); // Debugging line
    res.status(500).json({ message: 'Error toggling completion status', error: err.message });
  }
});


module.exports = router;
