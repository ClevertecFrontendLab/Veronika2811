import { isArrayWithItems } from '@utils/is-array-with-items';

import { CatalogTrainingPalsResponse } from '@/types/catalogs';

export const sortedUsers = (array: CatalogTrainingPalsResponse[]) => {
    if (!isArrayWithItems(array)) return [];

    return [...array].sort((a, b) => {
        const statusOrder: Record<string, number> = {
            accepted: 0,
            pending: 1,
            null: 2,
            rejected: 3,
        };

        const statusA = a.status || 'null';
        const statusB = b.status || 'null';

        const [firstNameA, lastNameA = ''] = (a.name || '').toLowerCase().split(' ');
        const [firstNameB, lastNameB = ''] = (b.name || '').toLowerCase().split(' ');

        if (statusA !== statusB) {
            return statusOrder[statusA] - statusOrder[statusB];
        }

        if (a.name === '' || b.name === '') {
            return statusOrder[statusA];
        }

        const result = firstNameA.charCodeAt(0) - firstNameB.charCodeAt(0);

        return result ? firstNameA.localeCompare(firstNameB) : lastNameA.localeCompare(lastNameB);
    });
};
