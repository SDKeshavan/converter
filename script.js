var solution="",solutionArr=[];
var solutionBoxCont = document.querySelector(".solution-cont");
var solutionBox = document.querySelector(".solution");

const infoCont = document.querySelector(".info-cont");
const infoBtn = document.querySelector(".info-btn-cont");

function eval(){
    var fromSys = document.getElementById("fromdd").value;
    var toSys = document.getElementById("todd").value;
    var input = document.getElementById("input").value;
    var outputBox = document.querySelector(".output");
    var output;
    solution = "";
    solutionArr = [];
    if(toSys == "bin"){
        var ans="";
        output = toBin(input,fromSys);   
        output = parseInt(output);
        solutionBox.innerHTML = solution;
        for(var i=solutionArr.length-1;i>=0;i--){
            solutionBox.innerHTML += `${solutionArr[i]}`;
        }
        solutionBoxCont.style.display ="block";
    }else if(toSys == "dec"){
        output = toDecimal(input,fromSys);
        solutionBox.innerHTML=solution;
        // for(var i=0;i<solutionArr.length;i++){
        //     solutionBox.innerHTML += `${solutionArr[i]}`;
        //     if(i!=solutionArr.length-1){
        //         solutionBox.innerHTML+=" + "
        //     }
        // }
        // solutionBox.innerHTML += ` = ${output}`;
        solutionBoxCont.style.display ="block";
    }else if(toSys == "oct"){
        output = toOctal(input,fromSys);
        solutionBox.innerHTML = solution;
        for(var i=0;i<output.length;i++){
            solutionBox.innerHTML += `'${output[i]}'`;
            if(i!=output.length-1){
                solutionBox.innerHTML+=" + "
            }
        }
        solutionBox.innerHTML += ` = ${output}`;
        solutionBoxCont.style.display ="block";
    }else{
        output = toHex(input,fromSys);
        solutionBox.innerHTML = solution;
        for(var i=0;i<output.length;i++){
            solutionBox.innerHTML += `'${output[i]}'`;
            if(i!=output.length-1){
                solutionBox.innerHTML+=" + "
            }
        }
        solutionBox.innerHTML += ` = ${output}`;
        solutionBoxCont.style.display ="block";
    }
    outputBox.innerHTML = output;
    console.log(output);
}

function swap(){
    var fromSys = document.getElementById("fromdd");
    var toSys = document.getElementById("todd");
    var temp;
    temp=fromSys.value;
    fromSys.value = toSys.value;
    toSys.value = temp;
}

function toHexArr(str){
    var i,temp;
    const arr=[];
    for(i=0;i<str.length;i++){
        if(isNaN(str[i])){
            temp = str.charCodeAt(i)-55;
        }else{
            temp = parseInt(str[i]);
        }
        arr.push(temp);
    }

    return arr;
}

function toDecimal(str,sys){
    var counter = 0;
    var ans=0;

    if(sys=="bin"){
       for(i=str.length-1;i>=0;i--){
            ans+=(parseInt(str[i])*(2**counter));
            solution = solution + `${str[i]} * 2<sup>${counter}</sup> = ${parseInt(str[i])*(2**counter)}<br>`;
            solutionArr.push(parseInt(str[i])*(2**counter));
            counter+=1;
        }
    }else if(sys=="oct"){
        for(i=str.length-1;i>=0;i--){
            ans+=(parseInt(str[i])*(8**counter));
            solution = solution + `${str[i]} * 8<sup>${counter}</sup> = ${parseInt(str[i])*(8**counter)}<br>`;
            solutionArr.push(parseInt(str[i])*(8**counter));
            counter+=1;
        }
    }else if(sys=="hex"){

        str = toHexArr(str);
        solution += `Convert all individual hex values to decimal equivalent first :<br>[${str}]<br>`;
        for(i=str.length-1;i>=0;i--){
            ans+=(parseInt(str[i])*(16**counter));
            solution = solution + `${str[i]} * 16<sup>${counter}</sup> = ${parseInt(str[i])*(16**counter)}<br>`;
            solutionArr.push(parseInt(str[i])*(16**counter));
            counter+=1;
        }
    }else{
        ans=str;
    }
    ans = ans.toString()

    for(var z=0;z<solutionArr.length;z++){
        console.log(solutionArr[z]);
        solution += `${solutionArr[z]}`;
        if(z!=solutionArr.length-1){
            solution += " + "
        }
    }

    solution += ` = ${ans}<br>`;
    return ans;
}



