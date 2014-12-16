// 错误 没有用到分配曲线模型 需要思考这个问题 按选煤厂管理

var fRatio = 0.666666666;

//iM0 iM1   JiYuan HuiFEn QuJian
var fA = 10;

function fnGet(pStr) {
	var aTmp = new Array();
	var i = 0;
	var iNode = 0;
	var iStart = 0;
	var iLast = pStr.lastIndexOf("\n");
	while (iStart < iLast) {
		iNode = pStr.indexOf("\n", iStart);
		aTmp[i] = pStr.substring(iStart, iNode).split(" ");
		iStart = iNode + 1;
		i++;
	}
	aTmp[i] = pStr.substring(iStart, pStr.length).split(" ");

	for (j = 0; j < aTmp.length; j++) {
		if (j === 0) {
			aTmp[j].push(1.2);
		} else if (j === aTmp.length - 1) {
			aTmp[j].push(2.0);
		} else if (j === aTmp.length - 2) {
			aTmp[j].push(1.7);
		} else {
			aTmp[j].push(j / 10 + 1.25);
		}
	}

	return aTmp;

}

function fnRun() {
	fA = prompt("Ash Content of Clean Coal  /%(more than 5)");
	var aCube = fnGet(document.getElementById("ta1").value);

	var aDust = fnGet(document.getElementById("ta2").value);
	//console.log(aCube);
	var fM0 = 5;
	var fM1 = 65;
	var fLD;
	var fC1;
	var fC2;
	var fA1;
	var fA2;
	var fECube = 0.04;
	var fEDust = 0.06;
	var aCubeQuXian = fnGetQuXian(aCube, fECube);
	//console.log(aCubeQuXian);

	var aDustQuXian = fnGetQuXian(aDust, fEDust);
	//console.log(aDustQuXian);
	var aCubeProper = fnGetProper(aCubeQuXian);
	//console.log(aCubeProper);
	var aDustProper = fnGetProper(aDustQuXian);
	//console.log(aDustProper);

	var fGC;
	var fAC;
	var fG1;
	var fG2;
	var bFlag = true;

	do {
		fLD = (fM0 + fM1) / 2;
		fC1 = fnGetY(aCubeProper, fLD, 1);
		fC2 = fnGetY(aDustProper, fLD, 1);
		fA1 = fnGetY(aCubeProper, fLD, 2);
		fA2 = fnGetY(aDustProper, fLD, 2);
		fGC = (fC1 * fRatio + fC2) / (1 + fRatio);
		fAC = (fC1 * fA1 * fRatio + fC2 * fA2) / (1 + fRatio) / fGC;
		if (Math.abs(fA - fAC) > 0.1) {
			if (fAC > fA) {
				fM1 = fLD;
			} else {
				fM0 = fLD;
			}
		} else {
			fG1 = fnGetY(aCubeProper, fLD, 3);
			fG2 = fnGetY(aDustProper, fLD, 3);
			confirm("Cube Coal  :D1=" + fG1 + "\n" + "Dust Coal :D2=" + fG2);
			//"GC:"+fGC+"\n"+
			bFlag = false;
		}
	} while (bFlag);



}

function fnGetProper(pArr) {
	var aTmp = new Array();
	var fL, fG, fA, fD;
	for (i = 0; i < pArr.length - 1; i++) {
		fL = ((pArr[i + 1][0] * pArr[i + 1][1] - pArr[i][0] * pArr[i][1]) / (pArr[i + 1][0] - pArr[i][0]));
		fG = parseFloat((pArr[i][0] + (pArr[i + 1][0] - pArr[i][0]) / 2));
		fA = (pArr[i][0] * pArr[i][1] + (pArr[i + 1][0] * pArr[i + 1][1] - pArr[i][0] * pArr[i][1]) / 2) / fG;
		fD = pArr[i][2] + (pArr[i + 1][2] - pArr[i][2]) / 2;
		aTmp[i] = [fL, fG, fA, fD];

	}
	return aTmp;
}

