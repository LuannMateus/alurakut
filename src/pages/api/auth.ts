import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const searchAndAuth = async (githubUser: string) => {
  const user = await fetch(`https://api.github.com/users/${githubUser}`);

  const parseUser = await user.json();

  if (parseUser.id) {
    return true;
  } else {
    return false;
  }
};

const Auth = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { githubUser } = request.body;

    const userExists = await searchAndAuth(githubUser);

    if (userExists) {
      const token = jwt.sign(
        {
          githubUser: githubUser,
          isAuthenticated: true,
        },
        process.env.NEXT_PRIVATE_AUTH_KEY,
        {
          subject: githubUser,
          expiresIn: '1d',
        }
      );
      response.status(200).json({
        token,
      });
    } else {
      response.status(401).json({
        isAuthenticated: false,
      });
    }
  }
};

export default Auth;
