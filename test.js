// function getMaxSubSum(arr) {
//     var maxSum = -99999999; // если совсем не брать элементов, то сумма 0

//     for (var i = 0; i < arr.length; i++) {
//         var sumFixedStart = 0;
//         for (var j = i; j < arr.length; j++) {
//             sumFixedStart += arr[j];
//             maxSum = Math.max(maxSum, sumFixedStart);
//         }
//     }

//     return maxSum;
// }

// getMaxSubSum([-1, 2, 3, -9]);

function getMaxSubSum(arr) {
    var maxSum = -10000000; // если совсем не брать элементов, то сумма 0
    var sumFixedStart = 0;
    for (var i = 0; i < arr.length; i++) {

        sumFixedStart += arr[i];
        maxSum = Math.max(maxSum, sumFixedStart);
        if (sumFixedStart < 0) sumFixedStart = 0;
    }
    return maxSum;
}

console.log(getMaxSubSum([-1, -2, -3, 9]));