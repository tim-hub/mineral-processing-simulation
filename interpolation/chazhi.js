/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var yO1 = 0;
var yO2 = 0;
var u = 0;
var flag = 0;
var arr1 = new Array();
var arr2 = new Array();
var arr3 = new Array();

function Pro(calc) {

    this.start = function() {
        getTA();
        flag = getOption();
        u = prompt("输入X");
    };
    this.opCalc = function() {
        if (flag === 0) {
            calc(arr1, arr2, arr3);
        } else if (flag === 1) {
            calc(arr2, arr1, arr3);
        } else {
            calc(arr3, arr1, arr2);
        }
    };
    this.out = function() {
        outPut();
    };


}

function line() {

    function calc(arrX, arrY, arrZ) {
        /*if (u > arrX[arrX.length - 1] || u < arrX[0]) {
            alert("所输入u值超出自变量范围");
        } else */{
            for (i = 0; i < arrX.length - 1; i++) {

                if (u >= arrX[i] && u < arrX[i + 1]) {

                    x0 = arrX[i];
                    x1 = arrX[i + 1];

                    var yA0 = arrY[i];
                    var yA1 = arrY[i + 1];
                    var yB0 = arrZ[i];
                    var yB1 = arrZ[i + 1];
                    yO1 = getLineY(x0, yA0, x1, yA1);
                    //console.log(yO1);
                    yO2 = getLineY(x0, yB0, x1, yB1);

                }

            }
        }

        function getLineY(x0, y0, x1, y1) {


            return y0 * 1 + (y1 - y0) / (x1 - x0) * (u - x0);

        }

    }
    var linePro = new Pro(calc);

    linePro.start();
    linePro.opCalc();


    linePro.out();

}
//三点法、抛物线

function three() {
    function calc(arrX, arrY, arrZ) {
        var x0, x1, x2, yA1, yA0, yA2, yB0, yB1, yB2;
        var n = arrX.length;
        if (u <= arrX[1]) {
            x0 = arrX[0];
            x1 = arrX[1];
            x2 = arrX[2];
            setY(0);
            //console.log("<");
        } else if (u >= arrX[n - 2]) {
            x0 = arrX[n - 3];
            x1 = arrX[n - 2];
            x2 = arrX[n - 1];
            setY(n - 3);
            //console.log(">");
        } else {
            for (i = 1; i < n - 2; i++) {
                //此处不应循环应当从1开始
                if (u > arrX[i] && u <= arrX[i + 1]) {
                    if (u - arrX[i] < arrX[i + 1] - u) {
                        x0 = arrX[i - 1];
                        x1 = arrX[i];
                        x2 = arrX[i + 1];

                        setY(i - 1);
                    } else {
                        x0 = arrX[i];
                        x1 = arrX[i + 1];
                        x2 = arrX[i + 2];
                        setY(i);

                    }
                }
            }
            //console.log("_");
        }

        function setY(n) {
            yA0 = arrY[n];
            yA1 = arrY[n + 1];
            yA2 = arrY[n + 2];
            yB0 = arrZ[n];
            yB1 = arrZ[n + 1];
            yB2 = arrZ[n + 2];
        }

        function getThreeY(x0, x1, x2, y0, y1, y2) {
            return (u - x1) * (u - x2) / (x0 - x1) / (x0 - x2) * y0 + (u - x0) * (u - x2) / (x1 - x0) / (x1 - x2) * y1 + (u - x0) * (u - x1) / (x1 - x0) / (x2 - x1) * y2    
        }
        yO1 = getThreeY(x0, x1, x2, yA0, yA1, yA2);
        yO2 = getThreeY(x0, x1, x2, yB0, yB1, yB2);

    }
    var threePro = new Pro(calc);
    threePro.start();


    threePro.opCalc();
    threePro.out();



}

function lagrange() {
    function calc(arrX, arrY, arrZ) {
        var a = 1;
        var n = arrX.length;
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if (i !== j) {
                    a = a * (u - arrX[j]) / (arrX[i] - arrX[j]);
                    // console.log(a);
                }
            }

            yO1 += arrY[i] * a;
            yO2 += arrZ[i] * a;
            a = 1;
        }
    }
    var lPro = new Pro(calc);
    lPro.start();

    lPro.opCalc();
    lPro.out();
}

function getOption() {
    return document.getElementById("slt").selectedIndex;
}


function getTA() {
   
    var str1 = document.getElementById("ta1").value;
    var str2 = document.getElementById("ta2").value;
    var str3 = document.getElementById("ta3").value;
    arr1 = getArr(str1);
    arr2 = getArr(str2);
    arr3 = getArr(str3);
}

function getArr(str) {
    if (str.charAt(str.length - 1) !== " ") {
        str = str + " ";
    }
    var start;
    var tmpArr = new Array();
    var calc = 0;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) === " ") {
            tmpArr[calc] = str.substring(start, i);
            start = i + 1;
            calc++;
        }
    }
    return tmpArr;
}



function outPut() {
    var tmpS1 = "";
    var tmpS2 = "";
    if (flag === 0 || flag === 1) {
        tmpS2 = "平均密度" + yO2;
        if (flag === 0) {
            tmpS1 = "浮物累积产率" + yO1;
        }

    }
    if (flag === 1 || flag === 2) {
        tmpS1 = "灰分" + yO1;
        if (flag === 2) {
            tmpS2 = "浮物累积产率" + yO2;
        }
    }
    yO1 = 0;
    yO2 = 0;
    var tmpNode = document.createTextNode('\n' + tmpS1 + '\t' + tmpS2);
    var d = document.getElementById("d");
    d.appendChild(tmpNode);
}