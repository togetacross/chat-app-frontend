import React, { useState, useRef, useContext } from 'react';
import { WebSocketContext } from '../../context/WebSocket';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sendMessage } from '../../services/chatroom.service';
import ImageInput from '../Forms/ImageInput';
import CustomModal from './../Common/Modal/CustomModal';
import FilesView from '../Forms/FilesView';
import { faImages, faFaceGrinWide } from '@fortawesome/free-solid-svg-icons';
import FormButton from '../UI/FormButton';
import useHttp from '../../hooks/useHttp';

const NewMessage = () => {
    const [files, setFiles] = useState([]);
    const { room } = useSelector(state => state.chat);
    const ws = useContext(WebSocketContext);
    const [messageText, setMessageText] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const fileInputRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const [timer, setTimer] = useState(null)
    const { sendRequest, data, error, loading } = useHttp();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {

            Array.from(e.target.files).forEach(file => {
                if (files.find(image => image.name === file.name)) {
                    alert("Already exists: " + file.name);
                } else {
                    setFiles(prevState => [...prevState, file]);
                }
            });
            fileInputRef.current.value = "";
        }
    }

    // need ref fix after remove file
    const handleFileRemove = (name) => { setFiles(files.filter(file => file.name !== name));}
    const handlePickerClick = () => { setShowPicker(!showPicker); }
    const handleEmojiClick = (emoji) => { setMessageText(messageText + emoji.emoji); }
    const handleUploadClick = () => { fileInputRef.current?.click(); }

    const onChangeMessage = (e) => {
        setMessageText(e.target.value);
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            if (e.target.value.length > 0) {
                if (!isTyping) {
                    setIsTyping(true);
                    ws.sendType(true);
                }
            } else {
                setIsTyping(false);
                ws.sendType(false);
            }
            
        }, 1000);
        
        setTimer(newTimer);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateTime = new Date().toJSON();

        const newMessage = {
            chatRoomId: room.id,
            content: messageText,
            dateTime: dateTime
        };

        const multipart = new FormData();

        files.forEach((file) => {
            multipart.append('files', file);
        })

        multipart.append(
            'messageDetails',
            new Blob([JSON.stringify(newMessage)], { type: "application/json" })
        );

        sendRequest(sendMessage(multipart));
        setMessageText('');
        setFiles([]);
        setIsTyping(false);
        ws.sendType(false);
    }


    return (
        <div className="w-100 px-1">
            <CustomModal
                show={showPicker}
                title={'Emoji'}
                handleOnHide={handlePickerClick}
            >
                {showPicker &&
                    <div className='d-flex align-items-center justify-content-center'>
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            emojiVersion='3'
                            lazyLoadEmojis={true}
                            height={400} width={500}
                        />
                    </div>
                }

            </CustomModal>

            <FilesView
                files={files}
                onHandleFileRemove={handleFileRemove}
            />

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="message">

                    <Form.Control
                        style={{ resize: "none" }}
                        as="textarea"
                        name="message"
                        value={messageText}
                        onChange={onChangeMessage}
                        rows={2}
                        isInvalid={error}
                        placeholder={'Type your message'}
                    />

                    <div className="d-flex justify-content-end align-items-center py-1">
                        <FontAwesomeIcon className="text-white px-2" icon={faFaceGrinWide} onClick={handlePickerClick} size="xl" />
                        <FontAwesomeIcon className="text-white px-2" icon={faImages} size="xl" onClick={handleUploadClick} />
                        <ImageInput
                            onHandleImageChange={handleImageChange}
                            onFileInputRef={fileInputRef}
                        />

                        <FormButton
                            isLoading={loading}
                            btnText='Send'
                            size='sm'
                        />

                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NewMessage;