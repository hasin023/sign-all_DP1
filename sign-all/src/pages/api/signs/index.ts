import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/utils/mongodb";
import { getSigns, getWordStartingWith } from "@/utils/queries/sign";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { limit, page, prefix } = req.query;
        await dbConnect();

        if (!prefix) {
            const data = await getSigns(page ? +page : 1, limit ? +limit : 20);
            res.status(200).json(data);
        } else {
            const data = await getWordStartingWith(prefix as string, page ? +page : 1, limit ? +limit : 20);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { word, videos } = req.body;
        await dbConnect();

        res.status(201).json({ word, videos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnect();

        const { wordId } = req.body;
        if (!wordId) return res.status(400).json({ error: 'Word is required' });

        res.status(200).json({ message: 'Word deleted successfully' });
    } catch (error) {
        console.error('Error deleting word:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET')
        return GET(req, res);
    if (req.method === 'POST')
        return POST(req, res);
    if (req.method === 'DELETE')
        return DELETE(req, res);

    res.status(404).json({ error: 'Invalid Method' });
}
