export type CatalogTrainingListResponse = {
    name: string;
    key: string;
};

export type Periods = {
    cost: number;
    days: number;
    text: string;
};

export type CatalogTariffListResponse = {
    _id: string;
    name: string;
    periods: Periods[];
};
