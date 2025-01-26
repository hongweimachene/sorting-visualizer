export function getMergeSort(array){ 
    const anims = [];
    if (array.length <= 1) return anims;
    const tempAry = array.slice();
    mergeSortHelper(array, 0, array.length-1, tempAry, anims);
    return anims;
}

function mergeSortHelper(mainAry, start, end, tempAry, anims){
    if (start === end) return;
    const mid = Math.floor((start+end) / 2);
    mergeSortHelper(tempAry, start, mid, mainAry, anims);
    mergeSortHelper(tempAry, mid + 1, end, mainAry, anims);
    doMerge(mainAry, start, mid, end, tempAry, anims);
}

function doMerge(mainAry, start, mid, end, tempAry, anims) {
    // k is the index to fill in the main array, i and j are indices for subarrays
    let k = start, i = start, j = mid + 1;
    while (i <= mid && j <= end) {
        //comparisons, push to highlight
        anims.push([i, j]);
        //comparisons, push to revert
        anims.push([i, j]);

        if (tempAry[i] <= tempAry[j]) {
            //overwrite index k in original array with value at index i in auxiliary array
            anims.push([k, tempAry[i]]);
            mainAry[k++] = tempAry[i++];
        } else {
            anims.push([k, tempAry[j]]);
            mainAry[k++] = tempAry[j++];
        }
    }
    while (i <= mid) {
        anims.push([i, i]);
        anims.push([i, i]);

        anims.push([k, tempAry[i]]);
        mainAry[k++] = tempAry[i++];
    }
    while (j <= end) {
        anims.push([j, j]);
        anims.push([j, j]);

        anims.push([k, tempAry[j]]);
        mainAry[k++] = tempAry[j++];
    }
}

export const getBubbleSort = sorted => {
    const anims = []
    for (let i = 0; i < sorted.length; i++){
        for (let j = 0; j < (sorted.length - i - 1); j++){
            anims.push([j, j+1]);
            if (sorted[j] > sorted[j+1]) {
                anims.push([j, sorted[j], j+1, sorted[j+1]]);
                [sorted[j], sorted[j+1]] = [sorted[j+1], sorted[j]];
            } else {
                anims.push([]);
            }
            anims.push([j, j+1]);
        }
    }
    return anims;
}

export const getInsertionSort = sorted => {
    var anims = []
    for (let i = 1; i < sorted.length; i++) {
        let key = sorted[i];
        let j = i - 1;
        anims.push([i, j]);
        anims.push([i, j]);
        while (j >= 0 && sorted[j] > key) {
            anims.push([j+1, j]);
            anims.push([j+1, key, j, sorted[j]]);
            sorted[j + 1] = sorted[j];
            anims.push([j+1, j]);
            j = j - 1;
        }  
        sorted[j + 1] = key;
    }
    return anims;
}

export function getQuickSort(array){ 
    const anims = [];
    if (array.length <= 1) return anims;
    quickSort(array, 0, array.length-1, anims);
    return anims;
}

export function quickSort(mainAry, low, high, anims) { 
    if (low >= high) return; 
    let pi = partition(mainAry, low, high, anims); 
  
    quickSort(mainAry, low, pi - 1, anims); 
    quickSort(mainAry, pi + 1, high, anims); 
} 

function partition(arr, low, high, anims) { 
    let pivot = arr[high];
    // flag the pivot which is last element in array 
    anims.push([high]);
    let i = low - 1; 
  
    for (let j = low; j <= high - 1; j++) { 
        anims.push([j, 'green', 'traversal'])
        anims.push([j, 'pink', 'traversal'])
        if (arr[j] < pivot) { 
            if (i >= 0) {
                anims.push([i, 'pink', 'traversal'])
            }
            i++; 
            anims.push([i, j]);
            anims.push([i, arr[i], j, arr[j]]);
            [arr[i], arr[j]] = [arr[j], arr[i]];  
            anims.push([i, j]);
        } 
        if (i >= 0) {
            anims.push([i, 'orange', 'traversal'])
        }
    } 
    if (i >= 0) {
        anims.push([i, 'pink', 'traversal'])
    }
    anims.push([i+1]);
    anims.push([i+1, arr[i+1], high, arr[high]]);
    anims.push([i+1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  
    return i + 1;  
} 

// function partition(arr, low, high) { 
//     let pivot = arr[high]; 
//     let i = low - 1; 
  
//     for (let j = low; j <= high - 1; j++) { 
//         if (arr[j] < pivot) { 
//             i++; 
//             [arr[i], arr[j]] = [arr[j], arr[i]];  
//         } 
//     } 
//     [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  
//     return i + 1;  
// } 
  
// export function quickSort(arr, low, high) { 
//     if (low >= high) return; 
//     let pi = partition(arr, low, high); 
  
//     quickSort(arr, low, pi - 1); 
//     quickSort(arr, pi + 1, high); 
// } 

// export const mergeSort = ary => {
//     if (ary.length === 1) return ary;
//     const mid = Math.floor(ary.length / 2);
//     const left = mergeSort(ary.slice(0, mid));
//     const right = mergeSort(ary.slice(mid));

//     let sorted = [];
//     let i = 0, j = 0;

//     while (i < left.length && j < right.length) {
//         if (left[i] < right[j]) {
//             sorted.push(left[i]);
//             i++;
//         } else {
//             sorted.push(right[j])
//             j++;
//         }
//     }

//     while (i < left.length) {
//         sorted.push(left[i]);
//         i++;
//     }

//     while (j < right.length) {
//         sorted.push(right[j]);
//         j++;
//     }
//     return sorted;
// }
