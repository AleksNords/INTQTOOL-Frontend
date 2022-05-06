import React from 'react';
import SockJsClient from 'react-stomp';

/**
 * Helper component used to provide websocket functionality
 * @param props
 * @param autoReconnect bool used to determine whether the client should auto reconnect when disconnected
 * @param onMessageReceived function used when a message is received
 * @returns client which provides websocket functionality
 */
export default function WebSocketClient({
                                            props,
                                            autoReconnect = true,
                                            onMessageReceived: onMessageReceived
                                        }) {


    const headers = {
        "X-Authorization": "Bearer " + props.jwtToken
    };

    const onConnect = () => {
        console.info("Connected at " + new Date());

    };

    const onMessage = (data) => {
        onMessageReceived(data)
    };

    return (
        <SockJsClient
            url={process.env.REACT_APP_URL + "/stomp"}
            topics={[props.topic]}
            headers={headers}
            subscribeHeaders={headers}
            onConnect={onConnect}
            onMessage={onMessage}
            autoReconnect={autoReconnect}
        />
    );
};