function fnGetQuXian(pA, fE) {
	var fTmp;
	var fAshSum;
	var fX = 0;
	var fY = 0;
	var i = 0;
	var iD = 1.2;
	var aTmp = new Array();
	while (iD <= 1.81) {
		fTmp = 0
		fAshSum = 0;
		for (j = 0; j < pA.length; j++) {

			fX = 0.675 / fE * (pA[j][2] - iD) / Math.pow(2, 0.5);
			if (fX > 1.79) {
				fY = 1;
			} else if (fX < -1.79) {
				fY = 0;
			} else {
				fY = 0.5 + 0.5641895 * (fX - Math.pow(fX, 3) / 3 + Math.pow(fX, 5) / 10 - Math.pow(fX, 7) / 42 + Math.pow(fX, 9) / 216 - Math.pow(fX, 11) / 1320 + Math.pow(fX, 13) / 9360 - Math.pow(fX, 15) / 75600 + Math.pow(fX, 17) / 685440);
			}

			//console.log(fX);
			//console.log(fY);
			fTmp += parseFloat(pA[j][0] * (1 - fY));

			fAshSum += pA[j][0] * (1 - fY) * pA[j][1];
		}
		aTmp[i] = [fTmp, fAshSum / fTmp, iD];
		//console.log(aTmp[i]);
		i++;
		iD += 0.05;

	}
	return aTmp;
}

function fnGetY(pArr, fLD, iFlag) {
	var fX0, fX1, fX2, fY0, fY1, fY2;
	var iL = pArr.length;
	if (fLD <= pArr[1][0]) {
		fnSet(0);
	} else if (fLD >= pArr[iL - 2][0]) {
		fnSet(iL - 3);
	} else {
		for (i = 1; i < iL - 2; i++) {
			if (fLD >= pArr[i][0] && fLD < pArr[i + 1][0]) {
				if ((fLD - pArr[i][0]) < (pArr[i + 1][0] - fLD)) {
					fnSet(i - 1);

				} else {
					fnSet(i);
				}
				break;
			}
		}
	}

	function fnSet(iN) {
		fX0 = pArr[iN][0];
		fX1 = pArr[iN + 1][0];
		fX2 = pArr[iN + 2][0];
		fY0 = pArr[iN][iFlag];
		fY1 = pArr[iN + 1][iFlag];
		fY2 = pArr[iN + 2][iFlag];
	}

	return (fLD - fX1) * (fLD - fX2) / (fX0 - fX1) / (fX0 - fX2) * fY0 + (fLD - fX0) * (fLD - fX2) / (fX1 - fX0) / (fX1 - fX2) * fY1 + (fLD - fX0) * (fLD - fX1) / (fX1 - fX0) / (fX2 - fX1) * fY2;

}
/*
fnGetY.prototype.fnSet=function(iN){
	fX0=pArr[iN][0];
	fX1=pArr[iN+1][0];
	fX2=pArr[iN+2][0];
	fY0=pArr[iN][iFlag];
	fY1=pArr[iN+1][iFlag];
	fY2=pArr[iN+2][iFlag];
}
*/



/*
function fnGet(pArr,fLD,iFalg){
	this.iN;
	this.fLD=fLD;
	this.pArr=pArr;
	this.iFlag=iFlag;
	var iL=pArr.length;
	if(fLD<=pArr[1][0]){
		this.iN=0;
	}else if(fLD>=pArr[iL-2][0]){
		this.iN=iL-3;
	}else{
		for(i=1;i<n-2;i++){
			if(fLD>=pArr[i][0]&&fLD<pArr[i+1][0]){
				if((fLD-pArr[i][0])<(pArr[i+1][0]-fLD)){
					this.iN=i-1;

				}else{
					this.iN=i;
				}
				break;
			}
		}
	}

	}
	return  (fLD - fX1) * (fLD - fX2) / (fX0 - fX1) / (fX0 - fX2) * fY0 + (fLD - fX0) * (fLD - fX2) / (fX1 - fX0) / (fX1 - fX2) * fY1 + (fLD - fX0) * (fLD - fX1) / (fX1 - fX0) / (fX2 - fX1) * fY2;


}
fnGet.prototype.fnSet=function(){
	this.fX0=pArr[this.iN][0];
	this.fX1=pArr[this.iN+1][0];
	this.fX2=pArr[this.iN+2][0];
	this.fY0=pArr[this.iN][iFlag];
	this.fY1=pArr[this.iN+1][iFlag];
	this.fY2=pArr[this.iN+2][iFlag];
}
*/