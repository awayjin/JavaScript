function LCS(ch1, ch2) {
    let max=0;
    let sign=0;

    let length1 = ch1.length;
    let length2 = ch2.length;
    let mat = new Array(length1);


    for(let i=0;i<length2;i++){
        for(let j=length1-1;j>=0;j--){
            if(ch2[i]==ch1[j]){
                if(i==0 || j==0){
                    mat[j]=1;
                    if(max==0){
                        max=1;
                        sign=j;
                    }       
                }

                else{
                    mat[j]=mat[j-1]+1;
                    if(mat[j]>max){
                        max=mat[j];
                        sign=j;
                    }
                }       
            }
            else{
                mat[j]=0;
            }
        }
    }

    //console.log("sign:", sign);
    //console.log("max:", max);

    let startPos = sign - max + 1;
    return ch1.substr(startPos, max);
}

function getLCSL1(s1, s2, isFirst) {
    let originStrList = [];
    let newStrList    = [];

    let cs1 = LCS(s1, s2);
    //console.log("str1:", s1);
    //console.log("str2:", s2);
    //console.log("cs1:", cs1);

    let index1 = s1.indexOf(cs1);
    let index2 = s2.indexOf(cs1);

    originStrList.push({
        position: 0,
        value: s1.substr(0, index1),
        status: 0
    });
    originStrList.push({
        position: index1,
        value: cs1,
        status: 1
    });
    originStrList.push({
        position: index1 + cs1.length,
        value: s1.substring(index1 + cs1.length),
        status: 0
    });

    newStrList.push({
        position: 0,
        value: s2.substr(0, index2),
        status: 0 // 不同
    });
    newStrList.push({
        position: index2,
        value: cs1,
        status: 1, // 相同
        isFirst: isFirst
    });
    newStrList.push({
        position: index2 + cs1.length,
        value: s2.substring(index2 + cs1.length),
        status: 0
    });

    return [originStrList, newStrList];
}

export function getLCSL2(str1, str2, returnHTML) {
    let result = [];
    let arr = getLCSL1(str1, str2, true);
    //console.log("first:", arr);

    let oldStr = arr[0];
    let newStr = arr[1];

    if (oldStr[0].value == '' || newStr[0].value == '') {
        result.push(newStr[0]);
    } else {
        let arr2 = getLCSL1(oldStr[0].value, newStr[0].value, false);
        //console.log("pre:", arr2);
        result = result.concat(arr2[1]);
    }

    result.push(newStr[1]);

    if (oldStr[2].value == '' || newStr[2].value == '') {
        result.push(newStr[2]);
    } else {
        let arr2 = getLCSL1(oldStr[2].value, newStr[2].value, false);
        //console.log("after:", arr2);
        result = result.concat(arr2[1]);
    }

    for(let i=0; i<result.length; i++) {
        if (result[i].isFirst) {
            if (result[i+1].value == '') {
                if (i+2 < result.length) {
                    result[i+2].status = 0;
                }
            }
        }
    }

    if (returnHTML) {
        let html = '';
        for(var i=0; i<result.length; i++) {
            if (result[i].value) {
                if (result[i].status == 1) {
                    html += result[i].value;
                } else {
                    html += '<span style="color:red">' + result[i].value + '</span>';
                }
            }
        }

        return html;
    }

    return result;
}