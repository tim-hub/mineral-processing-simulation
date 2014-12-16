Mineral Processing Simulation
=

##About

These 4 plugins are tests on the class. For that time, I learned some knowledge about Javascript, and the Professor Tao let us use any language to write these codes. So I choose Javascript with Sublimetext2, and my classmates use VB 6.0 .  And you know, I finish the test earlier. 

##Gravity Separation Simuation
This program is written for simulating gravity separation. Input the cube and dust ore mineral's date, and get the separation density.

Input Date like:
```
23.74 5.76
47.56 10.11
9.39 19.31
3.28 28.75
2.10 38.96
13.93 80.18
```
left column is percentage, right is ash percentage.


##Interpolation
You know, when you get the original data, maybe the data is not too much to use, so you need find the date's form, and use some model to interpolation.

##Simple Linear Rgression Analysis
This is a program to analyze the 2 variables' relation. To verify xi and yi 's relation from the date about x and y you get.

##Particle Size Analysis
This is just a small program to analyze the screening date. And output a table.

##How to use
Just download th js file, and use it in your web. Or you can see the html example, but the html exampe is in Chinese.

##Notice
These programs are based on some coal preparation and model knowledge, and read the source code before useing.
  
#中文

##简介
这是4个在大学课堂上写得程序，这4个程序是课程的最终测验。因为教学安排里安排的是VB，所以多数人使用VB进行编写，不过，由于我当时正在学JavaScript， 就申请了用js完成。

##重选分选模拟
这个小程序是用来模拟计算重选的输出结果，输入分选前块矿、粉矿资料，输入要求精煤灰分值（最小5%），对重选终分选密度进行计算。
输入就像：

```
23.74 5.76
47.56 10.11
9.39 19.31
3.28 28.75
2.10 38.96
13.93 80.18
```
左侧为产率，右侧为灰分，均为百分数。

##插值
在数据处理时，常常会遇到一个问题，原始数据量不足，这时，需要用到一些方法、模型，在现有数据趋势下，进行插值。

程序选用了三种插值模型：线性插值、三点插值、拉格朗日插值模型。可在插值时，进行选择，
如图：
![interpolation](/interpolation/example.png)

##线性回归分析
利用最小二乘法,对现有数据进行分析。


##粒度分析
分析粒度资料。使用高登-安德列夫公式及洛辛-拉姆勒公式。
对应《选矿过程模拟与优化》14页，例2-1。


##使用
插入到网页中即可使用

##提醒
不过，这其中描述可能并不是很详尽，一是因为，这是一门单独的课程涉及煤炭分选以及模型分析知识，二是，课程上有一些相关书籍、资料，如果能获得课程相关资料，可能会更容易理解这几个小程序的作用及使用。

建议使用前阅读源代码，加深理解。
