import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import useAxiosPublic from '~/hooks/useAxiosPublic';
import Swal from 'sweetalert2';

type FormData = {
    email: string;
    password: string;
};
type SecondFormProps = {
    sixDgt: string;
    stage: number;
    setSixDgt: React.Dispatch<React.SetStateAction<string>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    formData: FormData;
};

const SecondForm: React.FC<SecondFormProps> = ({ sixDgt, setSixDgt, stage, setStage, formData }) => {
    const axiosPublic = useAxiosPublic();
    const [expiredOTP, setExpiredOTP] = useState<boolean>(false);
    const [timer, setTimer] = useState<number | null>(null);

    const OTPData = {
        email: formData.email,
        userOTP: sixDgt
    };

     
    useEffect(() => {
        if (stage === 1) {
            setExpiredOTP(false);
            setTimer(120);  

            const countdown = setInterval(() => {
                setTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
            }, 1000);

            setTimeout(() => {
                setExpiredOTP(true);
                setTimer(null);
                clearInterval(countdown);
            }, 120000);  

            return () => clearInterval(countdown);
        }
    }, [stage]);

    function resendOTP(e: React.FormEvent) {
        e.preventDefault();
        setExpiredOTP(false);
        setTimer(120);  

        const countdown = setInterval(() => {
            setTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
        }, 1000);

        setTimeout(() => {
            setExpiredOTP(true);
            setTimer(null);
            clearInterval(countdown);
        }, 120000); 

        const mailData = {
            email: formData.email,
            password: formData.password,
            subject: "Email Verification",
            message: "Verify your email with the code below",
            duration: 2
        };

        axiosPublic.post('/user/signup', mailData)
            .then(() => {
                Swal.fire({
                    title: "A six-digit code has been sent to your Email.",
                    icon: "success"
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: error.response?.data || "Error sending OTP",
                    icon: "error"
                });
            });
    }

    function handleCode(e: React.FormEvent) {
        e.preventDefault();
        axiosPublic.post('/otp/check', OTPData)
            .then((res) => {
                if (!res.data.ValidOTP) {
                    Swal.fire({
                        title: "Wrong OTP",
                        icon: "error"
                    });
                } else if (res.data.OTPExpired) {
                    Swal.fire({
                        title: "OTP Expired",
                        icon: "error"
                    });
                    setExpiredOTP(true)
                } else {
                    Swal.fire({
                        title: "OTP Verified",
                        icon: "success"
                    });
                    setTimeout(() => {
                        setStage(stage + 1);
                    }, 1000);
                }
            })
    }

    return (
        <div>
            <motion.form onSubmit={handleCode} className="bg-white p-8 rounded-2xl shadow-xl md:w-96">
                <label className="block text-gray-700 mb-2">
                    A 6-digit code has been sent to your email
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
                    className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Submit
                </motion.button>


            </motion.form>
            <div className="flex justify-center items-center gap-2 mt-2">
                <button
                    disabled={!expiredOTP}
                    onClick={resendOTP}
                    className={`p-2 rounded-xl flex justify-center text-white
                            ${expiredOTP ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'}`}
                >
                    Resend OTP
                </button>
                {timer !== null && (
                    <span className="text-gray-600 text-sm">{timer}s</span>
                )}
            </div>
        </div>
    );
};

export default SecondForm;
