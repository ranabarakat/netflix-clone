import React from 'react';

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {

    return (
        <div className="relative">
            <input
                id={id}
                value={value}
                onChange={onChange}
                type={type}
                className="
                block
                rounded-md
                text-white
                text-md
                w-full
                px-6
                pt-6
                pb-1
                bg-neutral-900
                appearance-none
                focus:outline-none
                focus:ring-0
                peer
                opacity-75
                text-input
                autofill:border-1
                autofill:border-color

                "

                placeholder=" "
            />
            <label className="
                text-neutral-400
                absolute
                text-md
                font-normal
                duration-150
                transform
                -translate-y-4
                scale-75
                top-4
                z-10
                origin-[0]
                left-5
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3
                autofill: text-neutral-300


                "
                htmlFor={id}>
                {label}
            </label>
        </div>

    );
}

export default Input;