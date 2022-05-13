import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';

function TodoItem({ todo }) {
    const handleDelete = () => {
        console.log('delete');
    };
    const handleUpdate = () => {
        console.log('edit');
    };

    return (
        <div className={styles.item}>
            <div className={styles.todoDetails}>
                []
                <div className={styles.texts}>
                    <p
                        className={[
                            getClasses([
                                styles.todoText,
                                todo.status === 'complete' &&
                                    styles['todoText--completed'],
                            ]),
                        ]}
                    >
                        {todo.title}
                    </p>
                    <p className={styles.time}>{todo.time}</p>
                </div>
            </div>
            <div className={styles.todoActions}>
                <div
                    className={styles.icon}
                    onClick={handleUpdate}
                    onKeyDown={handleDelete}
                    tabIndex={0}
                    role="button"
                >
                    <MdEdit />
                </div>
                <div
                    className={styles.icon}
                    onClick={handleDelete}
                    onKeyDown={handleDelete}
                    role="button"
                    tabIndex={0}
                >
                    <MdDelete />
                </div>
            </div>
        </div>
    );
}

export default TodoItem;
