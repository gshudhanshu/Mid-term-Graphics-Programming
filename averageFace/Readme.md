=================
**Average face**
=================

**Marking rubric**
Step 1 - [2 points]: Images loaded successfully using a for-loop (check code).

Step 2 - [1 point]: Face appears on the left, grey canvas on the right.

Step 3 - [1 point]: Image initialised correctly within setup() function (check code).

Step 4 - [1 point]: Images are looped over and loadPixels() is called on them.

Step 5 - [2 points]: Face appears on the left, and the right side of the canvas is red. Conversion from 2D to 1D coordinates has taken place (check code).

Step 6 - [2 points]: Average image appears on right side of the canvas.

Step 7 - [3 point]: Points awarded based on whether the solutions to the ideas for further development where correctly implemented.

**Ideas for further development:**
How would you change the code so that the image drawn on the left is a random face from the array of faces rather than just the first one, with a new random face selected using the keyPressed() function?

On mouse moved could you have the pixel values of the second image transition between the randomly selected image and the average image based on the mouseX value? HINT: Use the p5 lerp() function, read the documentation to understand what you need to do.

=======================
**Further development**
=======================
I have added a random face selection on key press and a transition between the average face and the random face on mouse move.

- You can select a random face by pressing any key.
- You can transition between the average face and the random face by moving the mouse left and right.
