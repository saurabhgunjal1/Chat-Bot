import React, { useState, useEffect } from "react";
import styles from "./chatui.module.css";
import logo2 from "../../images/logo2.png";
import Sidebar from "../sidebar/sidebar";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import RatingForm from "../feedback/Rating";
import yourimg from "../../images/yourimg.png";
import responses from "../responses.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";

export default function ChatUI() {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState([]);
    const [input, setInput] = useState("");
    const [isAsked, setIsAsked] = useState(false);
    const [feedbackIndex, setFeedbackIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [dislikeFeedback, setDislikeFeedback] = useState("");
    const [ratings, setRatings] = useState({});
    const [isChatHistory, setIsChatHistory] = useState(false);

    // Load conversations from localStorage on component mount
    useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem("conversations")) || [];
        setConversations(savedConversations);
    }, []);

    // Save conversations to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("conversations", JSON.stringify(conversations));
    }, [conversations]);

    const handleAsk = () => {
        const response = responses.find(
            (resp) => resp.question.toLowerCase() === input.toLowerCase()
        );

        const newMessage = {
            question: input,
            response: response ? response.response : "Sorry, not able to get the answer. Try a different question.",
            feedback: null,
            rating: null,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setCurrentConversation([...currentConversation, newMessage]);
        setInput("");
        setIsAsked(true);
        setIsChatHistory(false);
    };

    const handleSave = () => {
        setConversations([...conversations, { messages: currentConversation }]);
        setCurrentConversation([]);
        setIsAsked(false); // Reset the state to initial view
        setRatings({}); // Reset ratings state when saving the conversation
        setIsChatHistory(false); // Reset chat history state when saving the conversation
    };

    const handleFeedback = (index, feedback) => {
        setFeedbackIndex(index);
        if (feedback === "like") {
            // Render the rating form
            const updatedRatings = { ...ratings, [index]: 0 }; // Initialize rating if not set
            setRatings(updatedRatings);
        } else if (feedback === "dislike") {
            setModalOpen(true);
        }
    };

    const handleModalSubmit = () => {
        const updatedConversation = [...currentConversation];
        updatedConversation[feedbackIndex].feedback = dislikeFeedback;
        setCurrentConversation(updatedConversation);
        setModalOpen(false);
        setDislikeFeedback("");
    };

    const startNewChat = () => {
        setCurrentConversation([]);
        setInput("");
        setIsAsked(false);
        setRatings({}); // Reset ratings state when starting a new chat
        setIsChatHistory(false); // Reset chat history state when starting a new chat
    };

    const viewConversation = (index) => {
        const selectedConversation = conversations[index].messages;
        setCurrentConversation(selectedConversation);
        setIsAsked(true);
        setIsChatHistory(true); // Set chat history state to true

        // Restore ratings for the selected conversation
        const restoredRatings = selectedConversation.reduce((acc, message, i) => {
            if (message.rating !== null) {
                acc[i] = message.rating;
            }
            return acc;
        }, {});
        setRatings(restoredRatings);
    };

    const handleRatingChange = (index, rating) => {
        const updatedRatings = { ...ratings, [index]: rating };
        setRatings(updatedRatings);

        // Update the current conversation with the new rating
        const updatedConversation = [...currentConversation];
        updatedConversation[index].rating = rating;
        setCurrentConversation(updatedConversation);
    };

    return (
        <div className={styles.wholepagediv}>
            <div className={styles.sidebar}>
                <Sidebar conversations={conversations} startNewChat={startNewChat} viewConversation={viewConversation} />
            </div>
            <div className={styles.chatdiv}>
                <h1>{isChatHistory ? <span className={styles.chathistory}>Conversation History</span> : "Bot AI"}</h1>

                {isAsked ? (
                    currentConversation.map((message, index) => (
                        <div className={styles.chatuis} key={index}>
                            <div className={styles.yourdiv}>
                                <img src={yourimg} alt="img" />
                                <div className={styles.yourinnerdiv}>
                                    <h6>You</h6>
                                    <p>{message.question}</p>
                                    <span>{message.timestamp}</span>
                                </div>
                            </div>
                            <div className={styles.yourdiv}>
                                <img src={logo2} alt="img" />
                                <div className={styles.yourinnerdiv}>
                                    <h6>Bot Ai</h6>
                                    <p>{message.response}</p>

                                    <div className={styles.likedislikebtn}>
                                        <span>{message.timestamp}</span>
                                        <button onClick={() => handleFeedback(index, "like")}>
                                            <ThumbUp className={styles.feedbackIcons} />
                                        </button>
                                        <button onClick={() => handleFeedback(index, "dislike")}>
                                            <ThumbDown className={styles.feedbackIcons} />
                                        </button>
                                    </div>
                                    {ratings.hasOwnProperty(index) && (
                                        <RatingForm
                                            rating={ratings[index]}
                                            onRatingChange={(rating) => handleRatingChange(index, rating)}
                                        />
                                    )}
                                    {message.feedback && (
                                        <div className={styles.feedbackText}>
                                            <p>
                                                <span>Feedback</span>: {message.feedback}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <div>
                            <h4 className={styles.logoh2chatdiv}>How Can I Help You Today?</h4>
                            <img src={logo2} alt="" className={styles.logoimgchatdiv} />
                        </div>
                        <div className={styles.sampleaiquemaindiv}>
                            <div className={styles.sampleaique}>
                                <h3>Hi, what is the weather</h3>
                                <span>Get immediate AI generated response</span>
                            </div>
                            <div className={styles.sampleaique}>
                                <h3>Hi, what is the temperature</h3>
                                <span>Get immediate AI generated response</span>
                            </div>
                            <div className={styles.sampleaique}>
                                <h3>Hi, what is my location</h3>
                                <span>Get immediate AI generated response</span>
                            </div>
                            <div className={styles.sampleaique}>
                                <h3>Hi, how are you</h3>
                                <span>Get immediate AI generated response</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.inputbardiv}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleAsk}>Ask</button>
                    <button onClick={handleSave}>Save</button>
                </div>

                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={styles.modalBox}>
                        <h4>Provide your feedback</h4>
                        <TextField
                            label="Feedback"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={dislikeFeedback}
                            onChange={(e) => setDislikeFeedback(e.target.value)}
                            fullWidth
                        />
                        <Button
                            onClick={handleModalSubmit}
                            variant="contained"
                            color="primary"
                            className={styles.modalsubmitbtn}
                        >
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}
