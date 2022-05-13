import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Button from './Button';
import { addTodo, updateTodo } from '../redux/todoSlice';
import styles from '../styles/modules/modal.module.scss';

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.5)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};

function TodoModal({ type, todo, modalOpen, setModalOpen }) {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('incomplete');
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, todo, modalOpen]);

    const onClose = () => {
        setModalOpen(false);
        setTitle('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === '') {
            toast.error('Please enter a title.');
            return;
        }

        if (title && status) {
            if (type === 'add') {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleDateString(),
                    })
                );
                toast.success('Task Added Successfully');
            }
            if (type === 'update') {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(
                        updateTodo({
                            ...todo,
                            title,
                            status,
                        })
                    );
                } else {
                    toast('No Changes Made', {
                        icon: 'ℹ️',
                    });
                    return;
                }
            }
            setModalOpen(false);
        } else {
            toast.error('Title should not be empty');
        }
    };

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className={styles.wrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={styles.container}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className={styles.closeButton}
                            onClick={() => setModalOpen(false)}
                            onKeyDown={() => setModalOpen(false)}
                            tabIndex={0}
                            role="button"
                            initial={{ top: 40, opacity: 0 }}
                            animate={{ top: -10, opacity: 1 }}
                        >
                            <MdOutlineClose />
                        </motion.div>
                        <form
                            className={styles.form}
                            onSubmit={(event) => handleSubmit(event)}
                        >
                            <h1 className={styles.formTitle}>
                                {type === 'update' ? 'Update' : 'Add'} Task
                            </h1>
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
                            {type === 'update' ? (
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
                                        <option value="incomplete">
                                            Incomplete
                                        </option>
                                        <option value="complete">
                                            Complete
                                        </option>
                                    </select>
                                </label>
                            ) : null}
                            <div className={styles.buttonContainer}>
                                <Button type="submit" variant="primary">
                                    {type === 'update' ? 'Update' : 'Add'} Task
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setModalOpen(false)}
                                    onKeyDown={() => setModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TodoModal;
