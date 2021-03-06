import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Link } from '../Link';

import nookies from 'nookies';

import { AlurakutMenuProfileSidebar } from '../AlurakutMenuProfileSidebar';

const BASE_URL = 'http://alurakut.vercel.app/';
const v = '1';

type AlurakutMenuWrapper = {
  isMenuOpen: boolean;
};

const AlurakutMenuWrapper = styled.header`
  width: 100%;
  background-color: #308bc5;

  .alurakutMenuProfileSidebar {
    background: white;
    position: fixed;
    z-index: 100;
    padding: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 48px;
    transition: 0.3s;
    pointer-events: ${({ isMenuOpen }: AlurakutMenuWrapper) =>
      isMenuOpen ? 'all' : 'none'};
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? '1' : '0')};
    transform: ${({ isMenuOpen }) =>
      isMenuOpen ? 'translateY(0)' : 'translateY(calc(-100% - 48px))'};
    @media (min-width: 860px) {
      display: none;
    }
    > div {
      max-width: 400px;
      margin: auto;
    }
    a {
      font-size: 18px;
    }
    .boxLink {
      font-size: 18px;
      color: #2e7bb4;
      -webkit-text-decoration: none;
      text-decoration: none;
      font-weight: 800;
    }
    hr {
      margin-top: 12px;
      margin-bottom: 8px;
      border-color: transparent;
      border-bottom-color: #ecf2fa;
    }
  }
  .container {
    background-color: #308bc5;
    padding: 7px 16px;
    max-width: 1110px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 101;
    @media (min-width: 860px) {
      justify-content: flex-start;
    }
    button {
      border: 0;
      background: transparent;
      align-self: center;
      display: inline-block;
      @media (min-width: 860px) {
        display: none;
      }
    }
    nav {
      display: none;
      @media (min-width: 860px) {
        display: flex;
      }
      a {
        font-size: 12px;
        color: white;
        padding: 10px 16px;
        position: relative;
        text-decoration: none;
        &:after {
          content: ' ';
          background-color: #5292c1;
          display: block;
          position: absolute;
          width: 1px;
          height: 12px;
          margin: auto;
          left: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
    input {
      color: #ffffff;
      background: #5579a1;
      padding: 10px 42px;
      border: 0;
      background-image: url(${`${BASE_URL}/icons/search.svg`});
      background-position: 15px center;
      background-repeat: no-repeat;
      border-radius: 1000px;
      font-size: 12px;
      ::placeholder {
        color: #ffffff;
        opacity: 1;
      }
    }
  }
`;
const AlurakutMenuLogo = styled.img`
  background-color: #ffffff;
  padding: 9px 14px;
  border-radius: 1000px;
  height: 34px;
`;

type MenuProps = {
  githubUser: string;
};

const AlurakutMenu: FunctionComponent<MenuProps> = ({ githubUser }) => {
  const router = useRouter();
  const [isMenuOpen, setMenuState] = useState(false);

  const handleLogout = () => {
    nookies.destroy(null, 'USER_TOKEN');
    router.push('/login');
  };

  return (
    <AlurakutMenuWrapper isMenuOpen={isMenuOpen}>
      <div className="container">
        <AlurakutMenuLogo src={`${BASE_URL}/logo.svg`} />

        <nav style={{ flex: 1 }}>
          {[
            { name: 'Inicio', slug: '/' },
            { name: 'Amigos', slug: '/amigos' },
            { name: 'Comunidades', slug: '/comunidades' },
          ].map((menuItem) => (
            <Link
              key={`key__${menuItem.name.toLocaleLowerCase()}`}
              href={`${menuItem.slug.toLocaleLowerCase()}`}
            >
              {menuItem.name}
            </Link>
          ))}
        </nav>

        <nav>
          <a onClick={handleLogout}>Sair</a>
          <div>
            <input placeholder="Pesquisar no Orkut" />
          </div>
        </nav>

        <button onClick={() => setMenuState(!isMenuOpen)}>
          {isMenuOpen && <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} />}
          {!isMenuOpen && (
            <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} />
          )}
        </button>
      </div>
      <AlurakutMenuProfileSidebar githubUser={githubUser} />
    </AlurakutMenuWrapper>
  );
};

export { AlurakutMenu };
