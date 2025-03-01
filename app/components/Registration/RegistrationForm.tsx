import { useState } from "react";
import FirstForm from "~/components/Registration/FirstForm";
import SecondRegForm from "./SecondRegForm";
export default function RegistrationForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    let [stage, setStage] = useState(0)
    let [sixDgt, setSixDgt] = useState('')

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {stage == 0 ?
                <FirstForm formData={formData} setFormData={setFormData} setStage={setStage} />
                : stage == 1 &&
                <div>
                    <SecondRegForm sixDgt={sixDgt} setSixDgt={setSixDgt} stage={stage} setStage={setStage} formData={formData} />
                </div>
                // : stage == 2 &&
                // <div>
                //     <div className="bg-white p-8 rounded-2xl shadow-xl md:w-96">
                //         <TwoFA email={formData.email}/>
                //     </div>
                // </div>
            }
        </div>
    );
}
