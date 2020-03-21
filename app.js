debug = true;
playerOne = true;
playerTwo = false;
playerOneActiveCharacter = "a"
playerTwoActiveCharacter = "a"
ping = ping



l = function(msg) {
  if (debug == true) {
    console.log(msg)
  }
}

console.log("App Running")


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Logic Devoted to Board and Player Manipulation /////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////



loadDefaultActivePlayerOnePlayer = function() {
  for (var x = 0; x < playerOneCharacters.length; x++) {
    if (playerOneCharacters[x]['status'] == "alive") {
      $(playerOneCharacters[x]['element']).addClass("active")
      return null
    }
  }
}

loadDefaultActivePlayerTwoPlayer = function() {
  for (var x = 0; x < playerTwoCharacters.length; x++) {
    if (playerTwoCharacters[x]['status'] == "alive") {
      $(playerTwoCharacters[x]['element']).addClass("active")
      return null
    }
  }
}

rotateActivePlayers = function(whichPlayer) {
  activePlayerArray = []

  if (whichPlayer == "playerOne") {
    for (var x = 0; x < playerOneCharacters.length; x++) {
      if (playerOneCharacters[x]['status'] == "alive") {
        activePlayerArray.push(playerOneCharacters[x])
      }
    }
  }

  if (whichPlayer == "playerOne") {
    for (var x = 0; x < activePlayerArray.length; x++) {
      if (activePlayerArray[x]['character'] == playerOneActiveCharacter) {
        if (activePlayerArray[x + 1] == undefined) {
          nextPlayerPosition = 0
        } else {
          nextPlayerPosition = x + 1
        }

        currentElement = activePlayerArray[x]['element']
        nextElement = activePlayerArray[nextPlayerPosition]['element']

      }
    }
    $(currentElement).removeClass("active")
    $(nextElement).addClass("active")
    playerOneActiveCharacter = activePlayerArray[nextPlayerPosition]['character']
  }

  if (whichPlayer == "playerTwo") {
    for (var x = 0; x < playerTwoCharacters.length; x++) {
      if (playerTwoCharacters[x]['status'] == "alive") {
        activePlayerArray.push(playerTwoCharacters[x])
      }
    }
  }

  if (whichPlayer == "playerTwo") {

    for (var x = 0; x < activePlayerArray.length; x++) {
      if (activePlayerArray[x]['character'] == playerTwoActiveCharacter) {

        if (activePlayerArray[x + 1] == undefined) {
          nextPlayerPosition = 0
        } else {
          nextPlayerPosition = x + 1
        }

        currentElement = activePlayerArray[x]['element']
        console.log(currentElement)
        nextElement = activePlayerArray[nextPlayerPosition]['element']

      }
    }
    $(currentElement).removeClass("active")
    $(nextElement).addClass("active")
    playerTwoActiveCharacter = activePlayerArray[nextPlayerPosition]['character']
  }

}




keyListen = function() {
  $(document).keyup(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
      e.preventDefault();
      if (playerOne == true) {
        rotateActivePlayers("playerOne")
      }
      if (playerTwo == true) {
        rotateActivePlayers("playerTwo")
      }
    }
    if (code == 39) { //Enter keycode
      e.preventDefault();
      console.log("Right")
      if (playerOne == true) {
        movePlayerButton(playerOneActiveCharacter, "e", "playerOne")
      }
      if (playerTwo == true) {
        movePlayerButton(playerTwoActiveCharacter, "e", "playerTwo")
      }
    }
    if (code == 40) { //Enter keycode
      e.preventDefault();
      console.log("Down")
      if (playerOne == true) {
        movePlayerButton(playerOneActiveCharacter, "s", "playerOne")
      }
      if (playerTwo == true) {
        movePlayerButton(playerTwoActiveCharacter, "s", "playerTwo")
      }
    }
    if (code == 37) { //Enter keycode
      e.preventDefault();
      console.log("Left")
      if (playerOne == true) {
        movePlayerButton(playerOneActiveCharacter, "w", "playerOne")
      }
      if (playerTwo == true) {
        movePlayerButton(playerTwoActiveCharacter, "w", "playerTwo")
      }
    }
    if (code == 38) { //Enter keycode
      e.preventDefault();
      console.log("Up")
      if (playerOne == true) {
        movePlayerButton(playerOneActiveCharacter, "n", "playerOne")
      }
      if (playerTwo == true) {
        movePlayerButton(playerTwoActiveCharacter, "n", "playerTwo")
      }
    }

  });

}

