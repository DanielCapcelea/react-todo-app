import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { deleteTodo } from '../redux/todoSlice';

import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/todoItem.module.scss';
import TodoModal from './TodoModal';

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast('Todo Deleted Successfully', {
            icon: '❌',
            style: {
                background: '#333',
                color: '#fff',
            },
        });
    };
    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    return (
        <>
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
            <TodoModal
                type="update"
                todo={todo}
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
            />
        </>
    );
}

export default TodoItem;
