import React from 'react'
import moment from 'moment'
import 'moment/locale/pl'

import { database } from '../firebaseConf'

moment.locale('pl')

const messagesRef = database.ref('/JFDDL7/messages')

class Chat extends React.Component {
    state = {
        messages: null,
        newMessageText: '',
    }

    componentDidMount() {
        messagesRef.on(
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

        messagesRef.push(newMessage)
    }

    onDeleteMessageClick = (key) => {
        fetch(
            'https://ad-snadbox.firebaseio.com/JFDDL7/messages/' + key + '.json',
            {
                method: 'DELETE',
            }
        )
    }

    componentWillUnmount(){
        messagesRef.off()
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
                                    onClick={() => this.onDeleteMessageClick(key)}
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