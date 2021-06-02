import { Component, Input } from "@angular/core";
import { AnimationFrame } from "src/app/animation";

@Component({
  selector: "app-array",
  templateUrl: "./array.component.html",
  styleUrls: ["./array.component.css"],
})
export class ArrayComponent {
  // The current frame for this component to render
  @Input() currentFrame!: AnimationFrame;

  // True if this is the last frame in a given animation
  @Input() isLastFrame!: boolean;

  // Get the color of the element at some index in the animation frame
  getElemColor(index: number) {
    if (this.currentFrame.foundIndice === index) {
      return "#32CD32";
    } else if (this.isLastFrame && this.currentFrame.notFoundIndice === index) {
      return "red";
    } else if (this.currentFrame.searchedIndices[index]) {
      return "#33D5FF";
    } else {
      return "white";
    }
  }
}
