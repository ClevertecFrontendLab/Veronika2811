export type FieldData = {
    name: string | number | (string | number)[];
    value?: string;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
};
