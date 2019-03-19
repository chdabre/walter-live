var uuidV1 = require('uuid/v1')

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

const cards = [
  [
    "Wenn ich gut Arbeite, will ich auch gut bezahlt werden. Mit einer Ausnahme: _WALTERN_ würde ich auch gratis.",
    "Die am schwersten verkäufliche Massenware ist in der heutigen Zeit wohl _WALTER_.",
    "Lebte ich in Österreich, hätte ich bestimmt schon den Orden für _WALTER_ erhalten."
  ],
  [
    "Bei einem Mann schaue ich zuallererst auf sein(e/n) _WALTER_, bei einer Frau aber auf ihr(e/n) _WALTER_.",
    "Das dänische Sprichwort \"Kønnst meg dålø schørpfler i maåsker brælen\" will sagen: \"_WALTER_\".",
    "Wenn ich als Lebewesen unter der Erde leben müsste, wäre ich am liebsten _WALTER_."
  ],
  [
    "Wetten, dass ich euch alle zum Lachen bringen kann, indem ich _WALTERE_!?",
    "Wenn ich ein Brettspiel über mein Liebesleben herausgäbe, hiesse es _WALTER_.",
    "Ich fühle, dass ich in einem meiner früheren Leben eine Sagengestalt war, nämlich _WALTER_."
  ],
  [
    "_WALTER_ ist eine Krankheit, mit der ich ganz gut leben kann.",
    "Wenn kleine, grüne Wesen vom Mars vor meinem Haus landeten, ginge ich lächelnd auf sie zu und böte ihnen _WALTER_ zu essen an.",
    "Die heutigen Modeschöpferinnen arbeiten mit Farbkombinationen, die früher als \"unmöglich\" galten. Mir gefällt besonders _WALTER_."
  ],
  [
    "Der Name \"Pinguin\" stammt _WALTER_",
    "Ein Kompliment, das von mir stammen könnte: \"Schau, für dich ginge ich durch _WALTER_!\"",
    "Wenn ich mal auf einer noch unentdeckten Insel strande, könnte ich mir gut vorstellen, dass mich die Eingeborenen bald als Gott/Göttin des/der _WALTER_ verehren."
  ],
  [
    "Willst du jemanden loswerden? Sag ihm/ihr bloss: \"Mit dir ausgehen? Lieber würde ich _WALTER_!\"",
    "Im guten alten Wilden Westen mussten die Männer nichts als reiten und schiessen, und die Frauen mussten bloss _WALTERN_.",
    "Ich träume davon, eines Tages werde ein(e) _WALTER_ nach mir benannt."
  ],
  [
    "Eine Persönlichkeit, die ihr wohl alle schätzt, die in meinen Augen aber kaum mehr darstellt als eine farblose Schaufensterpuppe, ist _WALTER_.",
    "Mitverantwortlich für den versteckten Analphabethismus in unserem Land sind _WALTER_.",
    "Ich hätte Lust, jetzt auf der Stelle _WALTER_."
  ],
  [
    "An manchen Tagen bringe ich rein gar nichts zustande. Heute zum Beispiel habe ich nicht einmal _WALTER_.",
    "Frappant, wie _WALTER_ und _WALTER_ sich gleichen!",
    "Es klingt ein bisschen komisch... aber ich habe gelegentlich _WALTER_ im Eisschrank."
  ],
  [
    "Ich bin allergisch auf _WALTER_.",
    "Wenn ich graue Regenschirme bewerben müsste, wäre _WALTER_ mein Traum-Model.",
    "Ich denke daran, ein Bekanntschaftsinserat aufzugeben. Angesichts ihres Zielpublikums scheint mir dafür eine bestimmte Zeitschrift besonders geeignet: _WALTER_."
  ]
]

const MAX_PLAYER_COUNT = 8

let clients = []
let rooms = {}

app.get('/', (req, res) => {
  res.send('<h1>Hi!</h1>')
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})

