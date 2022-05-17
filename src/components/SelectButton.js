import React from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/button.module.scss';

function SelectButton({ children, id, ...rest }) {
    return (
        <div className={styles.custom__select}>
            <select
                id={id}
                className={getClasses([styles.button, styles.button__select])}
                {...rest}
            >
                {children}
            </select>
            <span className={styles.arrow}>
                <RiArrowDownSFill />
            </span>
        </div>
    );
}

export default SelectButton;
