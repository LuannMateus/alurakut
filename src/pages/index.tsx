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
  imageUrl: string;
  creatorSlug: string;
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

  const [followers, setFollowers] = useState([]);

  const favoritePersons = [
    {
      title: 'juunegreiros',
      imageUrl: 'https://github.com/juunegreiros.png',
    },
    {
      title: 'omariosouto',
      imageUrl: 'https://github.com/omariosouto.png',
    },
    {
      title: 'peas',
      imageUrl: 'https://github.com/peas.png',
    },
    {
      title: 'rodrigobranas',
      imageUrl: 'https://github.com/rodrigobranas.png',
    },
    {
      title: 'wesleywillians',
      imageUrl: 'https://github.com/wesleywillians.png',
    },
    {
      title: 'argentinaluiz',
      imageUrl: 'https://github.com/argentinaluiz.png',
    },
  ];

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const newCommunity = {
      title: formData.get('title') as string,
      imageUrl: formData.get('image') as string,
      creatorSlug: 'luannmateus',
    } as Communities;

    if (!newCommunity.title.length || !newCommunity.imageUrl.length) return;

    try {
      fetch('/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommunity),
      }).then(async (resp) => {
        const responseJSON = await resp.json();

        const community = responseJSON.data;

        console.log(community);

        setCommunities([...communities, community]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch('https://api.github.com/users/luannmateus/followers')
      .then((resp) => resp.json())
      .then((followers) => {
        const parseFollowers = followers.map((follower) => {
          return {
            title: follower.login,
            imageUrl: follower.avatar_url,
          };
        });

        setFollowers(parseFollowers);
      });
  }, []);

  useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_DATO_CMS_READ_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
              id 
              title
              imageUrl
              creatorSlug
            }
          }`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        const allCommunities = json.data.allCommunities;

        setCommunities(allCommunities);
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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
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
