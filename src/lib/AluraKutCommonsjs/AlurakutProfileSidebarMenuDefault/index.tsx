import { FunctionComponent } from 'react';

import styled from 'styled-components';

const BASE_URL = 'http://alurakut.vercel.app/';

const AlurakutProfileSidebarMenuDefaultWrapper = styled.div`
  a {
    font-size: 12px;
    color: #2e7bb4;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
`;

const AlurakutProfileSidebarMenuDefault: FunctionComponent = () => {
  return (
    <AlurakutProfileSidebarMenuDefaultWrapper>
      <nav>
        <a href="/">
          <img src={`${BASE_URL}/icons/user.svg`} />
          Perfil
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/book.svg`} />
          Recados
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/camera.svg`} />
          Fotos
        </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/sun.svg`} />
          Depoimentos
        </a>
      </nav>
      <hr />
      <nav>
        <a href="/">
          <img src={`${BASE_URL}/icons/plus.svg`} />
          GitHub Trends
        </a>
        <a href="/logout">
          <img src={`${BASE_URL}//icons/logout.svg`} />
          Sair
        </a>
      </nav>
    </AlurakutProfileSidebarMenuDefaultWrapper>
  );
};

export { AlurakutProfileSidebarMenuDefault };
