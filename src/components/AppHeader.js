import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import SelectButton from './SelectButton';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus } from '../redux/todoSlice';

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useSelector((state) => state.todo.filterStatus);
    const dispatch = useDispatch();

    const updateFilter = (event) => {
        dispatch(updateFilterStatus(event.target.value));
    };

    return (
        <div className={styles.appHeader}>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
                Add Task
            </Button>
            <SelectButton
                id="status"
                value={filterStatus}
                onChange={updateFilter}
            >
                <option value="all">ALL</option>
                <option value="incomplete">INCOMPLETE</option>
                <option value="complete">COMPLETED</option>
            </SelectButton>
            <TodoModal
                type="add"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}

export default AppHeader;
