import React from 'react';
import SockJsClient from 'react-stomp';

export default function WebSocketClient({
                                            props,
                                            autoReconnect = true,
                                            setAnswers
                                        }) {


    const headers = {
        "X-Authorization": "Bearer " + props.jwtToken
    };

    const onConnect = () => {
        console.info("Connected at " + new Date());

    };

    const onMessage = (data) => {
        console.log("This part not getting triggered!!!")
        let tempAnswers = JSON.parse(data.content).map(question => question.map(ans => JSON.parse(ans)));
        console.log(tempAnswers);
        setAnswers(tempAnswers)
    };

    const onDisconnect = () => {
        console.log("Disconnected");
    }

    const onConnectFailure = () => {
        console.log("Connection failed");
    }

    return (
        <SockJsClient
            url={process.env.REACT_APP_URL + "/stomp"}
            topics={[props.topic]}
            headers={headers}
            subscribeHeaders={headers}
            onConnect={onConnect}
            onMessage={onMessage}
            onDisconnect={onDisconnect}
            onConnectFailure={onConnectFailure}
            autoReconnect={autoReconnect}
        />
    );
};
