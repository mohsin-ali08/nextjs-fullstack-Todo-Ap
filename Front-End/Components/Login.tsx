import { useState } from 'react';
import { Input, Button, Form, notification, Typography, Spin } from 'antd';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

const { Title, Text, Paragraph } = Typography;

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back!',
        placement: 'topRight',
        duration: 2,
      });
      router.push('/Home');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        notification.error({
          message: 'Login Failed',
          description: err.response?.data?.error || 'An unexpected error occurred. Please try again.',
          placement: 'topRight',
          duration: 2,
        });
      } else {
        notification.error({
          message: 'Login Failed',
          description: 'An unexpected error occurred. Please try again.',
          placement: 'topRight',
          duration: 2,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup');
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-5"
      style={{
        backgroundImage: 'url("/Signup.jpg")',
      }}
    >
      {/* Login Form */}
      <div className="w-full max-w-md py-6 px-5 bg-white bg-opacity-50 backdrop-blur-lg border border-white rounded-lg shadow-lg">
        <Title level={2} className="text-black text-center mb-3">
          Welcome to Todo App
        </Title>
        <Paragraph className="text-black text-md text-center">
          Organize your tasks effortlessly with our Todo App. Track your daily activities, prioritize tasks,
          and achieve your goals efficiently. <span className='font-bold hover:underline'>Login</span> to explore over Todo App&apos;s features!
        </Paragraph>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={<Text className="font-semibold text-black">Email</Text>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<Text className="font-semibold text-black">Password</Text>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Button
            type="default"
            htmlType="submit"
            block
            size="large"
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg"
          >
            {loading ? <Spin size="small" className="mr-2" /> : 'Login'}
          </Button>

          <div className="flex justify-center items-center mt-5">
          <Text className="text-white">Don&#39;t have an account?</Text>

            <Button
              type="link"
              onClick={handleSignupRedirect}
              className="font-semibold hover:underline text-black"
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
