import getOffset from "../util/getOffset";
import exitIntro from "./exitIntro";
import createElement from "../util/createElement";
import setStyle from "../util/setStyle";
import { IntroJs } from "../IntroJs";

/**
 * Add overlay layer to the page
 *
 * @api private
 * @method _addOverlayLayer
 * @param {Object} targetElm
 */
export default function addOverlayLayer(this: IntroJs, targetElm: HTMLElement) {
  const overlayLayer = createElement("div", {
    className: "introjs-overlay",
  });
  // check if the target element is body, we should calculate the size of overlay layer in a better way
  if (!targetElm.tagName || targetElm.tagName.toLowerCase() === "body") {
    setStyle(overlayLayer, {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "fixed",
    });
  } else {
    // set overlay layer position
    const elementPosition = getOffset(targetElm);
    if (elementPosition) {
      setStyle(overlayLayer, {
        width: `${elementPosition.width}px`,
        height: `${elementPosition.height}px`,
        top: `${elementPosition.top}px`,
        left: `${elementPosition.left}px`,
      });
    }
  }

  targetElm.appendChild(overlayLayer);

  if (this._options.exitOnOverlayClick === true) {
    setStyle(overlayLayer, {
      cursor: "pointer",
    });

    overlayLayer.onclick = () => {
      exitIntro.call(this, targetElm);
    };
  }

  return true;
}
