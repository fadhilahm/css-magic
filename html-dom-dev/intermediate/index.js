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

// Show a loading indicator when an iframe is being loaded.
const showALoadingIndicatorWhenAnIframeIsBeingLoaded = () => {
  const iframeEle = document.querySelector(
    ".show-a-loading-indicator-when-an-iframe-is-being-loaded__iframe"
  );
  const loadingEle = document.querySelector(
    ".show-a-loading-indicator-when-an-iframe-is-being-loaded__loading"
  );

  iframeEle.addEventListener("load", () => {
    // Hide the loading indicator.
    loadingEle.style.display = "none";

    // Bring the iframe back.
    iframeEle.style.opacity = 1;
  });
};
showALoadingIndicatorWhenAnIframeIsBeingLoaded();

// Show a custom context menu at clicked position
const showACustomContextMenuAtClickedPosition = () => {
  const bg = document.querySelector(
    ".show-a-custom-context-menu-at-clicked-position__bg"
  );
  const menu = document.querySelector(
    ".show-a-custom-context-menu-at-clicked-position__menu"
  );
  bg.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const rect = bg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the position of the menu.
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;

    // Show the menu.
    menu.classList.remove("invisible");

    // Attach document-wide event listener.
    document.addEventListener("click", documentClickHandler);
  });

  // Hide the menu when clicking outside of it.
  const documentClickHandler = (e) => {
    const isClickedOutside = !menu.contains(e.target);
    if (isClickedOutside) {
      // Hide the menu.
      menu.classList.add("invisible");

      // Remove the event handler.
      document.removeEventListener("click", documentClickHandler);
    }
  };
};
showACustomContextMenuAtClickedPosition();

// Show a ghost element when dragging an element.
const showAGhostElementWhenDraggingAnElement = () => {
  // Query the element.
  const draggable = document.querySelector(
    ".show-a-ghost-element-when-dragging-an-element__draggable"
  );

  // The ghost element.
  let ghostEle;

  draggable.addEventListener("dragstart", (e) => {
    // Create the ghost element.
    ghostEle = document.createElement("div");
    ghostEle.classList.add(
      "dragging",
      "w-36",
      "h-36",
      "rounded-xl",
      "shadow-xl",
      "flex",
      "items-center",
      "justify-center",
      "bg-blue-600",
      "text-white",
      "ring-black",
      "ring-4"
    );
    ghostEle.innerHTML = "I am flying";

    // Append it to `body`
    document.body.appendChild(ghostEle);

    // Customize the drag image.
    e.dataTransfer.setDragImage(ghostEle, 0, 0);
  });

  draggable.addEventListener("dragend", (e) => {
    document.body.removeChild(ghostEle);
  });
};
showAGhostElementWhenDraggingAnElement();
