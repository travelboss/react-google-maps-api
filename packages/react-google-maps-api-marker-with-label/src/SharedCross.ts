/**
 * Returns the DIV for the cross used when dragging a marker when the
 * crossOnDrag parameter set to true. One cross is shared with all markers.
 * @param {string} crossURL The URL of the cross image.
 * @private
 */
export const getSharedCross = (crossURL: string) => {
  if (crossDiv) {
    return crossDiv;
  }

  let div: HTMLImageElement;
  div = document.createElement("img");
  div.style.cssText = "position: absolute; z-index: 1000002; display: none;";
  // Hopefully Google never changes the standard "X" attributes:
  div.style.marginLeft = "-8px";
  div.style.marginTop = "-9px";
  div.src = crossURL;
  crossDiv = div;
  return crossDiv;
};

export const getProcessed = () => {
  return processed;
}

export const setProcessed = () => {
  return processed = true;
}

let crossDiv: HTMLImageElement;
let processed = false;
