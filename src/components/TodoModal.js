import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';
import Button from './Button';
import { addTodo } from '../redux/todoSlice';
import styles from '../styles/modules/modal.module.scss';

function TodoModal({ modalOpen, setModalOpen }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');

    const dispatch = useDispatch();

    const onClose = () => {
        setModalOpen(false);
        setTitle('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && status) {
            dispatch(
                addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleDateString(),
                })
            );
            toast.success('Task Added Successfully');
            setModalOpen(false);
        } else {
            toast.error('Title should not be empty');
        }
    };

    return (
        modalOpen && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div
                        className={styles.closeButton}
                        onClick={onClose}
                        onKeyDown={() => setModalOpen(false)}
                        tabIndex={0}
                        role="button"
                    >
                        <MdOutlineClose />
                    </div>
                    <form
                        className={styles.form}
                        onSubmit={(event) => handleSubmit(event)}
                    >
                        <h1 className={styles.formTitle}>Add Task</h1>
                        <label htmlFor="title">
                            Title
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </label>
                        <label htmlFor="status">
                            Status
                            <select
                                name="status"
                                id="status"
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value)
                                }
                            >
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type="submit" variant="primary">
                                Add Task
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={onClose}
                                onKeyDown={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default TodoModal;
