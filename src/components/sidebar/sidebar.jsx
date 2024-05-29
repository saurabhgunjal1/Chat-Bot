import React from 'react';
import styles from './sidebar.module.css';
import logoimg from "../../images/logoimg.png";
import editimg from "../../images/edit.png";
import { FaRegEdit, FaBars } from "react-icons/fa";
import { useState } from 'react';

export default function Sidebar({ conversations, startNewChat, viewConversation }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.sidewrapper} ${isOpen ? styles.open : ''}`} isOpen={isOpen.toString()} toggleSidebar={toggleSidebar}>
            <div className={styles.pastchatdiv}>
                <div className={styles.pastchatdivheading}>
                    <img src={logoimg} alt="Logo" />
                    <h5>New Chat</h5>
                    <button onClick={startNewChat}> <img src={editimg} alt="New Chat" /></button>
                    <FaBars className={styles.hamburger} onClick={toggleSidebar} />
                </div>
                <h5 className={styles.h4pastcon}>Past Conversations</h5>
                <ul>
                    {conversations.map((conversation, index) => (
                        <button key={index} onClick={() => viewConversation(index)} className={styles.pastconversationbtn}><li>Conversation {index + 1}</li></button>
                    ))}
                </ul>
            </div>
        </div>
    );
}
