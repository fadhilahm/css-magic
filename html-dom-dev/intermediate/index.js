// Resize the width of a text box to fit its content automatically
const resizeTheWidthOfATextBoxToFitItsContentAutomatically = () => {
  // Create a fake div element.
  const fakeEle = document.createElement("div");

  // Hide it completely
  fakeEle.style.position = "absolute";
  fakeEle.style.top = "0";
  fakeEle.style.left = "-9999px";
  fakeEle.style.overflow = "hidden";
  fakeEle.style.visibility = "hidden";
  fakeEle.style.whiteSpace = "nowrap";
  fakeEle.style.height = "0";

  // We copy the same style that effect the width.
  const textBoxEle = document.querySelector(
    ".resize-the-width-of-a-text-box-to-fit-its-content-automatically"
  );

  // Get the styles.
  const styles = window.getComputedStyle(textBoxEle);

  // Copy font styles from the textbox.
  fakeEle.style.fontFamily = styles.fontFamily;
  fakeEle.style.fontSize = styles.fontSize;
  fakeEle.style.fontStyle = styles.fontStyle;
  fakeEle.style.fontWeight = styles.fontWeight;
  fakeEle.style.letterSpacing = styles.letterSpacing;
  fakeEle.style.textTransform = styles.textTransform;

  fakeEle.style.borderLeftWidth = styles.borderLeftWidth;
  fakeEle.style.borderRightWidth = styles.borderRightWidth;
  fakeEle.style.paddingLeft = styles.paddingLeft;
  fakeEle.style.paddingRight = styles.paddingRight;

  // Append the fake element to `body`.
  document.body.appendChild(fakeEle);

  // The function below sets the HTML for the fake element, calculates its width and sets the result to the original input.
  const setWidth = () => {
    const string =
      textBoxEle.value || textBoxEle.getAttribute("placeholder") || "";
    fakeEle.innerHTML = string.replace(/\s/g, "&" + "nbsp;");

    const fakeEleSTyles = window.getComputedStyle(fakeEle);
    textBoxEle.style.width = fakeEleSTyles.width;
  };

  setWidth();
  textBoxEle.addEventListener("input", () => {
    setWidth();
  });
};
resizeTheWidthOfATextBoxToFitItsContentAutomatically();

// Scale a text to fit inside of an element
const scaleATextToFitInsideOfAnElement = () => {
  const measureWidth = (text, font) => {
    // Create new `canvas` element
    const canvas = document.createElement("canvas");

    // Get the context
    const context = canvas.getContext("2d");

    // Set the font
    context.font = font;

    // Measure the text
    const metrics = context.measureText(text);

    // Return the width in pixels
    return metrics.width;
  };

  // Query the element
  const ele = document.querySelector(
    ".scale-a-text-to-fit-inside-of-an-element"
  );

  // Get the styles
  const styles = window.getComputedStyle(ele);

  // Get the font size and font style
  const font = styles.font;
  const fontSize = parseInt(styles.fontSize);

  const measured = measureWidth(ele.textContent, font);
  const scale = ele.clientWidth / parseFloat(measured);

  const scaleFontSize = Math.floor(scale * fontSize);
  ele.style.fontSize = `${scaleFontSize}px`;
};
scaleATextToFitInsideOfAnElement();

const scrollAnElementToEnsureItIsVisibleInAScrollableContainer = () => {
  const scrollToBeVisible = (ele, container) => {
    const eleTop = ele.offsetTop;
    const eleBottom = eleTop + ele.clientHeight;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    if (eleTop < containerTop) {
      // Scroll to the top of container
      container.scrollTop -= containerTop - eleTop;
    } else if (eleBottom > containerBottom) {
      // Scroll to the bottom of the container
      container.scrollTop += eleBottom - containerBottom;
    }
  };

  const container = document.querySelector(
    ".scroll-an-element-to-ensure-it-is-visible-in-a-scrollable-container__container"
  );
  const ele = document.querySelector(
    ".scroll-an-element-to-ensure-it-is-visible-in-a-scrollable-container__ele"
  );
  scrollToBeVisible(ele, container);
};
scrollAnElementToEnsureItIsVisibleInAScrollableContainer();

// Save and restore the text selection.
const saveAndRestoreTheTextSelection = () => {
  // Save the selection
  // Return a `Range` instance  if there is a selected text
  const save = () => {
    const selection = window.getSelection();
    return selection.rangeCount === 0 ? null : selection;
  };

  // Restore the selection
  // `range` is a `Range` object
  const restore = (range) => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };
  let savedString = null;
  const textarea = document.querySelector(
    ".save-and-restore-the-text-selection__textarea"
  );
  const saveButton = document.querySelector(
    ".save-and-restore-the-text-selection__save"
  );
  const restoreButton = document.querySelector(
    ".save-and-restore-the-text-selection__restore"
  );

  saveButton.addEventListener("click", () => {
    const range = save();
    if (range) {
      savedString = range.toString();
    }
  });

  restoreButton.addEventListener("click", () => {
    if (savedString) {
      textarea.value = savedString;
    }
  });
};
saveAndRestoreTheTextSelection();
