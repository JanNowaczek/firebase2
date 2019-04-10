import React from 'react'
import moment from 'moment'
import 'moment/locale/pl'

import { database } from '../firebaseConf'

moment.locale('pl')

class Chat extends React.Component {
    state = {
        messages: null,
        newMessageText: '',
    }

    componentDidMount() {
        database.ref('/JFDDL7/messages')
            .on(
                'value',
                (snapshot) => {
                    this.setState({
                        messages: snapshot.val(),
                    })
                }
            )
    }

    onNewMessageTextChange = event => this.setState({
        newMessageText: event.target.value
    })

    onSendClick = () => {
        const newMessage = {
            text: this.state.newMessageText,
            date: Date.now(),
            author: 'Jasiek Nowaczek',
        }
        fetch('https://ad-snadbox.firebaseio.com/JFDDL7/messages.json',
            {
                method: 'POST',
                body: JSON.stringify(newMessage)
            }
        )
    }





    render() {
        return (
            <div>
                <div>
                    <input
                        value={this.state.newMessageText}
                        onChange={this.onNewMessageTextChange}
                    />
                    <button
                        onClick={this.onSendClick}
                    >
                        WYŚLIJ!
              </button>
                </div>
                {
                    this.state.messages &&
                    Object.entries(this.state.messages)
                        .map(
                            ([key, message]) => (
                                <div
                                    key={key}
                                >
                                    <div>
                                        <b>{message.author}</b>
                                    </div>
                                    <div>
                                        {moment(message.date).fromNow()}
                                    </div>
                                    <div>
                                        {message.text}
                                    </div>
                                </div>
                            )
                        )
                }
            </div>
        )
    }
}

export default Chat