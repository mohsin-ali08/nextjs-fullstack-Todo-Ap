import { FC } from 'react';
import { Button, Checkbox, Tooltip } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TodoCard: FC<TodoProps> = ({ title, completed, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="flex bg-white mb-4 justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center">
        <Checkbox
          checked={completed}
          onChange={onToggleComplete}
          className="mr-3"
          aria-label={`Mark ${title} as ${completed ? 'incomplete' : 'complete'}`}
        />
        <span className={completed ? 'line-through text-gray-500' : 'text-gray-900 font-medium'}>
          {title}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <Tooltip title="Edit Todo" placement="top">
          <Button
            type="default"
            icon={<FaEdit />}
            onClick={onEdit}
            className="mr-2 text-blue-500 border-blue-500 hover:bg-blue-100"
            aria-label="Edit Todo"
          />
        </Tooltip>
        <Tooltip title="Delete Todo" placement="top">
          <Button
            icon={<FaTrash />}
            onClick={onDelete}
            danger
            className="text-red-500 border-red-500 hover:bg-red-100"
            aria-label="Delete Todo"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default TodoCard;
