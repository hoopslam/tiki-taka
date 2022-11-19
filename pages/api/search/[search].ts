import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { searchPostsQuery, userSearchQuery } from '../../../utils/queries';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { search } = req.query;

        const videosQuery = searchPostsQuery(search);
        const accountsQuery = userSearchQuery(search);
        const searchedAccounts = await client.fetch(accountsQuery);
        const videos = await client.fetch(videosQuery);

        res.status(200).json({ videos, searchedAccounts });
    }
}
