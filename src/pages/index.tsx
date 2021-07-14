import { NextPage } from 'next';
import { FormEvent, Fragment, useState } from 'react';
import Head from 'next/head';

import { MainGrid } from '../components/MainGrid';
import { Box } from '../components/Box';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelation';
import { AlurakutMenu } from '../lib/AluraKutCommonsjs/Menu';
import { OrkutNostalgicIconSet } from '../lib/AluraKutCommonsjs/OrkutNostalgicIconSet';
import { AlurakutProfileSidebarMenuDefault } from '../lib/AluraKutCommonsjs/AlurakutProfileSidebarMenuDefault';

type ProfileUser = {
  githubUser: string;
};

type Communities = {
  title: string;
  imageURL: string;
};

const ProfileSidebar: NextPage<ProfileUser> = ({ githubUser }) => {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}.png`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
};

const Home = () => {
  const [communities, setCommunities] = useState([]);

  const favoritePersons = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const newCommunity = {
      title: formData.get('title') as string,
      imageURL: formData.get('image') as string,
    } as Communities;

    if (!newCommunity.title.length || !newCommunity.imageURL.length) return;

    setCommunities([...communities, newCommunity]);
  };

  return (
    <>
      <Head>
        <title>Home | Alurakut</title>
      </Head>
      <AlurakutMenu githubUser="luannmateus" />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser="luannmateus" />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet
              points={{
                recados: 2,
                fotos: 0,
                videos: 0,
                fas: 0,
                mensagens: 0,
                confiavel: 3,
                legal: 3,
                sexy: 3,
              }}
            />
          </Box>

          <Box onSubmit={handleSubmit}>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa?"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa?"
                  type="text"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>

            <ul>
              {communities.map((actualItem: Communities, index) => {
                return (
                  <Fragment key={`actualItem.title_${index}`}>
                    <li>
                      <a href={`/users/${actualItem.title}`}>
                        <img src={actualItem.imageURL} />
                        <span>{actualItem.title}</span>
                      </a>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePersons.length})
            </h2>

            <ul>
              {favoritePersons.map((actualItem) => {
                return (
                  <Fragment key={actualItem}>
                    <li>
                      <a href={`/users/${actualItem}`}>
                        <img src={`https://github.com/${actualItem}.png`} />
                        <span>{actualItem}</span>
                      </a>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
