import { deepCopy } from "./utils";

// Represents one single step in an animation
export type AnimationFrame = {
  array: number[];
  searchedIndices: boolean[];
  foundIndice: number;
  notFoundIndice: number;
};

// Create an animation frame that hasn't been modified by the algorithms
export const createEmptyAnimationFrame = (array: number[]) => {
  return {
    array: deepCopy(array),
    searchedIndices: Array(array.length).fill(false),
    foundIndice: -1,
    notFoundIndice: -1,
  };
};