io.on('connection', socket => {
  console.log('[connect] Socket Connected!')

  socket.on('init', (msg) => {
    let role = msg.role
    let roomId = msg.roomId
    let success = true

    if (role === 'host') {
      if (msg.createRoom) {
        roomId = createRoom()
        socket.emit('roomId', { context:'init', roomId })
        console.log(`[init] Created room with Id ${roomId}`)
      }

      if (roomId) {
        socket.join(`${roomId}-host`)
      }
    } else if (role === 'client') {
      if (roomId && rooms[roomId]) {
        socket.join(`${roomId}-client`)
      } else {
        socket.emit('err', {
          error:'RoomDoesNotExist',
          errorText: `The Room with Id ${roomId} does not exist (anymore)`
        }) 
        success = false
      }
    }

    if (success) {
      let newClient = {
        role,
        roomId,
        socket
      }
      clients.push(newClient)
      let clientId = clients.indexOf(newClient) 
      socket.join(`${roomId}`)
      socket.emit('clientId', { clientId })
      console.log(`[init] ${role} joined room with Id ${roomId}`)
  
      io.to(roomId).emit('roomUpdate', { context: 'init', room: rooms[roomId] })
    }
  })

  socket.on('createPlayer', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]

    if (room) {
      if (!room.game.playersReady) {
        if (room.players.length < MAX_PLAYER_COUNT) {
          let name = msg.name

          if (!room.players.find(player => player.name === name)) {
            let isGameLeader = room.players.length < 1
            let playerId = room.players.push(createPlayer(name, isGameLeader)) - 1
            
            socket.emit('playerId', { playerId })
            console.log(`[createPlayer] Create Player with Id ${playerId} in room with Id ${roomId}`)
          } else {
            socket.emit('err', { 
              errorType: 'NoDuplicateNames',
              errorText: `There is already a Player with the name ${name}.`
            })
          }
        } else {
          socket.emit('err', { 
            errorType: 'MaxPlayerCountExceeded',
            errorText: `Not more than ${MAX_PLAYER_COUNT} Players allowed.`
          })
          console.log(`[createPlayer] Max Player count exceeded for room Id ${roomId}`)
        }
      } else {
        socket.emit('err', { 
          errorType: 'RegistrationNotOpen',
          errorText: `The Game has already started.`
        })
      }

      io.to(roomId).emit('roomUpdate', { context: 'createPlayer', room })
    }
  })

  socket.on('startGame', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]
    
    if (room.players.length > 1) {
      room.game.playersReady = true
      room.game.clientView = 'SubmitHandicap'
    } else {
      socket.emit('err', { 
        errorType: 'MinimumPlayerAmountNotReached',
        errorText: `You need a minimum of 2 Players to start the game.`
      })
    }

    io.to(roomId).emit('roomUpdate', { context: 'startGame', room })
  })

  socket.on('submitHandicap', (msg) => {
    let roomId = msg.roomId
    let playerId = msg.playerId
    let room = rooms[roomId]
    
    room.players[playerId].handicap = msg.handicapPoints
    
    let ready = true
    room.players.forEach(player => {
      if (player.handicap < 0) ready = false
    })

    if (ready) { // All players have submitted their handicap
      room.game.clientView = 'NoContent'
      room.game.hostView = 'ScoreBoard'
    }

    io.to(roomId).emit('roomUpdate', { context: 'submitHandicap', room })
  })

  socket.on('nextCard', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]
    
    room.game.currentRound++
    if (room.game.currentRound > room.players.length - 1) {
      // Show final scores
    }

    room.game.rounds.push(createRound())
    room.game.hostView = 'RoundStart'

    io.to(roomId).emit('roomUpdate', { context: 'nextCard', room })
  })

  socket.on('showCues', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]

    room.game.hostView = 'ShowCues'
    room.game.clientView = 'SubmitAnswers'

    io.to(roomId).emit('roomUpdate', { context: 'showCues', room })
  })

  socket.on('submitAnswers', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]
    let playerId = msg.playerId
    let answers = msg.answers
    
    let sentences = room.game.rounds[room.game.currentRound].sentences
    for (let i = 0; i < sentences.length; i++) {
      sentences[i].answers[playerId] = answers[i]
    }

    let done = true
    let answerCount = 0
    sentences.forEach(sentence => {
      for (let p = 0; p < room.players.length; p++) {
        if (!sentence.answers[p]) done = false
        else answerCount++
      }
    })
    room.game.rounds[room.game.currentRound].answerCount = answerCount

    if (done) { // All Players have submitted their answers
      let allAnswersAnnotated = []
      sentences.forEach(sentence => {
        let answersAnnotated = []
        for (let i = 0; i < sentence.answers.length; i++) {
          answersAnnotated.push({
            playerId: i,
            answer: sentence.answers[i]
          })
        }
        let shuffledAnswers = answersAnnotated.slice(0)
        shuffle(shuffledAnswers)
        allAnswersAnnotated.push(shuffledAnswers)
      })
      
      room.game.rounds[room.game.currentRound].shuffledAnswers = allAnswersAnnotated

      room.game.hostView = 'ShowAnswers'
      room.game.clientView = 'SubmitVotes'
    }
    
    io.to(roomId).emit('roomUpdate', { context: 'submitAnswers', room })
  })

  socket.on('submitVote', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]
    let currentRound = room.game.rounds[room.game.currentRound]
    let playerId = msg.playerId
    let vote = msg.vote
    
    let sentences = currentRound.sentences
    sentences[currentRound.currentVoteStep].votes.push({
      playerId,
      vote
    })
    
    if (sentences[currentRound.currentVoteStep].votes.length >= room.players.length - 1) {
      currentRound.currentVoteStep++

      if (currentRound.currentVoteStep >= sentences.length) {
        room.game.hostView = 'ShowResults'
        room.game.clientView = 'noContent'
      }
    }

    io.to(roomId).emit('roomUpdate', { context: 'submitAnswers', room })
  })

  socket.on('roomUpdate', (msg) => {
    let roomId = msg.roomId
    if (roomId) {
      rooms[roomId] = msg.room
    }
  })

  socket.on('disconnect', () => {
    console.log(`[disconnect] Socket has disconnected`)
    client = clients.find(client => client.socket === socket)

    if (client && client.role === 'host') {
      console.log(`[disconnect] Host of room ${client.roomId} has disconnected, deleting room.`)
      delete rooms[client.roomId]
    }

    clients = clients.filter(c => c !== client)
  })
})

function createRoom () {
  let roomId = uuidV1()
  let room = {
    players: [],
    game: {
      clientView: 'WaitForPlayers',
      hostView: 'Home',
      playersReady: false,
      currentRound: -1,
      rounds: []
    }
  }
  
  rooms[roomId] = room
  return roomId
}

function createPlayer (name, isGameLeader) {
  return {
    name,
    isGameLeader,
    points: 0,
    handicap: -1
  }
}

function createRound () {
  let card = cards[cards.length * Math.random() | 0]
  let sentences = []
  card.forEach((template) => {
    sentences.push({
      template,
      answers: [],
      votes: []
    })
  })

  let round = {
    sentences,
    answerCount: 0,
    voteCount: 0,
    currentVoteStep: 0,
    shuffledAnswers: []
  }

  return round
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}