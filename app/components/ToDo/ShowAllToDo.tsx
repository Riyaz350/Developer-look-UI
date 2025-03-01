import React, { useState } from 'react';
import useAxiosPublic from '~/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { DatePicker } from 'rsuite';

interface ToDo {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface ShowAllToDoProps {
  todos: ToDo[];
}

const ShowAllToDo: React.FC<ShowAllToDoProps> = ({ todos }) => {
  const axiosPublic = useAxiosPublic();
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: string]: string }>({});
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');

  const handleStatusChange = (id: string, status: string) => {
    setUpdatedStatus({ ...updatedStatus, [id]: status });
  };

  const handleSave = async (id: string) => {
    if (updatedStatus[id]) {
      try {
        const response = await axiosPublic.put(`/todo/${id}`, { status: updatedStatus[id] });
        Swal.fire('Success!', 'Status updated successfully', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to update status', 'error');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });
      
      if (result.isConfirmed) {
        const response = await axiosPublic.delete(`/todo/removeToDo`, { data: { id } });
        Swal.fire('Deleted!', 'Your to-do has been deleted.', 'success').then(() => {
          window.location.reload();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your to-do is safe', 'info');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete to-do', 'error');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate).setHours(0, 0, 0, 0);
    const filterDateValue = filterDate ? filterDate.setHours(0, 0, 0, 0) : null;
    const isDateMatch = filterDate ? todoDueDate === filterDateValue : true;
    const isStatusMatch = filterStatus !== 'All' ? todo.status === filterStatus : true;
    const isPriorityMatch = filterPriority !== 'All' ? todo.priority === filterPriority : true;
    return isDateMatch && isStatusMatch && isPriorityMatch;
  });

  return (
    <div className="w-full md:w-2/3 p-4">
      <h2 className="text-2xl font-semibold mb-4">Your To-Dos</h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <DatePicker
          onChange={(value) => setFilterDate(value ? new Date(value) : null)}
          value={filterDate}
          placeholder="Filter by Date"
          className="w-full md:w-1/3 p-2 border rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {filteredTodos.length > 0 ? (
        <ul className="space-y-4">
          {filteredTodos.map((todo) => (
            <li key={todo._id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{todo.title}</h3>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600">{todo.description}</p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-sm">Due Date: {new Date(todo.dueDate).toLocaleDateString()}</p>
                  <p className="text-sm">Priority: {todo.priority}</p>
                </div>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 mr-2">Status:</label>
                  <select
                    value={updatedStatus[todo._id] || todo.status}
                    onChange={(e) => handleStatusChange(todo._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleSave(todo._id)}
                    className="ml-2 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No To-Dos found</div>
      )}
    </div>
  );
};

export default ShowAllToDo;
