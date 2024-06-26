import { CalendarTwoTone } from '@ant-design/icons';
import { DATE_FORMAT } from '@constants/date-format';
import { PICKER_LOCALE } from '@constants/picker-locale';
import { DatePicker, Input } from 'antd';

import { PROFILE_TEST_IDS } from './profile-test-ids';

const pickerIconColor = '#bfbfbf';

export const PERSONAL_INFO_FIELDS = [
    {
        field: 'firstName',
        children: (
            <Input placeholder='Имя' size='large' data-test-id={PROFILE_TEST_IDS.profileName} />
        ),
    },
    {
        field: 'lastName',
        children: (
            <Input
                placeholder='Фамилия'
                size='large'
                data-test-id={PROFILE_TEST_IDS.profileSurname}
            />
        ),
    },
    {
        field: 'birthday',
        children: (
            <DatePicker
                locale={PICKER_LOCALE}
                placeholder='Дата рождения'
                size='large'
                format={DATE_FORMAT}
                suffixIcon={<CalendarTwoTone twoToneColor={[pickerIconColor, pickerIconColor]} />}
                data-test-id={PROFILE_TEST_IDS.profileBirthday}
            />
        ),
    },
];