makeVisible = function(square) {
  squareId = "#" + square;
  $(squareId).removeClass("notVisible")
  $(squareId).addClass("visible")
}

makeInvisible = function(square) {
  squareId = "#" + square;
  $(squareId).removeClass("visible")
  $(squareId).addClass("notVisible")
}

placePlayer = function(player, square) {
  squareId = "#" + square;
  makeGunrange_true(square)
  $(squareId).html(player)
}

removePlayer = function(square) {
  squareId = "#" + square;
  $(squareId).html("")
}

makeGunrange_true = function(square) {
  squareId = "#" + square;
  $(squareId).removeClass("notGunrange")
  $(squareId).addClass("isGunrange")
}

makeGunrange_false = function(square) {
  squareId = "#" + square;
  $(squareId).removeClass("isGunrange")
  $(squareId).addClass("notGunrange")
}

removeRanges = function() {
  for (i = 0; i < board.length; i++) {
    board[i]['playerOneGunrange'] = false
    board[i]['playerTwoGunrange'] = false
  }
}



loadBoard = function() {
  for (var i = 0; i < board.length; i++) {
    if (playerOne == true) {
      if (board[i]['playerOneVisible'] == false) {
        makeInvisible(board[i]['elementId'])
      }
      if (board[i]['playerOneVisible'] == true) {
        makeVisible(board[i]['elementId'])
      }
      if (board[i]['playerOneGunrange'] == true) {
        makeGunrange_true(board[i]['elementId'])
      }
      if (board[i]['playerOneGunrange'] == false) {
        makeGunrange_false(board[i]['elementId'])
      }
      if (board[i]['playerOnePlayer'] != null) {
        placePlayer(board[i]['playerOnePlayer'], board[i]['elementId'])
      }
    }
    if (playerTwo == true) {
      if (board[i]['playerTwoVisible'] == false) {
        makeInvisible(board[i]['elementId'])
      }
      if (board[i]['playerTwoVisible'] == true) {
        makeVisible(board[i]['elementId'])
      }
      if (board[i]['playerTwoGunrange'] == true) {
        makeGunrange_true(board[i]['elementId'])
      }
      if (board[i]['playerTwoGunrange'] == false) {
        makeGunrange_false(board[i]['elementId'])
      }
      if (board[i]['playerTwoPlayer'] != null) {
        placePlayer(board[i]['playerTwoPlayer'], board[i]['elementId'])
      }
    }
  }
}

getEastRangeSquares = function(square, numSquares, whichPlayer) {
  squareArray = square.split("_")
  squareLetter = squareArray[0]
  squareNum = parseFloat(squareArray[1])

  for (var a = squareNum; a < squareNum + numSquares; a++) {
    squareString = squareLetter + "_" + a.toString()

    for (var b = 0; b < board.length; b++) {
      if (board[b]['elementId'] == squareString) {
        if (whichPlayer == "playerOne") {
          board[b]['playerOneGunrange'] = true
          board[b]['playerOneVisible'] = true
        }
        if (whichPlayer == "playerTwo") {
          board[b]['playerTwoGunrange'] = true
          board[b]['playerTwoVisible'] = true
        }
      }
    }
  }
}

getWestRangeSquares = function(square, numSquares, whichPlayer) {
  squareArray = square.split("_")
  squareLetter = squareArray[0]
  squareNum = parseFloat(squareArray[1])

  for (var c = squareNum; c > squareNum - numSquares; c--) {
    squareString = squareLetter + "_" + c.toString()

    for (var d = 0; d < board.length; d++) {
      if (board[d]['elementId'] == squareString) {
        if (whichPlayer == "playerOne") {
          board[d]['playerOneGunrange'] = true
          board[d]['playerOneVisible'] = true

        }
        if (whichPlayer == "playerTwo") {
          board[d]['playerTwoGunrange'] = true
          board[d]['playerTwoVisible'] = true

        }
      }
    }
  }
}

