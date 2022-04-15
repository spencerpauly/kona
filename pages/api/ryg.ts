// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import csv from 'csvtojson';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface RYGData {
	Id: string;
	Timestamp: string;
	Elaboration: string | null;
	Emotion: string;
	MeetingHours: string | null;
	Platform: 'slack';
	PrivateElaboration: string | null;
	Reactions: { [key: string]: any };
	Selection: 'green' | 'yellow' | 'red';
	SlackMessageId: string | null;
	SlackOrgId: string;
	SlackTeamId: string;
	SlackUserId: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ rygData: RYGData[] }>
) {
	const rygData: RYGData[] = await csv().fromFile('./data/rygs.csv');
	res.status(200).json({ rygData });
}
