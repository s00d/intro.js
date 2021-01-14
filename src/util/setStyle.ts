type Styles = {
  [key: string]: string | number;
};

/**
 * Sets the style of an DOM element
 */
export default function setStyle(element: HTMLElement, style: string | Styles) {
  let cssText = "";

  if (element.style.cssText) {
    cssText += element.style.cssText;
  }

  if (typeof style === "string") {
    cssText += style;
  } else {
    for (const rule in style) {
      cssText += `${rule}:${style[rule]};`;
    }
  }

  element.style.cssText = cssText;
}
