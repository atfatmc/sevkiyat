import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Button = styled(Link)`
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
  
  &:hover {
    background: #45a049;
  }
`;

const Services = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Navbar>
        <Logo>Sevkiyat Pro</Logo>
        <NavLinks>
          <NavLink to="/">Ana Sayfa</NavLink>
          <NavLink to="/services">Hizmetlerimiz</NavLink>
          <NavLink to="/contact">İletişim</NavLink>
          <NavLink to="/login">Giriş Yap</NavLink>
        </NavLinks>
      </Navbar>

      <Hero>
        <Title>Profesyonel Sevkiyat ve Montaj Hizmetleri</Title>
        <Subtitle>
          Güvenilir, hızlı ve profesyonel sevkiyat çözümleri ile işinizi büyütün
        </Subtitle>
        <Button to="/contact">Bizimle İletişime Geçin</Button>
      </Hero>

      <Services>
        <ServiceCard>
          <h3>Sevkiyat Hizmetleri</h3>
          <p>Türkiye'nin her noktasına güvenli ve hızlı sevkiyat hizmetleri</p>
        </ServiceCard>
        <ServiceCard>
          <h3>Montaj Hizmetleri</h3>
          <p>Uzman ekibimizle profesyonel montaj çözümleri</p>
        </ServiceCard>
        <ServiceCard>
          <h3>Lojistik Çözümler</h3>
          <p>Entegre lojistik çözümler ile tedarik zincirinizi optimize edin</p>
        </ServiceCard>
      </Services>
    </HomeContainer>
  );
};

export default Home; 