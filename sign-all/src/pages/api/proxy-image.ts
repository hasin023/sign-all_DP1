import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
        res.status(400).json({ error: "URL is required" });
        return;
    }

    try {
        const response = await axios.get(url, {
            responseType: "arraybuffer",
        });

        res.setHeader("Content-Type", response.headers["content-type"]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the image" });
    }
}
