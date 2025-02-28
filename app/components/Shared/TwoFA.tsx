import React, { useEffect, useState } from 'react';
import useAxiosPublic from '~/hooks/useAxiosPublic';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

interface TowFAProps {
    email: string;
}

const TwoFA: React.FC<TowFAProps> = ({ email }) => {
    const [keyData, setKeyData] = useState<string>('');
    const [clicked, setClicked] = useState<boolean>(false); 
    const [qr, setQR] = useState('');
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.post('/twofa', { email })
            .then((res) => setQR(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyData(e.target.value);

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let twoFAData = {email:email, twoFA:keyData}
        setClicked(true)
        axiosPublic.post('/twofa/verifyTwoFA', twoFAData)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }

    return (
        <div>

            <motion.form
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white text-black p-8 rounded-2xl shadow-xl  "
                onSubmit={handleSubmit}
            >
                <img src={qr} className='w-1/2 mx-auto' alt="QR Code" />
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Register</h2>

                <div className="mb-4">
                    <label className="block text-gray-700">2FA Code</label>
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="text"
                        value={keyData}
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
                    {clicked ? <span className="loading loading-ring loading-md">Wait</span> : <p>Verify</p>}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default TwoFA;



