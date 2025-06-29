export interface Chat{
	id: string,
	members: {
		[userId: string]: {
			nickname: string,
			id: string
		}
	}
	created_at: string
};