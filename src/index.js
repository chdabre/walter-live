var uuidV1 = require('uuid/v1')
var cards = require('./cards.js')

var express = require('express')
var path = require('path')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

const PORT = process.env.PORT || 3000;

const MAX_PLAYER_COUNT = 8

let clients = []
let rooms = {}

//Static file declaration
app.use(express.static(path.join(__dirname, '../walter-host/dist')))

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../walter-host/dist')))
  app.use('/client', express.static(path.join(__dirname, '../walter-client/dist')))
  
  app.get('/client/*', (req, res) => {
    res.sendfile(path.join(__dirname, '../walter-client/dist/index.html'))
  })
  app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '../walter-host/dist/index.html'))
  })
}

//build mode
app.get('/client/*', (req, res) => {
  res.sendfile(path.join(__dirname, '../walter-client/public/index.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../walter-host/public/index.html'))
})


app.get('/', (req, res) => {
  res.send('<h1>Hi!</h1>')
})

http.listen(PORT, () => {
  console.log('listening on *' + PORT)
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
      room.game.ended = true
      room.game.hostView = 'ScoreBoard'
      room.game.clientView = 'noContent'
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

  socket.on('finishRound', (msg) => {
    let roomId = msg.roomId
    let room = rooms[roomId]
    let currentRound = room.game.rounds[room.game.currentRound]
    let sphinxId = room.game.currentRound
    
    currentRound.sentences.forEach(sentence => {
      let sphinxPoints = 0

      sentence.votes.forEach(vote => {
        if (vote.vote === sphinxId) {
          console.log(`[finishRound] Sphinx ${room.players[sphinxId].name} Points +1`)
          console.log(`[finishRound] Player ${room.players[vote.vote].name} Points +1`)
          sphinxPoints++
          room.players[vote.vote].points++
        }
        else {
          console.log(`[finishRound] Player ${room.players[vote.vote].name} Points +1`)
          room.players[vote.vote].points++
        }
      })

      if (sphinxPoints < room.players.length) {
        console.log(`[finishRound] Sphinx ${room.players[sphinxId].name} gets ${sphinxPoints} Points.`)
        room.players[sphinxId].points += sphinxPoints
      } else {
        console.log(`[finishRound] All Players voted for Sphinx ${room.players[vote.vote].name}. They get 0 Points.`)
      }
    })

    room.game.hostView = 'ScoreBoard'
    room.game.clientView = 'noContent'

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
      ended: false,
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
