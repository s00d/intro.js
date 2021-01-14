import forEach from "../util/forEach";
import showElement from "./showElement";
import exitIntro from "./exitIntro";
import { IntroJs } from "../index";

/**
 * Go to specific step of introduction
 *
 * @api private
 * @method _goToStep
 */
export function goToStep(this: IntroJs, step: number) {
  //because steps starts with zero
  this._currentStep = step - 2;
  if (typeof this._introItems !== "undefined") {
    nextStep.call(this);
  }
}

/**
 * Go to the specific step of introduction with the explicit [data-step] number
 *
 * @api private
 * @method _goToStepNumber
 */
export function goToStepNumber(this: IntroJs, step: number) {
  this._currentStepNumber = step;
  if (typeof this._introItems !== "undefined") {
    nextStep.call(this);
  }
}

/**
 * Go to next step on intro
 *
 * @api private
 * @method _nextStep
 */
export function nextStep(this: IntroJs) {
  this._direction = "forward";

  if (typeof this._currentStepNumber !== "undefined") {
    forEach(this._introItems, ({ step }, i) => {
      if (step === this._currentStepNumber) {
        this._currentStep = i - 1;
        this._currentStepNumber = undefined;
      }
    });
  }

  if (typeof this._currentStep === "undefined") {
    this._currentStep = 0;
  } else {
    ++this._currentStep;
  }

  const nextStep = this._introItems[this._currentStep];
  let continueStep = true;

  if (typeof this._introBeforeChangeCallback !== "undefined") {
    continueStep = this._introBeforeChangeCallback.call(
      this,
      nextStep && nextStep.element
    );
  }

  // if `onbeforechange` returned `false`, stop displaying the element
  if (continueStep === false) {
    --this._currentStep;
    return false;
  }

  if (this._introItems.length <= this._currentStep) {
    //end of the intro
    //check if any callback is defined
    if (typeof this._introCompleteCallback === "function") {
      this._introCompleteCallback.call(this);
    }
    exitIntro.call(this, this._targetElement);
    return;
  }

  showElement.call(this, nextStep);

  return true;
}

/**
 * Go to previous step on intro
 *
 * @api private
 * @method _previousStep
 */
export function previousStep(this: IntroJs) {
  this._direction = "backward";

  if (!this._currentStep) {
    return false;
  }

  --this._currentStep;

  const nextStep = this._introItems[this._currentStep];
  let continueStep = true;

  if (typeof this._introBeforeChangeCallback !== "undefined") {
    continueStep = this._introBeforeChangeCallback.call(
      this,
      nextStep && nextStep.element
    );
  }

  // if `onbeforechange` returned `false`, stop displaying the element
  if (continueStep === false) {
    ++this._currentStep;
    return false;
  }

  showElement.call(this, nextStep);

  return true;
}

/**
 * Returns the current step of the intro
 *
 * @returns {number | boolean}
 */
export function currentStep(this: IntroJs) {
  return this._currentStep;
}