getDownRangeSquares = function(square, numSquares, whichPlayer) {
  squareArray = square.split("_")
  row = squareArray[0]
  squareNum = parseFloat(squareArray[1])
  var alphabet = "abcdefghijklmnopqrstuvwxyz"
  var rowPosition = alphabet.search(row)
  var row = alphabet[rowPosition]

  if (whichPlayer == "playerOne") {
    miniArray = []
    for (var i = 0; i < numSquares; i++) {
      squareLetterPosition = alphabet.search(row) + i
      squareLetter = alphabet[squareLetterPosition]
      squareString = squareLetter + "_" + squareNum.toString()
      for (var d = 0; d < board.length; d++) {
        if (board[d]['elementId'] == squareString) {
          if (whichPlayer == "playerOne") {
            board[d]['playerOneGunrange'] = true
            board[d]['playerOneVisible'] = true

          }
          if (whichPlayer == "playerTwo") {
            board[d]['playerTwoGunrange'] = true
            board[d]['playerTwoVisible'] = true
          }
        }
      }
    }
  }
  if (whichPlayer == "playerTwo") {
    miniArray = []
    for (var i = 0; i < numSquares; i++) {
      squareLetterPosition = alphabet.search(row) - i
      squareLetter = alphabet[squareLetterPosition]
      squareString = squareLetter + "_" + squareNum.toString()
      for (var d = 0; d < board.length; d++) {
        if (board[d]['elementId'] == squareString) {
          if (whichPlayer == "playerOne") {
            board[d]['playerOneGunrange'] = true
            board[d]['playerOneVisible'] = true

          }
          if (whichPlayer == "playerTwo") {
            board[d]['playerTwoGunrange'] = true
            board[d]['playerTwoVisible'] = true
          }
        }
      }
    }
  }
}



paintRange = function(player, square, whichPlayer) {
  pRanges = playerSettings[player]
  getEastRangeSquares(square, pRanges['eastrange_radius'], whichPlayer)
  getWestRangeSquares(square, pRanges['westrange_radius'], whichPlayer)
  getDownRangeSquares(square, pRanges['downrange_radius'], whichPlayer)
}

addPlayerToBoard = function(player, square, whichPlayer) {
  for (var z = 0; z < board.length; z++) {
    if (board[z]['elementId'] == square) {
      board[z]['hasPlayer'] = true;
      if (whichPlayer == "playerOne") {
        board[z]['playerOnePlayer'] = player
      }
      if (whichPlayer == "playerTwo") {
        board[z]['playerTwoPlayer'] = player
      }
    }
  }
}

removePlayerFromBoard = function(player, square, whichPlayer) {
  for (var z = 0; z < board.length; z++) {
    if (board[z]['elementId'] == square) {
      board[z]['hasPlayer'] = false;
      if (whichPlayer == "playerOne") {
        board[z]['playerOnePlayer'] = null
      }
      if (whichPlayer == "playerTwo") {
        board[z]['playerTwoPlayer'] = null
      }

      sqString = "#" + square
      sq = $(sqString)
      sq.html("")

    }
  }
}

processPlayers = function() {
  for (var x = 0; x < board.length; x++) {
    board[x]['playerOneGunrange'] = false
    board[x]['playerTwoGunrange'] = false
  }

  for (var x = 0; x < board.length; x++) {
    if (board[x]['hasPlayer'] == true) {
      if (board[x]['playerOnePlayer'] != null) {
        paintRange(board[x]['playerOnePlayer'], board[x]['elementId'], "playerOne")
      }
      if (board[x]['playerTwoPlayer'] != null) {
        paintRange(board[x]['playerTwoPlayer'], board[x]['elementId'], "playerTwo")
      }
    }
  }

}

movePlayerButton = function(player, direction, whichPlayer) {
  numMatches = 0
  for (var f = 0; f < board.length; f++) {
    if (whichPlayer == "playerOne") {
      if (board[f]['playerOnePlayer'] == player) {
        numMatches = numMatches + 1
        var currentSquare = board[f]['elementId']
        var newSquare = squareJoystick(currentSquare, direction)
      }
    }
    if (whichPlayer == "playerTwo") {
      if (board[f]['playerTwoPlayer'] == player) {
        numMatches = numMatches + 1
        var currentSquare = board[f]['elementId']
        var newSquare = squareJoystick(currentSquare, direction)
      }
    }
  }

  makeMove(player, currentSquare, newSquare, whichPlayer)


}

movePlayer = function(player, startSquare, endSquare, whichPlayer) {
  removePlayerFromBoard(player, startSquare, whichPlayer);
  addPlayerToBoard(player, endSquare, whichPlayer)
  processPlayers()
  loadBoard()
}

