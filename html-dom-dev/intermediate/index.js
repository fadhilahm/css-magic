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
