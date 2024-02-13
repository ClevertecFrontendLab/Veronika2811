import styles from './Title.module.css';

export const Title = () => {
    return (
        <h1 className={styles.title}>
            <span className={styles['title-first-line']}>Приветствуем тебя&nbsp;</span>
            в CleverFit — приложении,
            <span className={styles['title-second-line']}>
                которое поможет тебе добиться своей мечты!
            </span>
        </h1>
    );
};
