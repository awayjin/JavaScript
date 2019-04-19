/**
 * JavaScript快速排序
 *@function quickSort
 *@param {array} arr是一个数组
 * */
var quickSort = function(arr){
    if(arr.length <=1){ return arr};
    var pivotIndex = Math.floor((arr.length)/2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left= [], right = [];

    for(var i=0; i<arr.length;i++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};
var arr = [99, 66,77,33,55,88,11,22,44];
alert(quickSort(arr))