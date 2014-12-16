var fXiAvr;
var fYiAvr;
var aXi, aYi, iSumPowXi, iSumPowYi;
var iSumXi, iSumYi, iLxx, iLxy, iLyy, iN;

function fnRun() {
	aXi = fnGetA(document.getElementById("ta1").value);
	aYi = fnGetA(document.getElementById("ta2").value);
	//console.log(aXi);
	iN = aXi.length;
	if (iN !== aYi.length) {
		alert("Something Wrong!  xi.length!=yi.length");
	}
	iSumXi = fnGetSum(aXi);

	iSumYi = fnGetSum(aYi);
	iSumPowXi = fnGetPowSum(aXi);

	iSumPowYi = fnGetPowSum(aYi);
	fXiAvr = iSumXi / iN;
	fYiAvr = iSumYi / iN;

	fnGetL();
	var fB = iLxy / iLxx;
	var fA = fYiAvr - fB * fXiAvr;
	//var aYiM=new Array();

	var iU = 0;
	for (i = 0; i < iN; i++) {
		iU += Math.pow((fA + fB * aXi[i] - fA - fB * fXiAvr), 2);
	}
	var fQ = iLyy - Math.pow(iLxy, 2) / iLxx;
	var fR = iLxy / Math.pow(iLxx * iLyy, 0.5);
	var fF = (iU / 1) / (fQ / (iN - 1 - 1));
	alert("相关系数检验r=" + fR + "\n" + "F检验" + fF);


}

function fnGetSum(pa) {
	var sum = 0;
	for (i = 0; i < pa.length; i++) {
		sum += parseFloat(pa[i]);
	}
	return sum;
}

function fnGetPowSum(pa) {
	var sum = 0;
	for (i = 0; i < pa.length; i++) {
		sum += Math.pow(pa[i], 2);
	}
	return sum;
}

function fnGetA(pStr) {
	return pStr.split("\n");
}

function fnGetL() {
	iLxx = iSumPowXi - iN * fXiAvr * fXiAvr;
	iLyy = iSumPowYi - iN * fYiAvr * fYiAvr;
	var iTmp = 0;
	for (i = 0; i < iN; i++) {
		iTmp += aXi[i] * aYi[i];
	}
	iLxy = iTmp - iN * fXiAvr * fYiAvr;
}