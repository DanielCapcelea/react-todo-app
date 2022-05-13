import React from 'react';
import Button from './Button';
import SelectButton from './SelectButton';
import styles from '../styles/modules/app.module.scss';

function AppHeader() {
    return (
        <div className={styles.appHeader}>
            <Button variant="primary">Click</Button>
            <SelectButton id="status">
                <option value="all">ALL</option>
                <option value="incomplete">INCOMPLETE</option>
                <option value="completed">COMPLETED</option>
            </SelectButton>
        </div>
    );
}

export default AppHeader;
