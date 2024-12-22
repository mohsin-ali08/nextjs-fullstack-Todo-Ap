import { useRouter } from 'next/router';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { removeToken } from '@/Utils/Auth';
import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon from react-icons

const Header: React.FC = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Check if the app is running on the client side (avoid SSR issues)
  useEffect(() => {
    setIsClient(true);
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    removeToken();
    setToken(null);
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (!isClient) return null;

  return (
    <header className="flex justify-between items-center md:px-6 px-3 py-3 bg-white bg-opacity-50 backdrop-blur-lg text-black shadow-lg">
      {/* LinkedIn icon and name */}
      <a
        href="https://www.linkedin.com/in/mohsin-ali08/" // Replace with your LinkedIn profile link
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2"
      >
        <FaLinkedin className="text-blue-600 md:text-lg" />
        <h1 className="text-md font-bold">MOHSIN ALi</h1>
      </a>

      <div>
        <h1 className="text-xl font-bold">Todo App</h1>
      </div>

      <div className="flex items-center space-x-5">
        {token ? (
          <Button onClick={handleLogout} type="primary" danger className='font-semibold py-1'>
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
