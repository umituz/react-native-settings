export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface Rating {
    id: string;
    userId: string;
    entityId: string;
    entityType: string;
    value: RatingValue;
    createdAt: string;
    updatedAt: string;
}

export interface RatingStats {
    average: number;
    count: number;
    distribution: Record<RatingValue, number>;
}