squareJoystick = function(square, direction) {
  var alphabet = "abcdefghijklmnopqrstuvwxyz"
  var outString = ""
  var sq = square.split("_")
  var row = sq[0]


  if (direction == "e") {
    var col = parseFloat(sq[1]) + 1
    outString = row + "_" + col
  }
  if (direction == "w") {
    var col = parseFloat(sq[1]) - 1
    outString = row + "_" + col
  }
  if (direction == "s") {
    var col = sq[1]
    var rowPosition = alphabet.search(row) + 1
    var row = alphabet[rowPosition]
    outString = row + "_" + col
  }
  if (direction == "n") {
    var col = sq[1]
    var rowPosition = alphabet.search(row) - 1
    var row = alphabet[rowPosition]
    outString = row + "_" + col
  }

  return outString
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Gameplay / Turn Logic///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

sharePing = function() {
  // This is the function where you share the ping with the other player. This is simulated for now. 
  console.log(ping)
}

showMoveCount = function() {
  var mvs = ping['movesRemaining']
  $("#movesCount").html(mvs)
}

showActivePlayer = function() {
  var activePlayer = ping['activePlayerTurn']
  if (activePlayer == "playerOne") {
    $("#activePlayer").html("Player One")
  } else {
    $("#activePlayer").html("Player Two")
  }
}

showDeadOrAlive = function() {
  for (var i = 0; i < playerOneCharacters.length; i++) {
    if (playerOne == true) {
      str = playerOneCharacters[i]['displayName']
    } else {
      str = "???"
    }
    if (playerOneCharacters[i]['status'] == "alive") {
      str = str + "<span class='badge badge-pill badge-success'>Alive</span>"
      var elm = playerOneCharacters[i]['element']
      $(elm).html(str)
    }
    if (playerOneCharacters[i]['status'] == "dead") {
      str = str + "<span class='badge badge-pill badge-danger'>Dead</span>"
      var elm = playerOneCharacters[i]['element']
      $(elm).html(str)
    }
  }
  for (var i = 0; i < playerTwoCharacters.length; i++) {
    if (playerTwo == true) {
      str = playerTwoCharacters[i]['displayName']
    } else {
      str = "???"
    }
    if (playerTwoCharacters[i]['status'] == "alive") {
      str = str + "<span class='badge badge-pill badge-success'>Alive</span>"
      var elm = playerTwoCharacters[i]['element']
      $(elm).html(str)
    }
    if (playerTwoCharacters[i]['status'] == "dead") {
      str = str + "<span class='badge badge-pill badge-danger'>Dead</span>"
      var elm = playerTwoCharacters[i]['element']
      $(elm).html(str)
    }
  }

}

isValidSquare = function(square) {
  var sq = $(square).html()
  if (sq == undefined) {
    return false
  } else {
    return true
  }
}

makeMove = function(player, startSquare, endSquare, whichPlayer) {

  var ssValid = isValidSquare("#" + startSquare)
  var esValid = isValidSquare("#" + endSquare)


  if (ssValid == true && esValid == true) {
    ////
    ping['movesRemaining'] = ping['movesRemaining'] - 1
    if (ping['movesRemaining'] > 0) {

      movePlayer(player, startSquare, endSquare, whichPlayer)
      ping['lastMove'] = {
        "player": player,
        "startSquare": startSquare,
        "endSquare": endSquare,
        "whichPlayer": whichPlayer
      }
      gameHistory.push({
        "player": player,
        "startSquare": startSquare,
        "endSquare": endSquare,
        "whichPlayer": whichPlayer
      })


    }

    if (ping['movesRemaining'] == 0) {
      if (ping['activePlayerTurn'] == "playerOne") {
        playerOne = false
        playerTwo = true
        ping['activePlayerTurn'] = "playerTwo"
      } else {
        playerOne = true
        playerTwo = false
        ping['activePlayerTurn'] = "playerOne"
      }
      ping['movesRemaining'] = ping['movesPerTurn']
    }

    showMoveCount()
    showActivePlayer()
    sharePing()
    processPlayers()
    loadBoard()
    showDeadOrAlive()


    ////
  }

}



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Document Ready Logic ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
  playerOneCharacters = ping['playerOneCharacters']
  playerTwoCharacters = ping['playerTwoCharacters']

  showMoveCount()
  loadDefaultActivePlayerOnePlayer()
  loadDefaultActivePlayerTwoPlayer()
  processPlayers()
  loadBoard()
  showDeadOrAlive()

  keyListen()
})

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
