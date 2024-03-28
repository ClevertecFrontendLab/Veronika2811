import { Nullebel } from '../nullebel';

export type FeedbackResponse = {
    id: string;
    createdAt: string;
    rating: number;
    fullName: Nullebel<string>;
    imageSrc: Nullebel<string>;
    message: Nullebel<string>;
};