function toBin(str,sys){
    var bin="",substrlen,ans,i;
    var cal;
    
    if(sys=="dec"){
        var dec = parseInt(str);
        while(dec>0){
            cal=parseInt(dec%2);
            solution = solution + `${dec}/2 => Remainder =  ${cal}<br>`;
            solutionArr.push(cal);
            bin+=cal.toString();
            dec=parseInt(dec/2);
        }
        ans=bin;
        bin="";
        for(i=ans.length-1;i>=0;i--){
            bin+=ans[i];
        }
    }else if(sys=="oct" || sys =="hex"){

        if(sys=="oct"){
            substrlen=3;
        }else{
            substrlen=4;
            str = toHexArr(str);
            solution += `Convert all individual hex values to decimal equivalent first :<br>[${str}]<br>`;
        }
        var substr, nsubstr;
        for(i=0;i<str.length;i++){
            substr = toBin(str[i],"dec");
            if(substr.length<substrlen){
                nsubstr=""
                for(j=substr.length;j<substrlen;j++){
                    nsubstr+="0"
                }
                substr=nsubstr + substr;
            }
            solution = solution + `Binary Equivalent of ${str[i]} is ${substr}<br>`;
            bin =  bin + substr;
        }
    }else{
        bin = str;
    }
    return bin;
}

function toOctal(str,sys){
    var oct="",temp;
    if(sys=="dec"){
        var intStr = parseInt(str);
        while(intStr>0){
            temp = parseInt(intStr%8);
            oct=temp+oct;
            solution = solution + `${intStr}/8 => Remainder =  ${temp}<br>`;
            solutionArr.push(temp);
            intStr=parseInt(intStr/8);
        }
        return oct;
    }else if(sys=="bin"){
        var substr, k, j;
        solution += `Convert ${str} into substrings of length 3 from LSB.<br>`
        for(k=str.length-1;k>=2 && k>=0;k-=3){
            substr="";
            for(j=k-2;j<=k;j++){
                substr+=str[j];
            }
            solution += `Converting ${substr} to Decimal :<br>`;
            solutionArr = [];
            temp = toDecimal(substr,"bin");
            solutionArr.push(temp);
            solution +=  `decimal equivalent of ${substr} => ${temp}<br>`
            oct = temp + oct;
        }

        if(k>=0){
            substr="";
            while(k>=0){
                substr+=str[k];
                k-=1;
            }
            solution += `Converting ${substr} to Decimal :<br>`;
            solutionArr = [];
            temp = toDecimal(substr,"bin");
            solutionArr.push(temp);
            solution +=  `decimal equivalent of ${substr} => ${temp}<br>`
            oct=temp + oct;
        }
        
    }else if(sys == "hex"){
        
        var i,j,n,tempBin="",substr;
        str = toHexArr(str);
        solution += `First convert the given hex code to binary.<br>`
        tempBin += toBin(str,"hex");
        solution += `Convert ${tempBin} into substrings of length 4 from LSB.<br>`
        console.log(tempBin);
        for(i=tempBin.length-1;i>=2;i-=3){
            substr="";
            for(j=i-2;j<=i;j++){
                substr+=tempBin[j];
            }
            solution += `Converting ${substr} to Decimal :<br>`;
            solutionArr = [];
            n = toDecimal(substr,"bin");
            solution +=  `decimal equivalent of ${substr} => ${n}<br>`
            oct=n+oct;
        }

        if(i>=0){
            substr="";
            j=0;
            while(j<=i){
                substr+=tempBin[j];
                j++;
            }
            solution += `Converting ${substr} to Decimal :<br>`;
            solutionArr = [];
            n = toDecimal(substr,"bin");
            solution +=  `decimal equivalent of ${substr} => ${n}<br>`
            oct=n+oct;
        }
    }else{
        oct = str;
    }
    return oct;
}


