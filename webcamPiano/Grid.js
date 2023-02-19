var polySynth = new p5.PolySynth()
var notes = [
  ['C4', 'E4', 'G4'],
  ['D4', 'F4', 'A4'],
  ['E4', 'G4', 'B4'],
  ['F4', 'A4', 'C5'],
  ['G4', 'B4', 'D5'],
  ['A4', 'C5', 'E5'],
  ['B4', 'D5', 'F5'],
  ['C5', 'E5', 'G5'],
  ['D5', 'F5', 'A5'],
  ['E5', 'G5', 'B5'],
  ['F5', 'A5', 'C6'],
  ['G5', 'B5', 'D6'],
  ['A5', 'C6', 'E6'],
  ['B5', 'D6', 'F6'],
  ['C6', 'E6', 'G6'],
  ['D6', 'F6', 'A6'],
]

class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w
    this.gridHeight = _h
    this.noteSize = 40
    this.noteOriginalPos = []
    this.notePos = []
    this.noteState = []

    // initalise grid structure and state
    for (var x = 0; x < _w; x += this.noteSize) {
      var posColumn = []
      var stateColumn = []
      for (var y = 0; y < _h; y += this.noteSize) {
        posColumn.push(
          createVector(x + this.noteSize / 2, y + this.noteSize / 2)
        )
        stateColumn.push(0)
      }
      this.noteOriginalPos.push(posColumn)
      this.noteState.push(stateColumn)
    }
    this.notePos = this.noteOriginalPos
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels()
    this.findActiveNotes(img)
    this.drawActiveNotes(img)
  }
  /////////////////////////////////
  drawActiveNotes(img) {
    // draw active notes
    fill(255)
    noStroke()
    for (var i = 0; i < this.notePos.length; i++) {
      for (var j = 0; j < this.notePos[i].length; j++) {
        var x = this.notePos[i][j].x
        var y = this.notePos[i][j].y

        // draw note
        if (this.noteState[i][j] > 0) {
          var alpha = this.noteState[i][j] * 200
          var c1 = color(
            params.color1[0],
            params.color1[1],
            params.color1[2],
            alpha
          )
          var c2 = color(
            params.color2[0],
            params.color2[1],
            params.color2[2],
            alpha
          )
          var mix = lerpColor(c1, c2, map(i, 0, this.notePos.length, 0, 1))

          // notes touch effect circle
          push()
          noFill()
          var opacity = map(this.noteState[i][j], 0, 1, 0, 255)
          stroke(mix, opacity)
          // map the size of the effect circle according to the noteState
          var effectCircleSize = map(this.noteState[i][j], 1, 0, 40, 100)
          ellipse(x, y, effectCircleSize, effectCircleSize)
          noStroke()
          fill(255, 255, 255, opacity * 0.15)
          ellipse(x, y, effectCircleSize * 1.5, effectCircleSize * 1.5)
          pop()

          // notes main circle
          push()
          fill(mix)
          var s = this.noteState[i][j]
          ellipse(x, y, this.noteSize * s, this.noteSize * s)
          pop()

          // mapping grid position to note position in the array
          var noteX = floor(map(x, 0, this.gridWidth, 0, 15))
          var noteY = floor(map(y, 0, this.gridHeight, 0, 3))

          // play note
          this.playNotes(noteX, noteY)
        }
        this.noteState[i][j] -= 0.05
        this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1)
      }
    }
  }
  /////////////////////////////////
  findActiveNotes(img) {
    for (var x = 0; x < img.width; x += 1) {
      for (var y = 0; y < img.height; y += 1) {
        var index = (x + y * img.width) * 4
        var state = img.pixels[index + 0]
        if (state == 0) {
          // if pixel is black (ie there is movement)
          // find which note to activate
          var screenX = map(x, 0, img.width, 0, this.gridWidth)
          var screenY = map(y, 0, img.height, 0, this.gridHeight)
          var i = int(screenX / this.noteSize)
          var j = int(screenY / this.noteSize)
          this.noteState[i][j] = 1
          this.notePos[i][j] = this.noteOriginalPos[i][j]
        }
      }
    }
  }

  /////////////////////////////////
  // play notes using the polySynth
  playNotes(noteX, noteY) {
    var note = notes[noteX][noteY]
    let vel = 0.1
    let dur = 0.5
    polySynth.play(note, vel, 1, dur)
  }
}
