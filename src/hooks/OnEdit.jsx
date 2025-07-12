import React, { useState, useEffect } from 'react';

const EditableField = ({ value, onChange, className = '' }) => {
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
                autoFocus
                className={`border p-1 rounded ${className}`}
            />
        ) : (
            <span onClick={() => setEditing(true)} className={`cursor-pointer ${className}`}>
                {value || "Click to edit"}
            </span>
        )
    );
};

export default EditableField;
