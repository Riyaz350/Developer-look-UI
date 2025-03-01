import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    return (
        <div className='w-full min-h-screen bg-white text-black flex flex-col md:flex-row'>
            {userEmail ? (
                <>
                    <div className='w-full md:w-1/3 p-4'>
                        <CreateToDo email={userEmail} />
                    </div>
                    <div className='w-full md:w-2/3 p-4'>
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
