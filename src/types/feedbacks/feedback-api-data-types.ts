export type Feedback = {
    id: string;
    createdAt: string;
    rating: number;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
};
