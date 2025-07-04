import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [loginPage, setLoginPage] = useState({
        isLogined: false,
        isActive: false,
    });

    return (
        <DataContext.Provider value={{ loginPage, setLoginPage }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
