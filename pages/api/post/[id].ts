import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const query = postDetailQuery(id);

        const data = await client.fetch(query);
        console.log(data[0].comments);

        res.status(200).json(data[0]);
    } else if (req.method === 'PUT') {
        const { comment, userId } = req.body;
        const { id }: any = req.query;

        const data = await client
            .patch(id) //edit post
            .setIfMissing({ comments: [] }) //create comments to empty array if no likes
            .insert('after', 'comments[-1]', [
                {
                    comment,
                    _key: v4(),
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userId,
                    },
                },
            ])
            .commit();
        const query = postDetailQuery(id);
        const newData = await client.fetch(query);

        res.status(200).json(newData[0]);
    }
}
