import Header from '@/Components/Header';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Button, Pagination, Input, Checkbox, Card, Modal, Spin } from 'antd';
import { toast } from 'react-toastify';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const Todolist = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Number of todos per page
  const [totalTodos, setTotalTodos] = useState(0); // Total number of todos from the server
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false); // Modal visibility state
  const [loading, setLoading] = useState(false); // Loading state for fetching, adding, deleting, etc.

  const fetchTodos = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get('http://localhost:5000/api/todos', {
        params: { page: currentPage, limit: pageSize },
      });
      setTodos(response.data.todos);
      setTotalTodos(response.data.totalTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
      toast.error('Failed to load todos!');
    } finally {
      setLoading(false); // Stop loading
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    if (!newTodoTitle) return;

    setLoading(true); // Start loading
    try {
      await axios.post('http://localhost:5000/api/todos', {
        title: newTodoTitle,
        completed: false,
      });
      toast.success('Todo added successfully!');
      fetchTodos();
      setNewTodoTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
      toast.error('Failed to add todo!');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEditTodo = async (id: string) => {
    if (!editingTitle) return;

    setLoading(true); // Start loading
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        title: editingTitle,
        completed: false,
      });
      toast.success('Todo updated successfully!');
      setIsEditingModalVisible(false);
      setEditingTodoId(null);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo!');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDeleteTodo = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this todo?',
      content: 'Once deleted, this action cannot be undone.',
      onOk: async () => {
        setLoading(true); // Start loading
        try {
          await axios.delete(`http://localhost:5000/api/todos/${id}`);
          toast.success('Todo deleted successfully!');
          fetchTodos();
        } catch (error) {
          console.error('Failed to delete todo:', error);
          toast.error('Failed to delete todo!');
        } finally {
          setLoading(false); // Stop loading
        }
      },
    });
  };

  const handleToggleComplete = async (id: string) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}/toggleComplete`);
      const updatedTodo = response.data;
      toast.info(`Todo ${updatedTodo.completed ? 'completed' : 'incomplete'}!`);
      fetchTodos(); // Refresh the todo list after the update
    } catch (error) {
      console.error('Error toggling completion status:', error);
      toast.error('Failed to update status!');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize); // This ensures pageSize is updated when changed
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center py-4 text-gray-900 bg-cover bg-center bg-no-repeat " 
        style={{
          backgroundImage: 'url("/HomeBG.jpg")',
        }}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-col justify-center items-center py-4 w-full">
          <div className="w-80 sm:w-auto">
            <Input
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Enter your todo"
              className="w-full sm:w-80 p-3 rounded-md bg-white bg-opacity-50 backdrop-blur-lg  border-gray-300"
            />
          </div>
          <div className="py-4">
            <Button
              type="primary"
              onClick={handleAddTodo}
              className=" sm:w-auto w-80 bg-blue-600 hover:bg-blue-700 text-white"
              loading={loading} // Add loading spinner to the button
            >
              Add Todo
            </Button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-4">
            <Spin size="small" />
          </div>
        )}

        {/* Todo Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 px-5">
          {todos.map((todo) => (
            <Card
              key={todo._id}
              title={todo.title}
              extra={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo._id)}
                />
              }
              hoverable
              className=" bg-white bg-opacity-50 backdrop-blur-lg  rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex justify-between mt-3">
                {editingTodoId === todo._id ? (
                  <Button
                    type="primary"
                    onClick={() => handleEditTodo(todo._id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    type="default"
                    onClick={() => {
                      setEditingTodoId(todo._id);
                      setEditingTitle(todo.title);
                      setIsEditingModalVisible(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                  >
                    Edit
                  </Button>
                )}

                <Button
                  type="default"
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalTodos}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['5', '10', '15']}
            className="text-sm"
          />
        </div>
      </div>

      {/* Edit Todo Modal */}
      <Modal
        title="Edit Todo"
        visible={isEditingModalVisible}
        onCancel={() => setIsEditingModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditingModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => handleEditTodo(editingTodoId as string)}
          >
            Save
          </Button>,
        ]}
      >
        <Input
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          placeholder="Edit todo title"
        />
      </Modal>
    </>
  );
};


export default Todolist;