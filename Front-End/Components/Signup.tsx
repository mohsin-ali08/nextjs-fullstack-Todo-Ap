import { useState } from 'react';
import { Input, Button, Form, notification, Typography, Spin } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Title, Text } = Typography;

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
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
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

      notification.success({
        message: 'Sign Up Successful',
        description: response.data.message || 'Welcome to the Todo App!',
        placement: 'topRight',
      });

      router.push('/login');
    } catch (err: unknown) {
      // Type assertion to handle AxiosError correctly
      if (axios.isAxiosError(err)) {
        notification.error({
          message: 'Sign Up Failed',
          description: err.response?.data?.error || 'Something went wrong. Please try again.',
          placement: 'topRight',
        });
      } else {
        notification.error({
          message: 'Sign Up Failed',
          description: 'An unexpected error occurred. Please try again.',
          placement: 'topRight',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-5"
      style={{
        backgroundImage: 'url("/Signup.jpg")',
      }}
    >
      <div className="w-full max-w-md px-5 py-6 bg-white bg-opacity-50 backdrop-blur-xl border border-gray-300 rounded-lg shadow-xl">
        <Title level={2} className="text-center text-black mb-6">
          Sign Up
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={<Text className="font-semibold text-black">Username</Text>}
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<Text className="font-semibold text-black">Email</Text>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<Text className="font-semibold text-black">Password</Text>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
            {loading ? <Spin size="small" className="mr-2" /> : 'Sign Up'}
          </Button>

          <div className="flex justify-center items-center mt-5">
            <Text className="text-white">Already have an account?</Text>
            <Button type="link" onClick={handleLoginRedirect} className="font-semibold text-black hover:underline">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
