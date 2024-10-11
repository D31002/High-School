import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Chat.module.scss';
import SendIcon from '@mui/icons-material/Send';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { showErrorMessage } from '../../../../Component/Notification/Index';
import { useSelector } from 'react-redux';
import { authUser, userToken } from '../../../../redux/selectors';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Index({ classRoom }) {
    const { id } = useParams();
    const user = useSelector(authUser);
    const token = useSelector(userToken);
    const [showConvo, setShowConvo] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const navigate = useNavigate();
    const messageListRef = useRef();

    const fetchMessages = async (page) => {
        console.log('load page : ', page);
        try {
            const response = await fetch(
                `http://localhost:8082/notification/pl/getMessages/${id}?page=${page}&pageSize=10`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            const data = await response.json();
            setTotalPages(data.result.totalPages);
            setHasMore(page < data.result.totalPages);
            setMessages((prevMessages) => {
                const newMessages = (data?.result?.data).reverse();
                return Array.isArray(newMessages) ? [...newMessages, ...prevMessages] : prevMessages;
            });
            setHasLoaded(true);
        } catch (error) {
            showErrorMessage('Lỗi khi tải tin nhắn');
        }
    };

    useEffect(() => {
        if (showConvo && token && id) {
            if (!hasLoaded) {
                fetchMessages(page);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showConvo, id, token]);

    const connectWebSocket = () => {
        if (token && id) {
            const socket = new SockJS('http://localhost:8082/notification/ws');
            const client = Stomp.over(socket);

            client.connect(
                { Authorization: `Bearer ${token}` },
                () => {
                    if (client.connected) {
                        setStompClient(client);
                        client.subscribe(`/topic/messages/${id}`, (message) => {
                            const receivedMessage = JSON.parse(message.body);
                            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                        });
                    }
                },
                (error) => {
                    showErrorMessage('Lỗi khi kết nối');
                    navigate('/login');
                },
            );
        }
    };

    const disconnectWebSocket = () => {
        if (stompClient && stompClient.connected) {
            stompClient.disconnect();
            setStompClient(null);
        }
    };

    useEffect(() => {
        if (showConvo) {
            connectWebSocket();
        } else {
            disconnectWebSocket();
        }

        return () => {
            disconnectWebSocket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showConvo, token, id]);

    useEffect(() => {
        if (messageListRef.current && showConvo) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, showConvo]);

    const handleScroll = () => {
        const { scrollTop } = messageListRef.current;
        if (scrollTop === 0 && hasMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchMessages(nextPage);
                return nextPage;
            });
        }
    };

    useEffect(() => {
        const messageContainer = messageListRef.current;
        if (messageContainer) {
            messageContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (messageContainer) {
                messageContainer.removeEventListener('scroll', handleScroll);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore, totalPages]);

    const handleShowConvo = () => {
        setShowConvo((prev) => !prev);
    };

    const sendMessage = () => {
        if (stompClient?.connected) {
            if (message.trim()) {
                const chatMessage = {
                    classRoomId: id,
                    userProfileId: user?.userProfileResponse?.id,
                    content: message,
                };
                stompClient.send(`/app/chat`, { Authorization: `Bearer ${token}` }, JSON.stringify(chatMessage));
                setMessage('');
            }
        } else {
            showErrorMessage('Lỗi khi kết nối');
            navigate('/login');
        }
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
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
                    <div className={cx('header')}>Đây là nhóm chat của lớp: {classRoom?.name}</div>
                    <div className={cx('content')} ref={messageListRef}>
                        {messages?.length === 0 ? (
                            <div className={cx('empty')}>
                                <div className={cx('empty-icon')}></div>
                                <div className={cx('empty-text')}>Gửi một tin nhắn để bắt đầu hội thoại!</div>
                            </div>
                        ) : (
                            <>
                                {messages?.map((msg, index) => {
                                    const isFirstMessageFromUser =
                                        index === 0 ||
                                        msg?.userProfileResponse?.id !== messages[index - 1]?.userProfileResponse?.id;

                                    return (
                                        <div className={cx('list-messages')}>
                                            {msg?.userProfileResponse?.id === user?.userProfileResponse?.id ? (
                                                <div className={cx('message-right')}>
                                                    <div className={cx('message')}>
                                                        {msg?.content}
                                                        <div className={cx('time')}>{msg.time}</div>
                                                    </div>

                                                    <div className={cx('avatar-container')}>
                                                        {isFirstMessageFromUser && (
                                                            <img
                                                                className={cx('avatar')}
                                                                src={
                                                                    msg.userProfileResponse.imageUrl
                                                                        ? msg.userProfileResponse.imageUrl
                                                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                              msg?.userProfileResponse?.fullName,
                                                                          )}&background=007bff&color=fff&size=40`
                                                                }
                                                                alt={msg?.userProfileResponse?.fullName}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={cx('message-left')}>
                                                    <div className={cx('avatar-container')}>
                                                        {isFirstMessageFromUser && (
                                                            <img
                                                                className={cx('avatar')}
                                                                src={
                                                                    msg.userProfileResponse.imageUrl
                                                                        ? msg.userProfileResponse.imageUrl
                                                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                              msg?.userProfileResponse?.fullName,
                                                                          )}&background=007bff&color=fff&size=40`
                                                                }
                                                                alt={msg?.userProfileResponse?.fullName}
                                                            />
                                                        )}
                                                    </div>

                                                    <div className={cx('message')}>
                                                        {isFirstMessageFromUser && (
                                                            <div className={cx('username')}>
                                                                {msg?.userProfileResponse.fullName}
                                                            </div>
                                                        )}
                                                        {msg?.content}
                                                        <div className={cx('time')}>{msg.time}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                    <div className={cx('message-input')}>
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Nhập tin nhắn"
                            value={message}
                            onChange={handleMessageChange}
                            spellCheck={false}
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
