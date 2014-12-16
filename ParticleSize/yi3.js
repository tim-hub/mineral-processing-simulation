/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



var arr=new Array();
function run(){
    var t=document.getElementById("ta1").value;
   
   var  s=0;
    var x=0;
    
    var arr=new Array();
    for (i=0;i<t.length;i++){
        if (t.charAt(i)===" "){
       arr[s]=t.substring(x,i);
       x=i+1;
       s++;}
    }
    alert (arr);
}













if(ta.charAt[i]===" "&&flag===-1){
            sum+=1;
            arr[i]=ta.substring(start,i);
            start=i;
            flag=-flag;
        }
        if(ta.charAt[i]===" "&&flag===1){
            arr[i]=ta.substring(start,j);
            start=i;
            flag=-flag;
                
          
        }