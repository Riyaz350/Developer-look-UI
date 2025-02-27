import { useState } from "react";
import FirstForm from "./Registration/FirstForm";
import SecondForm from "./Registration/SecondForm";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    let [stage, setStage] = useState(0)
    let [sixDgt, setSixDgt] = useState('')
    console.log(sixDgt)

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {stage == 0 ?
                <FirstForm formData={formData} setFormData={setFormData} setStage={setStage} />
                : stage == 1 ?
                    <div>
                        <SecondForm sixDgt={sixDgt} setSixDgt={setSixDgt} stage={stage} setStage={setStage} />
                    </div>
                    : stage == 2 &&
                    <div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl md:w-96">
                            <h1>hello</h1>
                        </div>
                    </div>
            }
        </div>
    );
}
