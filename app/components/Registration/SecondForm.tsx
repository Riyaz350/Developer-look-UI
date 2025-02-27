import React from 'react';
import { motion } from "framer-motion";

type SecondFormProps = {
    sixDgt: string;
    stage: number;
    setSixDgt: React.Dispatch<React.SetStateAction<string>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
};

const SecondForm: React.FC<SecondFormProps> = ({ sixDgt, setSixDgt, stage, setStage }) => {
    function handleCode(e: React.FormEvent) {
        e.preventDefault();
        setStage(stage + 1);
    }

    return (
        <div>
            <motion.form
                onSubmit={handleCode}
                className="bg-white p-8 rounded-2xl shadow-xl md:w-96"
            >
                <label className="block text-gray-700 mb-2">
                    A 6 digit code has been sent to your email
                </label>
                <motion.input
                    whileFocus={{ scale: 1.05 }}
                    type="number"
                    name="code"
                    value={sixDgt}
                    onChange={(e) => setSixDgt(e.target.value)}
                    required
                    className="text-black w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Submit
                </motion.button>
            </motion.form>
        </div>
    );
};

export default SecondForm;
