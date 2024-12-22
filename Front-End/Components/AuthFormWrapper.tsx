import React, { ReactNode } from 'react';

interface AuthFormWrapperProps {
  title: string;
  children: ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ title, children }) => {
  return (
    <div className="max-w-md mx-auto p-8 shadow-lg rounded-lg bg-white mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default AuthFormWrapper;
