import axios from "axios";
import { useState } from "react";

const Todos = ({ data, onDelete, onComplete }) => {
    const [isComplete, setIsComplete] = useState(data.completed);

    const handleCheck = async () => {
        try {
            await axios.patch(`http://localhost:8080/todos/${data.id}`, {
                completed: !isComplete,
            });
            setIsComplete(!isComplete);
            if (onComplete) onComplete();
        } catch (error) {
            console.error('Error updating completion status:', error);
        }
    };

    return (
        <div className="border w-[250px] h-[120px] text-center relative rounded-[4px] inset">
            <h1 className="text-white border-b-[1px] border-gray-500 mx-[50px]">{data.title}</h1>
            <p className="mx-[20px]">{data.description}</p>
            <div className="absolute bottom-[10px] right-[10px] flex items-center gap-[10px]">
                <img
                    src={isComplete ? "/check.png" : "/minus.png"}
                    alt=""
                    className="w-[20px]"
                />
                <button
                    className="bg-white text-black px-[12px] rounded-[5px] cursor-pointer"
                    onClick={handleCheck}
                >
                    Check
                </button>
            </div>

            <div className="absolute top-[5px] right-[10px] flex items-center gap-[10px]">
                <button
                    className="bg-white text-black rounded-[50px] px-[7px] py-[0px] cursor-pointer"
                    onClick={() => onDelete(data.id)}
                >
                    x
                </button>
            </div>
        </div>
    );
};

export default Todos;
