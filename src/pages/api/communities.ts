import { NextApiRequest, NextApiResponse } from 'next';

import { SiteClient } from 'datocms-client';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const TOKEN = process.env.NEXT_PRIVATE_DATO_CMS_READ_WRITE_TOKEN;
    const client = new SiteClient(TOKEN);

    const data = await client.items.create({
      itemType: '970716',
      ...request.body,
    });

    return response.status(201).json({
      data,
    });
  }

  return response.status(404).json({
    message: 'We have a POST method!',
  });
};
