import React from 'react';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/button.module.scss';

function SelectButton({ children, id, ...rest }) {
    return (
        <select
            id={id}
            className={getClasses([styles.button, styles.button__select])}
            {...rest}
        >
            {children}
        </select>
    );
}

export default SelectButton;
