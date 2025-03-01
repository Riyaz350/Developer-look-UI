import React, { useState } from 'react';
import useAxiosPublic from '~/hooks/useAxiosPublic';
import { DatePicker } from 'rsuite';
import Swal from 'sweetalert2';
import 'rsuite/dist/rsuite.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

interface CreateToDoProps {
    email: string;
}

const CreateToDo: React.FC<CreateToDoProps> = ({ email }) => {
    const axiosPublic = useAxiosPublic();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [priority, setPriority] = useState('Medium');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            title,
            description,
            dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
            status: 'Pending',
            priority,
            email,
        };

        try {
            const response = await axiosPublic.post('/todo', data);
            console.log('Todo Created:', response.data);
            setTitle('');
            setDescription('');
            setDueDate(null);
            setPriority('Medium');
            
            Swal.fire({
                title: 'Success!',
                text: 'To-Do item created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error creating To-Do:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue creating the To-Do item',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create To-Do</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date:</label>
                    <DatePicker
                        onChange={(value) => setDueDate(value ? new Date(value) : null)}
                        value={dueDate}
                        className="w-full p-2 border rounded" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority:</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Create To-Do
                </button>
            </form>
        </div>
    );
};

export default CreateToDo;
