import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user';
import chatReducer from './reducers/chat';

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  }
})

export default store;