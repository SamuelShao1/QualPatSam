
import React, { useState } from 'react';

const EditableTitle = ({defaultTitle}) => {
    const [title, setTitle] = useState(defaultTitle); // Initial title
    const [isEditing, setIsEditing] = useState(false);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setTitle(event.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur(); 
        }
    };

    return (
        <div className="">
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    onBlur={handleInputBlur}
                    className="border border-blue-500 border-2 rounded-full"
                    autoFocus
                />
            ) : (
                <h1 className="text-ellipsis overflow-hidden" onClick={handleTitleClick}>
                    {title}
                </h1>
            )}
        </div>
    );
};

export default EditableTitle;
