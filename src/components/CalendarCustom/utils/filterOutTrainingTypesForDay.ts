import { CatalogTrainingList } from '@/types/catalogs/catalogsApiDataTypes';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

export const filterOutTrainingTypesForDay = (
    cellContent: TrainingResponse[],
    trainingListData: CatalogTrainingList[],
    past?: boolean,
) => {
    const existingWorkoutsForSelectedDay = cellContent.map((el) => el.name);

    let filteredTrainingList = null;

    if (past) {
        filteredTrainingList = trainingListData.filter((item) =>
            existingWorkoutsForSelectedDay.includes(item.name),
        );
    } else {
        filteredTrainingList = trainingListData.filter(
            (item) => !existingWorkoutsForSelectedDay.includes(item.name),
        );
    }

    const newTrainingList = filteredTrainingList.map((obj) => ({
        label: obj.name,
        value: obj.key,
    }));

    return newTrainingList;
};
