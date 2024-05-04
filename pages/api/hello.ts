// pages/api/getData.js

import * as yup from 'yup';
import { NextApiRequest, NextApiResponse } from 'next';

// Define the schema using Yup
const schema = yup.object().shape({
  name: yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await schema.validate(req.query);

      res.status(200).json({ message: 'Validation successful!' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
