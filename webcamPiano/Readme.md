================
**Webcam piano**
================

**Marking rubric**
Step 1 - [1 point]: Renaming of backImg to prevImg has taken place.

Step 2 - [2 points]: Frame differencing implemented by moving prevImg around.

Step 3 - [2 points]: Learner has included Grid.js correctly and grid activates with movement.

Step 4 - [2 points]: Learner has included blur in order to reduce the amount of noise that activates the grid.

Step 5 - [2 points]: Learner has scaled down images processed (currImg, diffImg) so that the sketch runs fast after blurring has slowed it down.

Step 6 - [3 points]: How much has the learner extended the sketch? Learner has included comments about the extension and shows understanding of techniques learnt throughout the course.

**Ideas for further development:**
Customize the graphics. In Grid.js you could customize the base grid of graphics thinking about color, opacity or shape. Can you make use of noteState to drive different effects that change over time after the note has been activated?

Trigger secondary graphics effects or animations when an active note is drawn. Can you include rules that only trigger the effects sometimes, perhaps making use of noise or randomness?

Implement the core p5.js sound library to play sounds depending on which “note” in the grid is activated. You should read and use the p5.js documentation about starting the audio context on user interaction to make sure your audio works across all browsers.

Implement a custom “Note” class that is used in Grid.js. Instead of an array of values for noteSize, notePos and noteState you would have an array of notes. Think about what parameters you would need for the Note constructor method and what other methods the Note class would need, both the methods needed to adapt the existing functionality from the Grid.js code and any custom methods you would like to add.

========================
**Further development**
========================

- I have customized the note graphics by changing the color, opacity, stroke and adding extra circles around the touch note. Whenever the note is touched the circles will expand and fade out. It gives a touched effect to the note.

- I have added a note sound effects. Whenever the note is touched, the sound will play but first, the user needs to activate the sound by clicking on the checkbox of soundOn. The sound will play for 0.5 seconds and then stop. The sound is triggered by the noteState.

- I have added a customizable DAT GUI where we can modify the threshold, gradient of note, and we can activate/deactivate sound effects.
