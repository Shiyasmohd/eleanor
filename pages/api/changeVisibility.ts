import type { NextApiRequest, NextApiResponse } from 'next'
import PushAPI from "@pushprotocol/restapi";
import ethers from "ethers";

type Data = {
    msg: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const PK = process.env.PRIVATE_KEY; // channel private key
        const Pkey = `0x${PK}`;
        const signer = new ethers.Wallet(Pkey);
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload
            notification: {
                title: `Personal Medical Records DApp`,
                body: `Report Visibility Changed`
            },
            payload: {
                title: `Personal Medical Records DApp`,
                body: `One of your medical record visbility has been changed.`,
                cta: '',
                img: ''
            },
            recipients: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // recipient address
            channel: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
            env: 'staging'
        });
        console.log('API repsonse: ', apiResponse);
        if(apiResponse?.status === 204)
        res.status(200).json({ msg: 'Notification pushed successfully' });
         
    } catch {
        console.log("error")
    }

}
