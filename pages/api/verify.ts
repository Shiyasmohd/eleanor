import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
    count: Number
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const contractAddress = '0x50020f71cafbe11fbe1062dbcd082dca55114447'
        const walletAddress = '0xA4DA350702f06FB8AdE5eba73cdF63DCbBd3a426'
        axios.get('https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=' + contractAddress + '&address=' + walletAddress + '&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=PMCI6ABIVR7SH6REB615VYCM4X6JQKQT5Z')
            .then(async function (response) {
                const count = response.data.result.length
                res.status(200).json({ count: count })
            });
    } catch {
        console.log("error")
    }

}
