import { StarTwoTone } from '@ant-design/icons';

export const characterRender = (index: number | undefined, value = 0) => {
    if (typeof index === 'number') {
        return index < value ? (
            <StarTwoTone twoToneColor={['#FAAD14', '#FAAD14']} />
        ) : (
            <StarTwoTone twoToneColor={['#FAAD14', 'transparent']} />
        );
    }
};
