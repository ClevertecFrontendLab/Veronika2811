import { StarTwoTone } from '@ant-design/icons';

export const characterRender = (index?: number, value = 0) =>
    typeof index === 'number' && index < value ? (
        <StarTwoTone twoToneColor={['#FAAD14', '#FAAD14']} />
    ) : (
        <StarTwoTone twoToneColor={['#FAAD14', 'transparent']} />
    );
