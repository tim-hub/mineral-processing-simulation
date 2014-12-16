
//声明数组，用于储存各组数据
var lDTX = new Array();
var num = 0;
var q1 = 0;
var q2 = 0;
var r1 = 0;
var r2 = 0;
var seg1 = 0;
var seg2 = 0;
var gA = 0;
var gK = 0;
var lB = 0;
var lN = 0;

function run() {
    lDTX = returnLD();

    num = returnNum();
    var xSum = 0;
    var y1Sum = 0;
    var y2Sum = 0;
    var xFangSum = 0;

    var y1FangSum = 0;
    var y2FangSum = 0;
    var x1Y1Sum = 0;
    var x2Y2Sum = 0;
    for (i = 0; i < num; i++) {

        var x = lDTX[i].getX1();
        var y1 = lDTX[i].getY1();
        var y2 = lDTX[i].getY2();
        xSum += x;

        y1Sum += y1;
        y2Sum += y2;
        xFangSum += Math.pow(x, 2);
        y1FangSum += Math.pow(y1, 2);
        y2FangSum += Math.pow(y2, 2);
        x1Y1Sum += x * y1;
        x2Y2Sum += x * y2;

    }
    var xAv = xSum / num;
    var x1Av = xAv;
    var x2Av = xAv;
    var y1Av = y1Sum / num;
    var y2Av = y2Sum / num;
    var lX1X1 = xFangSum - num * xAv * xAv;
    var lX2X2 = lX1X1;
    var lY1Y1 = y1FangSum - num * y1Av * y1Av;
    var lY2Y2 = y2FangSum - num * y2Av * y2Av;
    var lX1Y1 = x1Y1Sum - num * x1Av * y1Av;
    var lX2Y2 = x2Y2Sum - num * x2Av * y2Av;
    var b1 = lX1Y1 / lX1X1;
    var a1 = y1Av - b1 * x1Av;
    var b2 = lX2Y2 / lX2X2;
    var a2 = y2Av - b2 * x2Av;
    //反变换
    //高登
    gA = Math.pow(Math.E, a1);
    gK = b1;
    //confirm(gA+" "+gK);
    //洛辛
    lB = Math.pow(Math.E, a2);
    lN = b2;
    //console.log(lB+" "+lN);

    //y^ 计算
    LD.prototype.getY1M = function(gA, gK, xj) {

        return 100 - gA * Math.pow(xj, gK);
    };
    LD.prototype.getY2M = function(lB, lN, xj) {
        return 100 * Math.pow(Math.E, -1 * lB * (Math.pow(xj, lN)));
    };

    //检验精度  
    //r

    r1 = lX1Y1 / (Math.pow(lX1X1 * lY1Y1, 0.5));
    r2 = lX2Y2 / (Math.pow(lX2X2 * lY2Y2, 0.5));


    //Q剩余平方和
    for (i = 0; i < lDTX.length; i++) {

        var x = lDTX[i].getX();
        var y = lDTX[i].getY();

        var y1M = lDTX[i].getY1M(gA, gK, x);
        var tmp = 100 - gA * Math.pow(x, gK);

        var y2M = lDTX[i].getY2M(lB, lN, x);

        q1 += Math.pow(y - y1M, 2);
        q2 += Math.pow(y - y2M, 2);
    }


    //segma 剩余均方
    seg1 = Math.pow(q1 / (num - 2), 0.5);
    seg2 = Math.pow(q2 / (num - 2), 0.5);





    outputTable();
}



//获取实验数据数量

function returnNum() {
    //return prompt("输入数据组数");

    return lDTX.length;
}

//获取实验数据

function returnLD() {

    var t = document.getElementById("ta1").value;

    var s = 0;
    var x = 0;

    var arr = new Array();
    for (i = 0; i < t.length; i++) {
        if (t.charAt(i) === " " && i < t.length) {
            var tmp = (t.substring(x, i));
            arr[s] = tmp;
            x = i + 1;
            s++;

        }
    }



    var rArr = new Array();
    var flag = 0;
    for (i = 0; i < arr.length; i += 2) {
        rArr[flag] = new LD(parseFloat(arr[i]), parseFloat(arr[i + 1]));
        flag++;
    }

    return rArr;
}

function LD(x, y) {
    var x = x;
    var y = y;
    var x1 = Math.log(x);
    var x2 = x1;
    var y1 = Math.log(100 - y);
    var y2 = Math.log(Math.log(100 / y));
    this.getX1 = function() {
        return x1;
    };
    this.getX2 = function() {
        return x2;
    };
    this.getX = function() {
        return x;
    };
    this.getY1 = function() {
        return y1;
    };
    this.getY2 = function() {
        return y2;
    };
    this.getY = function() {
        return y;
    };

}
outputTable();

function outputTable() {
    tableCreate();
}

function tableCreate() {
    var di = document.getElementById("d");
    var t = document.createElement("table");
    t.border = 1;
    //head
    var tr1 = document.createElement("tr");
    var head1 = document.createElement("th");
    head1.appendChild(document.createTextNode("筛孔x"));
    var head2 = document.createElement("th");
    head2.appendChild(document.createTextNode("筛上物累积产率y"));
    var head3 = document.createElement("th");
    head3.appendChild(document.createTextNode("x1=x2=ln(x)"));
    var head4 = document.createElement("th");
    head4.appendChild(document.createTextNode("y1=ln(100-y)"));
    var head5 = document.createElement("th");
    head5.appendChild(document.createTextNode("y2=ln(ln(100/y))"));
    var head6 = document.createElement("th");
    head6.appendChild(document.createTextNode("高斯公式：y1M"));
    var head7 = document.createElement("th");
    head7.appendChild(document.createTextNode("高斯公式：(y1M-y)^2"));
    var head8 = document.createElement("th");
    head8.appendChild(document.createTextNode("洛辛-拉姆勒公式:y2M"));
    var head9 = document.createElement("th");
    head9.appendChild(document.createTextNode("洛辛-拉姆勒公式-(y2M-y)^2"));
    tr1.appendChild(head1);
    tr1.appendChild(head2);
    tr1.appendChild(head3);
    tr1.appendChild(head4);
    tr1.appendChild(head5);
    tr1.appendChild(head6);
    tr1.appendChild(head7);
    tr1.appendChild(head8);
    tr1.appendChild(head9);
    t.appendChild(tr1);
    //head over
    var trArray = new Array();
    for (i = 0; i < lDTX.length; i++) {
        var tr = t.insertRow();

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getX()));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getY()));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getX1()));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getY1()));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getY2()));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getY1M(gA, gK, lDTX[i].getX())));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(Math.pow(lDTX[i].getY1M(gA, gK, lDTX[i].getX()) - lDTX[i].getY(), 2)));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(lDTX[i].getY2M(lB, lN, lDTX[i].getX())));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(Math.pow(lDTX[i].getY2M(lB, lN, lDTX[i].getX()) - lDTX[i].getY(), 2)));

    }
    di.appendChild(t);

    di.appendChild(document.createTextNode("相关系数" + r1 + "    " + r2 + '\n'));
    di.appendChild(document.createTextNode("剩余平方和" + q1 + "    " + q2 + '\n'));
    di.appendChild(document.createTextNode("剩余均方" + seg1 + "    " + seg2 + '\n'));
}