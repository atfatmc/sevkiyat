import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from '../utils/axios';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2a5298;
  }
`;

const Button = styled.button`
  background: #2a5298;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #1e3c72;
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });

      const { token, user } = response.data;
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');

      await Swal.fire({
        icon: 'success',
        title: 'Giriş Başarılı!',
        text: 'Yönlendiriliyorsunuz...',
        timer: 1500,
        showConfirmButton: false
      });

      navigate('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Giriş yapılırken bir hata oluştu';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.';
      }

      await Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: errorMessage
      });
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Giriş Yap</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Giriş Yap</Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 