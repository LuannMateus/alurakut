import { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';

import { MainGrid } from '../components/MainGrid';
import { Box } from '../components/Box';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelation';
import { AlurakutMenu } from '../lib/AluraKutCommonsjs/Menu';
import { OrkutNostalgicIconSet } from '../lib/AluraKutCommonsjs/OrkutNostalgicIconSet';
import { AlurakutProfileSidebarMenuDefault } from '../lib/AluraKutCommonsjs/AlurakutProfileSidebarMenuDefault';

import { ProfileRelationRender } from '../components/ProfileRelationRender';

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
  const [communities, setCommunities] = useState([
    {
      title: 'Curso em Vídeo',
      imageURL:
        'https://pbs.twimg.com/profile_images/378800000157650181/8e1bbdf27ff82759f9101e5e7dfc0c31_400x400.jpeg',
    },
  ]);

  const [followers, setFollowers] = useState([]);

  const favoritePersons = [
    {
      title: 'juunegreiros',
      imageURL: 'https://github.com/juunegreiros.png',
    },
    {
      title: 'omariosouto',
      imageURL: 'https://github.com/omariosouto.png',
    },
    {
      title: 'peas',
      imageURL: 'https://github.com/peas.png',
    },
    {
      title: 'rodrigobranas',
      imageURL: 'https://github.com/rodrigobranas.png',
    },
    {
      title: 'wesleywillians',
      imageURL: 'https://github.com/wesleywillians.png',
    },
    {
      title: 'argentinaluiz',
      imageURL: 'https://github.com/argentinaluiz.png',
    },
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

  useEffect(() => {
    fetch('https://api.github.com/users/luannmateus/followers')
      .then((resp) => resp.json())
      .then((followers) => {
        const parseFollowers = followers.map((follower) => {
          return {
            title: follower.login,
            imageURL: follower.avatar_url,
          };
        });

        setFollowers(parseFollowers);
      });
  }, []);

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
            <ProfileRelationRender title="Seguidores" values={followers} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <ProfileRelationRender title="Comunidades" values={communities} />
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <ProfileRelationRender
              title="Pessoas da comunidade"
              values={favoritePersons}
            />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
