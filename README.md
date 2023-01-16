# chat-app-frontend

## Description

Hobby project for practise.

React frontend for chat application with basic boostrap style

## Preview
https://user-images.githubusercontent.com/62899422/212668776-f4e88124-28c9-41cb-9166-6489396efa31.mp4

## Technology
- React
- Redux
- Axios
- SocketJs
- React-Boostrap

## Features
- JWT Role based authentication for REST and Socket chanel
- Redux store convesrations initial details | current convesration users, messages
- Handle Socket chanel user acions: message, typing, like, join/leave/new conversation 
- Async requests to Rest endpoints for initial datas: conversations, last messages, users

## Launch
- backend: https://github.com/togetacross/chat-app-backend
- configure `BASE_API_SOCKET_URL & BASE_API_URL in ./util/constans`
- `npm start`

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
