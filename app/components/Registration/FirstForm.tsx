import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router';
type FormData = {
  email: string;
  password: string;
};

type SetFormData = React.Dispatch<React.SetStateAction<FormData>>;
type SetStageData = React.Dispatch<React.SetStateAction<number>>;

interface FirstFormProps {
  formData: FormData;
  setFormData: SetFormData;
  setStage: SetStageData
}

const FirstForm: React.FC<FirstFormProps> = ({ formData, setFormData, setStage }) => {
  const axiosPublic = useAxiosPublic()
  const [clicked, setClicked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClicked(true)
    const mailData = {
      "email": formData.email,
      "password": formData.password,
      "subject": "Email Verification",
      "message": "verify your email with the code below",
      "duration": 1
    }

    axiosPublic.post('/user/signup', mailData)
      .then((res) => {
        Swal.fire({
          title: "A six digit code has been send to your Email.",
          icon: "success"
        });
        setStage((prevStage) => prevStage + 1);
      })
      .catch((error) => {
        Swal.fire({
          title: error.response.data.message,
          icon: "error"
        });
      })

  };

  return (
    <div>
      <motion.form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white text-black p-8 rounded-2xl shadow-xl md:w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mb-5 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {clicked ? <span className="loading loading-ring loading-md">Wait</span> : <p>Register</p>}
        </motion.button>
        <div className='flex justify-center w-full'>
          <div>
            Already have an account? 
            <Link to='/signin' className="w-1/2 mx-auto bg-blue-500 text-white p-2 my-2 rounded-lg font-semibold hover:bg-blue-600 transition">Sign In</Link>
          </div>
        </div>
      </motion.form>

    </div>
  );
};

export default FirstForm;
