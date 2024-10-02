import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Chat.module.scss';
import SendIcon from '@mui/icons-material/Send';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { showErrorMessage } from '../Notification/Index';

const cx = classNames.bind(Styles);

function Index() {
    const [showConvo, setShowConvo] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8082/notification/ws');
        const client = Stomp.over(socket);

        client.connect(
            {
                Authorization:
                    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGUiOiJBRE1JTiBQUk9DVE9SIiwiaXNzIjoiZGFpQjIwMTQ2NDdAU3R1ZGVudC5jdHUuZWR1LnZuIiwiZXhwIjoxNzI3NDI3NjQ2LCJpYXQiOjE3Mjc0MjQwNDYsImp0aSI6ImJhNmE0NTY3LTA1NTctNGRjNy1iMDM3LWRhZjg5ODFhMmJmNCJ9.vMjBcFphLg22gZxcLJsMQetEMbyyZ5e3seI2E1bM9wnrye7ps0tbuEjUoOWfU4kj27YI2LLGn1W6IVbuHpwDlQ',
            },
            () => {
                if (client.connected) {
                    setStompClient(client);
                    client.subscribe('/topic/messages', (message) => {
                        const receivedMessage = JSON.parse(message.body);
                        setMessages((prevMessages) => {
                            if (!prevMessages.some((msg) => msg.timestamp === receivedMessage.timestamp)) {
                                return [...prevMessages, receivedMessage];
                            }
                            return prevMessages;
                        });
                    });
                }
            },
        );

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, []);

    const handleShowConvo = () => {
        setShowConvo((prev) => !prev);
    };
    const sendMessage = () => {
        if (message.trim() && stompClient?.connected) {
            const chatMessage = {
                nickname,
                content: message,
            };
            stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
            setMessage('');
        } else {
            showErrorMessage('Lỗi khi kết nối');
        }
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('chat-button')} onClick={handleShowConvo}>
                <div className={cx('chat-button-white')}></div>
                <img
                    src="https://vcdn.subiz-cdn.com/widget-v4/public/assets/img/bubble_default.7d5e4ab.svg"
                    alt="chat"
                />
            </div>
            {showConvo && (
                <div className={cx('wrapper-container')}>
                    <div className={cx('content')}>
                        {messages.length === 0 ? (
                            <div className={cx('empty')}>
                                <div className={cx('empty-icon')}></div>
                                <div className={cx('empty-text')}>Gửi một tin nhắn để bắt đầu hội thoại!</div>
                            </div>
                        ) : (
                            <List>
                                {messages.map((msg, index) => (
                                    <ListItem key={index}>
                                        {msg.nickname === nickname ? (
                                            <div className={cx('message-right')}>
                                                <ListItemText
                                                    secondary={
                                                        <Typography className={cx('message')}>{msg.content}</Typography>
                                                    }
                                                />
                                                <ListItemAvatar>
                                                    <Avatar className={cx('avatar')}>{msg.nickname.charAt(0)}</Avatar>
                                                </ListItemAvatar>
                                            </div>
                                        ) : (
                                            <div className={cx('message-left')}>
                                                <ListItemAvatar>
                                                    <Avatar className={cx('avatar')}>{msg.nickname.charAt(0)}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    secondary={
                                                        <Typography className={cx('message')}>{msg.content}</Typography>
                                                    }
                                                />
                                            </div>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </div>
                    <div className={cx('message-input')}>
                        <TextField
                            placeholder="Enter your nickname"
                            value={nickname}
                            onChange={handleNicknameChange}
                            autoFocus
                        />
                        <TextField
                            placeholder="Type a message"
                            value={message}
                            onChange={handleMessageChange}
                            fullWidth
                        />
                        <div className={cx('operation')}>
                            <div className={cx('emoji')}></div>
                            <div className={cx('send-file')}></div>
                            <div className={cx('icon-send')}>
                                <SendIcon disabled={!message.trim()} onClick={sendMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Index;
