export const randomIntBetween = (lower: number, upper: number) => {
  return Math.floor(Math.random() * (upper - lower)) + lower;
};

export const deepCopy = <T>(item: T): T => {
  return JSON.parse(JSON.stringify(item));
};

export const delay = (delayMillis: number) => {
  return new Promise(resolve => setTimeout(resolve, delayMillis));
};

export const getValueFromSliderChangeEvent = (event: Event) => {
  const htmlSliderElement = <HTMLInputElement>event.target;

  return parseInt(htmlSliderElement.value);
};
