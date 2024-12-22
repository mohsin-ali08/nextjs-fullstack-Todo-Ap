import { Request, Response } from "express";
import Todo from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title, userId: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: "Error adding todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting todo" });
  }
};
