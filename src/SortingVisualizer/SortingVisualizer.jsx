import './SortingVisualizer.css'; 
import { useState, useEffect } from 'react';
import { getBubbleSort, getInsertionSort, getMergeSort, getQuickSort } from '../sortingAlgos/sortingAlgos.js';

const ANIM_SPEED = 0.5; 

const ARRAY_SIZE = 30;

const DELAY_CALC = ANIM_SPEED * (0.8 * ARRAY_SIZE);

export default function SortingVisualizer() {
    // Keep track of array state and when button is pressed
    const [myArray, setMyArray] = useState([]);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    // Produce a new random array
    const resetArray = () => {
        let ary = [];
        for (let i = 0; i < ARRAY_SIZE; i++) {
            ary.push(randomIntFromInterval(5, 100));
        }
        console.log(ary);
        setMyArray(ary);
    };

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const disableButtons = () => {
        setButtonsDisabled(true);
    }

    const enableButtons = () => {
        setButtonsDisabled(false);
    }

    // Produce new random array on mount
    useEffect(() => {resetArray();}, []);

    // Bubble sort animation
    const bubbleSortEvent = () => {
        disableButtons();
        var cpy = [...myArray];
        const anims = getBubbleSort(cpy);
        for (let i = 0; i < anims.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isSwap = i % 3 === 1;
            if (!isSwap) {
                const [barLeft, barRight] = anims[i];
                const barLeftStyle = arrayBars[barLeft].style;
                const barRightStyle = arrayBars[barRight].style;
                const colorChoose = i % 3 === 0 ? 'green' : 'pink'
                setTimeout(() => {
                    barLeftStyle.backgroundColor = colorChoose;
                    barRightStyle.backgroundColor = colorChoose;
                }, i * DELAY_CALC);
            } else {
                if (anims[i].length) {
                    setTimeout(() => {
                        const [barLeft, barLeftHeight, barRight, barRightHeight] = anims[i];
                        const barLeftStyle = arrayBars[barLeft].style;
                        const barRightStyle = arrayBars[barRight].style;
                        barLeftStyle.height = `${barRightHeight*5}px`;
                        barRightStyle.height = `${barLeftHeight*5}px`;
                        arrayBars[barLeft].textContent = `${barRightHeight}`;
                        arrayBars[barRight].textContent = `${barLeftHeight}`;
                    }, i * DELAY_CALC)
                }
            }
        }
        setTimeout(() => {
            setMyArray(cpy);
            enableButtons();
        }, anims.length * DELAY_CALC);
    };

    // Insertion sort animation
    const insertionSortEvent = () => {
        disableButtons();
        var cpy = [...myArray];
        const anims = getInsertionSort(cpy);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < anims.length; i++) {
            const isSwap = anims[i].length === 2;
            if (isSwap) {
                const [barLeft, barRight] = anims[i];
                const barLeftStyle = arrayBars[barLeft].style;
                const barRightStyle = arrayBars[barRight].style;
                setTimeout(() => {
                    barLeftStyle.backgroundColor = barLeftStyle.backgroundColor === 'pink' ? 'turquoise' : 'pink';
                    barRightStyle.backgroundColor = barRightStyle.backgroundColor === 'pink' ? 'green' : 'pink';
                }, i * DELAY_CALC)
            } else {
                setTimeout(() => {
                    const [barLeft, barLeftHeight, barRight, barRightHeight] = anims[i];
                    const barLeftStyle = arrayBars[barLeft].style;
                    const barRightStyle = arrayBars[barRight].style;
                    barLeftStyle.height = `${barRightHeight*5}px`;
                    barRightStyle.height = `${barLeftHeight*5}px`;
                    arrayBars[barLeft].textContent = `${barRightHeight}`;
                    arrayBars[barRight].textContent = `${barLeftHeight}`;
                }, i * DELAY_CALC)
            }
        }
        setTimeout(() => {
            setMyArray(cpy);
            enableButtons();
        }, anims.length * DELAY_CALC);
    };
    
    // Merge sort animation
    const mergeSortEvent = () => {
        disableButtons();
        var cpy = [...myArray]
        const anims = getMergeSort(cpy);
        for (let i = 0; i < anims.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barLeft, barRight] = anims[i];
                const barLeftStyle = arrayBars[barLeft].style;
                const barRightStyle = arrayBars[barRight].style;
                const colorChoose = i % 3 === 0 ? 'green' : 'pink';
                setTimeout(() => {
                    barLeftStyle.backgroundColor = colorChoose;
                    barRightStyle.backgroundColor = colorChoose;
                }, i * DELAY_CALC);
            } else {
                setTimeout(() => {
                    const [barLeft, newHeight] = anims[i];
                    const barLeftStyle = arrayBars[barLeft].style;
                    barLeftStyle.height = `${newHeight*5}px`;
                    arrayBars[barLeft].textContent = `${newHeight}`;
                }, i * DELAY_CALC);
            }
        }
        setTimeout(() => {
            setMyArray(cpy);
            enableButtons();
        }, anims.length * DELAY_CALC);
    };
    
    // Quick sort animation. Pivot is always last element.
    const quickSortEvent = () => {
        disableButtons();
        var cpy = [...myArray];
        const anims = getQuickSort(cpy)
        for (let i = 0; i < anims.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            if (anims[i].length === 1) {
                const [bar] = anims[i];
                const barStyle = arrayBars[bar].style;
                setTimeout(() => {
                    barStyle.backgroundColor = barStyle.backgroundColor === 'pink' ? 'yellow' : 'pink'; 
                }, i * DELAY_CALC);
            } else if (anims[i].length === 2) {
                const [barLeft, barRight] = anims[i];
                const barLeftStyle = arrayBars[barLeft].style;
                const barRightStyle = arrayBars[barRight].style;
                setTimeout(() => {
                    barLeftStyle.backgroundColor = barLeftStyle.backgroundColor === 'pink' ? 'green' : 'pink';
                    barRightStyle.backgroundColor = barRightStyle.backgroundColor === 'pink' ? 'green' : 'pink';
                }, i * DELAY_CALC);
            } else if (anims[i].length === 3) {
                const [bar, color, dummy] = anims[i];
                const barStyle = arrayBars[bar].style;
                setTimeout(() => {
                    barStyle.backgroundColor = color;
                }, i * DELAY_CALC);
            } else {
                setTimeout(() => {
                    const [barLeft, barLeftHeight, barRight, barRightHeight] = anims[i];
                    const barLeftStyle = arrayBars[barLeft].style;
                    const barRightStyle = arrayBars[barRight].style;
                    barLeftStyle.height = `${barRightHeight*5}px`;
                    barRightStyle.height = `${barLeftHeight*5}px`;
                    arrayBars[barLeft].textContent = `${barRightHeight}`;
                    arrayBars[barRight].textContent = `${barLeftHeight}`;
                }, i * DELAY_CALC)
            }
        }
        setTimeout(() => {
            setMyArray(cpy);
            enableButtons();
        }, anims.length * DELAY_CALC);
    };

    return (
        <div className = "SortingVisualizer">
            <div className = "array-container">
                {myArray.map((value, idx) => (
                    <div className = "array-bar" key = {idx} style = {{height: `${value*5}px`, backgroundColor: 'pink'}}>
                        {value}
                    </div>
                ))}
            </div>
            <div className = "buttonRow">
                <button onClick={resetArray} disabled={buttonsDisabled}>Generate New Array</button>
                <button onClick={bubbleSortEvent} disabled={buttonsDisabled}>Bubble Sort</button>
                <button onClick={insertionSortEvent} disabled={buttonsDisabled}>Insertion Sort</button>
                <button onClick={mergeSortEvent} disabled={buttonsDisabled}>Merge Sort</button>
                <button onClick={quickSortEvent} disabled={buttonsDisabled}>Quicksort</button>
            </div>
        </div>
    );
}