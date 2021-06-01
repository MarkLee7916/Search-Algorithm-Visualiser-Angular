import { AnimationFrame, createEmptyAnimationFrame } from "./animation";
import { deepCopy, randomIntBetween } from "./utils";

export const generateSortedArray = (
  minArrLen: number,
  maxArrLen: number,
  minElemSize: number,
  maxElemSize: number
) => {
  const size = randomIntBetween(minArrLen, maxArrLen);
  const array: number[] = [];

  for (let i = 0; i < size; i++) {
    array.push(randomIntBetween(minElemSize, maxElemSize));
  }

  return array.sort((x: number, y: number) => x - y);
};

export const linearSearch = (array: number[], target: number) => {
  const animations: AnimationFrame[] = [createEmptyAnimationFrame(array)];
  const isArraySorted = isSorted(array);

  for (let index = 0; index < array.length; index++) {
    const num = array[index];
    const nextFrame = deepCopy(animations[animations.length - 1]);

    markSearched(animations, nextFrame, index);

    if (num === target) {
      nextFrame.foundIndice = index;
      break;
    } else if (num > target && isArraySorted) {
      nextFrame.notFoundIndice = index;
      break;
    }
  }

  return animations;
};

export const binarySearch = (array: number[], target: number) => {
  const animations: AnimationFrame[] = [createEmptyAnimationFrame(array)];

  let lower = 0;
  let upper = array.length - 1;
  let middle: number = -1;

  while (lower <= upper) {
    const nextFrame = deepCopy(animations[animations.length - 1]);

    middle = Math.floor((upper + lower) / 2);
    markSearched(animations, nextFrame, middle);

    if (array[middle] === target) {
      nextFrame.foundIndice = middle;
      return animations;
    } else if (array[middle] > target) {
      upper = middle - 1;
    } else {
      lower = middle + 1;
    }
  }

  animations[animations.length - 1].notFoundIndice = middle;

  return animations;
};

// Mark an index as search and part of the animation
const markSearched = (
  animations: AnimationFrame[],
  frame: AnimationFrame,
  index: number
) => {
  frame.searchedIndices[index] = true;
  animations.push(frame);
};

const isSorted = (array: number[]) => {
  for (let index = 1; index < array.length; index++) {
    if (array[index - 1] > array[index]) {
      return false;
    }
  }

  return true;
};
