import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "~/hooks/useAxiosPublic";
import CreateToDo from "./CreateToDo";
import ShowAllToDo from "./ShowAllToDo";

interface ToDo {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
}

const ToDoLanding: React.FC = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [userEmail, setUserEmail] = useState<string>("");
    const [todos, setTodos] = useState<ToDo[]>([]);

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");

        if (userToken) {
            axiosPublic
                .post("/user/decodeToken", { token: userToken })
                .then((res) => {
                    setUserEmail(res.data.email);
                })
                .catch((err) => {
                    console.error("Error decoding token:", err);
                });
        } else {
            navigate("/signin");
        }
    }, [axiosPublic, navigate]);

    useEffect(() => {
        if (userEmail) {
            axiosPublic
                .get(`/todo/${userEmail}`)
                .then((res) => {
                    setTodos(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching todos:", err);
                });
        }
    }, [userEmail, axiosPublic]);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        window.location.reload();
        Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className='w-full min-h-screen bg-white text-black flex flex-col md:flex-row'>
            {userEmail ? (
                <>
                    <div className='w-full md:w-1/3 p-4'>
                        <CreateToDo email={userEmail} />
                    </div>
                    <div className='w-full md:w-2/3 p-4'>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Your To-Dos</h2>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg font-semibold hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                        <ShowAllToDo todos={todos} />
                    </div>
                </>
            ) : (
                <div className='w-full flex justify-center items-center'>Loading...</div>
            )}
        </div>
    );
};

export default ToDoLanding;