function toHex(str,sys){
    var i,j,substr="",temp,hex="";
    
    if(sys == "dec"){
        
        temp = parseInt(str);
        while(temp>0){
            substr = parseInt(temp%16).toString();
            solution += `${temp}/16 => Remainder = ${substr}<br>`;
            temp=parseInt(temp/16);
            if(parseInt(substr)>=10){
                solution += `Since ${substr}>9 we convert it to hex code.<br>`;
                solution += `Hex code of ${substr} = `;
                substr = toHexCode(substr);
                solution += `${substr}<br>`;
            }
            hex=substr + hex;
        }

    }else if(sys == "bin"){
        solution += `First convert ${str} into substrings of length 4<br>`;
        for(i=0;i<str.length-3;i+=4){
            substr="";
            for(j=i;j<=i+3;j++){
                substr += str[j];
            }
            solution += `Converting ${substr} into its decimal equivalent :<br>`
            solutionArr = [];
            temp = toDecimal(substr,"bin"); 
            solution += `Decimal equivalent of ${substr} is ${temp}<br>`;
            
            if(temp>=10){
                solution += `Since ${temp}>9, convert it to hex code<br>Hex equivalent of ${temp} is `;
                temp = toHexCode(temp);
                solution += `${temp}<br>`;
            }
            hex+=temp;
        }

        substr="";

        if(i<str.length){
            while(i<str.length){
                substr+=str[i];
                i++;
            }
            solution += `Converting ${substr} into its decimal equivalent :<br>`;
            solutionArr = [];
            temp = toDecimal(substr,"bin");
            solution += `Decimal equivalent of ${substr} is ${temp}<br>`;
            hex+=temp;
        }
    }else if(sys == "oct"){
        var i,substr,temp="",temp2;
        solution += `First convert each octal to its binary equivalent.<br>`
        for(i=0;i<str.length;i++){
            solutionArr = [];
            substr = toBin(str[i],"oct");
            temp += substr;
        }

        solution += `Now convert the binary into substrings of length 4 and convert it to its hex value.<br>`

        for(i=temp.length-1;i>=3;i-=4){
            substr="";
            for(j=i-3;j<=i;j++){
                substr += temp[j];
            }
            solutionArr = [];
            temp2= toDecimal(substr,"bin");
            solution += `Decimal equivalent of ${substr} is ${temp2}<br>`;
            if(temp2>=10){
                temp2 = toHexCode(temp2);
            }
            hex = temp2 + hex;
        }

        if(i>=0){
            substr="";
            while(i>=0){
                substr=temp[i]+substr;
                solutionArr = [];
                temp2 = toDecimal(substr,"bin");
                solution += `Decimal equivalent of ${substr} is ${temp2}<br>`;
                i--;
            }
            if(temp2>=10){
                temp2 = toHexCode(temp2);
            }
            hex = temp2 + hex;
        }
        
    }else{
        hex = str;
    }

    return hex;
}

function toHexCode(str){
    var code;
    str=parseInt(str)
    code = String.fromCharCode(str+55);
    return code;
}

function info(){
    if(infoCont.style.display == "none"){
        infoCont.style.display = "grid";
        infoBtn.innerHTML = "&times;"
    }else{
        infoCont.style.display = "none";
        infoBtn.innerHTML = "i"
    }
}