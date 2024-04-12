import { SETTINGS_TEST_IDS } from './settings-test-ids';

export const PROFILE_SETTINGS_OPTIONS = [
    {
        field: 'readyForJointTraining',
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        testIds: SETTINGS_TEST_IDS.tariffTrainings,
        testIdsIcon: SETTINGS_TEST_IDS.tariffTrainingsIcon,
    },
    {
        field: 'sendNotification',
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        testIds: SETTINGS_TEST_IDS.tariffNotifications,
        testIdsIcon: SETTINGS_TEST_IDS.tariffNotificationsIcon,
    },
    {
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        testIds: SETTINGS_TEST_IDS.tariffTheme,
        testIdsIcon: SETTINGS_TEST_IDS.tariffThemeIcon,
    },
];
