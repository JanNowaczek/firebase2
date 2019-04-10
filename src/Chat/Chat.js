import React from 'react'

import { database } from '../firebaseConf'

class Chat extends React.Component{
    state = {
        messages: null,
    }

    componentDidMount(){
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

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default Chat