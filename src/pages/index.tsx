import { NextPage } from 'next';
import { Fragment } from 'react';
import Head from 'next/head';

import { MainGrid } from '../components/MainGrid';
import { Box } from '../components/Box';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelation';
import { AlurakutMenu } from '../lib/AluraKutCommonsjs/Menu';
import { OrkutNostalgicIconSet } from '../lib/AluraKutCommonsjs/OrkutNostalgicIconSet';

type ProfileUser = {
  githubUser: string;
};

const ProfileSidebar: NextPage<ProfileUser> = ({ githubUser }) => {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
};

const Home = () => {
  const favoritePersons = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

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
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
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
