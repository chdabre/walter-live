gameState = {
    users: [
        {
            name: 'Hans',
            handicapPoints: 0
        }
    ],
    game: {
        rounds: [ // Count: users.length
            {
                sphinxId: 0, // User ID
                card: [ // Count: 3
                    {
                        question: 'What is _WALTER_ times _WALTER_?',
                        answerFormat: '{0} times {1}',
                        answers: {
                            0: { // Key is user Id
                                terms: ['one', 'two']
                            }
                        },
                        votes: {
                            0: { // Key is user Id
                                forUserId: 0
                            }
                        }
                    }
                ],
                points: {
                    0: { // Key is user Id
                        points: 0
                    }
                }
            }
        ]
    }
}

/* CREATE USER */
'userHandshake', (msg) => {
    let newUser = {
        socket,
        name: msg.name,
        handicapPoints: 0
    }

    gameState.users.push(newUser)
}


function getUserId(socket) {
    return gameState.users.findIndex(user => user.socket === socket)
}