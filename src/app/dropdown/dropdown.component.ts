import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent implements OnInit {
  // A mapping between strings to display in the menu and their functionality on click
  @Input() content!: Map<string, () => void>;

  // The initial item that is displayed before the menu is revealed
  @Input() initialItem!: string;

  // The current dropdown item that user has selected
  itemSelected: string = "";

  // True if menu is dropped, otherwise false
  isContentDisplayed = false;

  ngOnInit() {
    this.itemSelected = this.initialItem;
  }

  toggleContent() {
    this.isContentDisplayed = !this.isContentDisplayed;
  }

  handleContentButtonClick(item: string) {
    const notifyCallback = this.content.get(item);

    if (notifyCallback === undefined) {
      throw "Parent of this component has passed in a map that doesn't match the content";
    }

    this.toggleContent();
    this.itemSelected = item;
    notifyCallback();
  }
}
