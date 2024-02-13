import React from 'react';

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {

    return (
        <div className="w-full flex flex-col min-h-screen justify-between">
            {children}
        </div>
    )
}

export default Layout