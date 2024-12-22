import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/todos'; // Update your backend URL

// Get all todos with pagination
export const fetchTodos = async (page: number = 1, limit: number = 5) => {
  const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

// Add a new todo
export const addTodo = async (title: string, completed: boolean = false) => {
  const response = await axios.post(BASE_URL, { title, completed });
  return response.data;
};

// Update a todo (only completed status)
export const updateTodo = async (id: string, completed: boolean) => {
  const response = await axios.put(`${BASE_URL}/${id}`, { completed });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
