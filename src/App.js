import React from 'react'

import { database } from './firebaseConf'

const courseRef = database.ref('JFDDL7')

courseRef.once(
    'value'
)
    .then(snapshot => console.log(snapshot.val()))

const App = (props) => (
    <div>
        App
    </div>
)

export default App
