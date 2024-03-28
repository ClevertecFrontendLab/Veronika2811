import ruRU from 'antd/lib/calendar/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

export const PICKER_LOCALE: PickerLocale = {
    lang: {
        ...ruRU.lang,
        month: 'Месяц',
        year: 'Год',
        yearFormat: 'YYYY',
        dateFormat: 'DD.MM.YYYY',
        dayFormat: 'DD',
        dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
        monthFormat: 'MM',
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...ruRU.timePickerLocale,
    },
    dateFormat: 'DD.MM.YYYY',
    dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
    monthFormat: 'MM.YYYY',
};
