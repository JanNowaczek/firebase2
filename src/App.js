import React from 'react'

import { database } from './firebaseConf'

const result = database.ref('/JFDDL7').on(
    'value',
    snapshot => console.log(snapshot.val())
)

console.log(result)

const App = (props) => (
    <div>
        App
    </div>
)

export default App
