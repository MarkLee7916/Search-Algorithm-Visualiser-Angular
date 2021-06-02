import { Component, DoCheck } from "@angular/core";
import {
  binarySearch,
  generateSortedArray,
  linearSearch,
} from "src/app/algorithms";
import { AnimationFrame } from "src/app/animation";
import {
  delay,
  getValueFromSliderChangeEvent,
  randomIntBetween,
} from "src/app/utils";

@Component({
  selector: "app-visualiser",
  templateUrl: "./visualiser.component.html",
  styleUrls: ["./visualiser.component.css"],
})
export class VisualiserComponent implements DoCheck {
  // Min and max bounds for randomly generated arrays
  minArrLen: number = 10;
  maxArrLen: number = 30;
  minElemSize: number = 10;
  maxElemSize: number = 100;

  // The current algorithm visualise, which is either linear or binary search
  searchAlgorithm = linearSearch;

  // The amount of time in ms we wait between displaying animation frames
  animationDelayMillis: number = 1000;

  // The target that the algorithms are searching for
  target: number = randomIntBetween(this.minElemSize, this.maxElemSize);

  // True if modal is currently being displayed on the screen
  isModalVisible: boolean = false;

  // True if an animation is currently running, otherwise false
  isAnimationRunning: boolean = false;

  // Used to keep track of changes so we can recompute the animations
  oldTarget: number = this.target;
  oldSearchAlgorithm = this.searchAlgorithm;

  // Maps dropdown item displays onto their functionality
  readonly dropdownContent = new Map<string, () => void>([
    ["Linear Search", () => this.setAlgorithm(linearSearch)],
    ["Binary Search", () => this.setAlgorithm(binarySearch)],
  ]);

  // The current array the algorithms are operating on
  array: number[] = generateSortedArray(
    this.minArrLen,
    this.maxArrLen,
    this.minElemSize,
    this.maxElemSize
  );

  // The current frames we're animating through
  frames: AnimationFrame[] = this.searchAlgorithm(this.array, this.target);

  // An index into the animation frames, gets incremented to animate
  currentFrameIndex: number = 0;

  // Whenever state changes, check for relevant changes
  ngDoCheck() {
    this.handleTargetChange();
    this.handleSearchAlgorithmChange();
  }

  // If target changes, recompute the animation frames
  handleTargetChange() {
    if (this.target !== this.oldTarget) {
      this.updateFrames();
      this.oldTarget = this.target;
    }
  }

  // If the selected search algorithm changes, recompute the animation frames
  handleSearchAlgorithmChange() {
    if (this.searchAlgorithm !== this.oldSearchAlgorithm) {
      this.updateFrames();
      this.oldSearchAlgorithm = this.searchAlgorithm;
    }
  }

  // Recompute the animation frames and reset the frame index
  updateFrames() {
    this.frames = this.searchAlgorithm(this.array, this.target);
    this.currentFrameIndex = 0;
  }

  setAlgorithm(algo: (arr: number[], target: number) => AnimationFrame[]) {
    this.searchAlgorithm = algo;
  }

  // Run through the list of animation frames, displaying them in turn with a delay
  async animateAlgo() {
    this.currentFrameIndex = 0;
    this.isAnimationRunning = true;

    while (this.currentFrameIndex < this.frames.length - 1) {
      this.currentFrameIndex++;

      await delay(this.animationDelayMillis);
    }

    this.isAnimationRunning = false;
  }

  hideModal() {
    this.isModalVisible = false;
  }

  showModal() {
    this.isModalVisible = true;
  }

  newArray() {
    this.array = generateSortedArray(
      this.minArrLen,
      this.maxArrLen,
      this.minElemSize,
      this.maxElemSize
    );

    this.updateFrames();
  }

  setAnimationDelay(event: Event) {
    this.animationDelayMillis = getValueFromSliderChangeEvent(event);
  }
}
