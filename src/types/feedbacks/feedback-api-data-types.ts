import { Nullebel } from '../nullebel';

export type Feedback = {
    id: string;
    createdAt: string;
    rating: number;
    fullName: Nullebel<string>;
    imageSrc: Nullebel<string>;
    message: Nullebel<string>;
};
