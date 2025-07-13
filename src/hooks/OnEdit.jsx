import React, { useState, useEffect, useContext } from 'react';
import DataContext from '../context/DataContest';

const EditableField = ({ value, onChange, className = '' }) => {

    const { isEditing } = useContext(DataContext);

    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        if (!editing) {
            setTempValue(value);
        }
    }, [value, editing]);

    const handleSave = () => {
        if (tempValue !== value) {
            onChange(tempValue);
        }
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setTempValue(value);
            setEditing(false);
        }
    };

    return (
        editing ? (
            <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                disabled={!isEditing}
                autoFocus
                className={`border sm:max-w-fit w-35 p-1 rounded ${className}`}
            />
        ) : (
            <span onClick={() => {
                if (isEditing) {
                    setEditing(true);
                }
            }} className={`${isEditing ? `cursor-pointer ${className} hover:text-cyan-500` : ''} `}>
                {value || "Click to edit"}
            </span>
        )
    );
};

export default EditableField;
