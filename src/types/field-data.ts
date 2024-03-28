export type FieldData = {
    name: string | number | Array<string | number>;
    value?: string;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
};
