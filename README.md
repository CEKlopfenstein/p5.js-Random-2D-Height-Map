# Random Terrain Generation Experiments
## What is Being Used and Why
The P5.js framework for Javascript is being used because of it's ease of use and because
of the graphical functions it provides. It was also chosen due to ability only need a
browser to run the programs. Though I later needed a web server to get the complete
functionality. In the furture I may transfer this to another language, Possibly Java 8
for better preformance. Though for now Javascript and P5.js are working just fine for
prototypeing. Even if run times are a bit high.
## Branches
### Master
My plan is to leave the master as a templete of sorts. A base case with the basic classes
and methods I want in every experiment. Such as the basic Cell class and mapSet class. It
also contains the files needed for P5.js.
### Point-Fall
This is my current project. The idea is that you have a 2D array of heights. You pick a
number of these scattered around the map and set them to the max height. Then you set all
neigboring points to the high points to a lower value. Repeating this process until they
hit the lower limit. Giving you your height map. Point-Fall acts as the master branch of
this generation idea. With a few relating branches. [Plans](#8)
##### Speed-Opt
This branch is related to **Point-Fall** and was used as a testing ground to find faster ways
of generating the height values in same general way as Point-Fall.

Branches that are off of Speed-Opt are:
1. **blockOut**
   - This the main idea tested here was to section of the map and do the calculations for one part of the map at a time. Turned out to be faster and more consistent then the same calculations without the blocking.
2. **finalFormat**
   - This was a cleaned up version fo blockOut that was used for the final merge back into Point-Fall.
3. **topToBottom**
   - The idea with this one was to set the heights one level at a time. So first we would loop though and set the max heights and record where the next changes would happen. Repeating the process until the lowest height was reached. While it did have more consistent timings then blockOut and the original way it took far longer. Doubling the time it took for simple maps to be made and exponsionally increasing from there. So it was abandoned.

Related Issues:
1. [Top to Bottom](#3)
2. [Block it out.](#2)

##### Color-Test
This branch is also related to **Point-Fall** and was a testing ground for what colors where
used in the 2D map. Nothing more nothing less. Was later merged. Though it may be used again for more testing.

Related Issues:
1. [Color Idea for Later](#4)


##### 3dPointfallDemo
This branch is related to Point-Fall but never be merged with **Point-Fall**. This is as a
result of this it being just what it says on the tin. It is a demo and was made simply as a
test and demonstaion. And while it looks ok I would prefer not have to use it all the time.
It will be used from time to time to see how the map looks in 3D but it will not become the
 main project. This is because I would rather not develop some of the ideas I have for
 **Point-Fall** in 3D right off the bat and then have to touble shoot it in 3D.

 Related Issues:
 1. [3D Demo Plans](#9)
