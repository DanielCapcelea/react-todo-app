import React, { useState } from 'react';
import Button from './Button';
import SelectButton from './SelectButton';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(true);

    return (
        <div className={styles.appHeader}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
                Add Task
            </Button>
            <SelectButton id="status">
                <option value="all">ALL</option>
                <option value="incomplete">INCOMPLETE</option>
                <option value="completed">COMPLETED</option>
            </SelectButton>
            <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    );
}

export default AppHeader;
