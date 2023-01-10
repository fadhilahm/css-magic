// Select the children of an element
const element = document.querySelector(".select-the-children-of-an-element");
const childNodes = element.children;
const first = childNodes[0];
const last = childNodes[childNodes.length - 1];
console.log("Should contain the content of first child => ", first.innerHTML);
console.log("Should contain the content of last child => ", last.innerHTML);

// Scroll to an element
const element2 = document.querySelector(".scroll-to-an-element__scroll-target");
// setInterval(() => {
//   console.log("scrollIntoView()");
//   //   element2.scrollIntoView();
//   element2.scrollIntoView({ behavior: "smooth" });
// }, 200);

// Select an element or list of elements
console.log(
  `Select an element by given ID => ${
    document.getElementById("select-an-element-or-list-of-elements__id")
      .innerHTML
  }`
);
console.log(
  `Select an element by given class name => ${document.getElementsByClassName(
    "select-an-element-or-list-of-elements__classname"
  )}`
);
console.log(
  `Select all elements by CSS selector => ${document.querySelectorAll(
    ".select-an-element-or-list-of-elements__selector"
  )}`
);
console.log(
  `Select the first element by CSS selector => ${document.querySelector(
    ".select-an-element-or-list-of-elements__selector"
  )}`
);

// Select the text of a textarea automatically
document
  .getElementById("select-the-text-of-a-textarea-automatically")
  .addEventListener("focus", (e) => {
    // Select the text
    e.target.select();
  });

// Serialize form data into a query string.
const serialize = (formEle) => {
  // Get all fields.
  const fields = [].slice.call(formEle.elements, 0);

  return fields
    .map((ele) => {
      const name = ele.name;
      const type = ele.type;

      // We ignore
      // - field that doesn't have a name.
      // - disabled field.
      // - field input.
      // - unselected checkout/radio
      if (
        !name ||
        ele.disabled ||
        type === "file" ||
        (/(checkbox|radio)/.test(type) && !ele.checked)
      ) {
        return "";
      }

      // Multiple select
      if (type === "select-multiple") {
        return ele.options
          .map((opt) => {
            return opt.selected
              ? `${encodeURIComponent(name)}=${encodeURIComponent(opt.value)}`
              : "";
          })
          .filter((item) => {
            return item;
          })
          .join("&");
      }

      return `${encodeURIComponent(name)}=${encodeURIComponent(ele.value)}`;
    })
    .filter((item) => item)
    .join(`&`);
};

const form = document.querySelector(".serialize-form-data-into-a-query-string");
setInterval(() => {
  const serializedString = serialize(
    document.querySelector(".serialize-form-data-into-a-query-string")
  );
  console.log("serialized string => ", serializedString);
}, 500);

const setCSSStyle = document.querySelector(".set-css-style-for-an-element");
setCSSStyle.style.backgroundColor = "blue";
setCSSStyle.style["backgroundColor"] = "green";
setCSSStyle.style["background-color"] = "red";

// Add new style
setCSSStyle.style.cssText += "background-color: pink; color: white;";

// Ignore previous style
setCSSStyle.style.cssText = "background-color: pink; color: white;";

// Remove a CSS style
// setCSSStyle.style.removeProperty("background-color");

// Selec the text content of an element.
const selectText = (ele) => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(ele);
  selection.removeAllRanges();
  selection.addRange(range);
};

const selectTextElement = document.querySelector(
  ".select-the-text-content-of-an-element__button"
);

selectTextElement.addEventListener("click", () => {
  const wantToBeSelected = document.querySelector(
    ".select-the-text-content-of-an-element__text"
  );
  selectText(wantToBeSelected);
});

// Show or hide an element
const elementToHide = document.querySelector(".show-or-hide-an-element");
elementToHide.style.display = "none";
elementToHide.style.display = "";

// Strip HTML from a Given Text
const stripHtml = (html) => {
  const ele = document.createElement("template");
  ele.innerHTML = html;
  return ele.content.textContent || "";
};

const toBeStripped = document.querySelector(".strip-html-from-a-given-text");
const strippedHtml = stripHtml(toBeStripped.innerHTML);
console.log("stripHTML");
console.log(strippedHtml);

// Submit a Form with Ajax
const submit = (formEle) => {
  return new Promise((resolve, reject) => {
    const params = serialize(formEle);

    const req = new XMLHttpRequest();
    req.open("POST", formEle.action, true);
    req.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    req.onload = () => {
      if (req.status >= 200 && req.status < 400) {
        resolve(req.responseText);
      }
    };

    req.onerror = () => {
      reject();
    };

    req.send(params);
  });
};
const form2 = document.querySelector(
  ".serialize-form-data-into-a-query-string"
);
submit(form2).then((response) => {
  const data = JSON.parse(response);
});

// Trigger an event

// For text box and textarea
const textArea = document.querySelector(".trigger-an-event__textarea");
// setInterval(() => {
//   console.log("textarea focus()");
//   textArea.focus();
//   console.log("textarea blur()");
//   textArea.blur();
// }, 200);

// For form element
const formEle = document.querySelector(".trigger-an-event__form");
// setInterval(() => {
//   // formEle.submit();
//   formEle.reset();
// }, 200)

// Trigger a native event
const trigger = (ele, eventName) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(eventName, true, false);
  ele.dispatchEvent(e);
};
// setInterval(() => {
//   const toggledElement = document.querySelector('.toggle-an-element__button');
//   trigger(toggledElement, 'click')
// }, 200)

// Trigger a custom event
const customEvent = new CustomEvent("hello-happy-world", {
  detail: {
    message: "HALO SENANG DUNIA",
  },
});

// Trigger the event
const toggledElement = document.querySelector(".toggle-an-element__button");
toggledElement.addEventListener("hello-happy-world", (e) => {
  console.log(e.detail.message);
});
// setInterval(() => {
//   console.log("DISPATCH CUSTOM EVENT");
//   toggledElement.dispatchEvent(customEvent);
// }, 200);

// Swap two nodes
const swap = (nodeA, nodeB) => {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // Move `nodeA` to before the `nodeB`
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  // Move `nodeB` to before the sibling of `nodeA`
  parentA.insertBefore(nodeB, siblingA);
};

const firstElement = document.querySelector(".swap-two-nodes__1st");
const secondElement = document.querySelector(".swap-two-nodes__2nd");
swap(firstElement, secondElement);

// Unwrap an element
const toBeUnwrapped = document.querySelector(".unwrap-an-element");

// Get the parents node
const toBeUnwrappedParent = toBeUnwrapped.parentNode;
while (toBeUnwrapped.firstChild) {
  toBeUnwrappedParent.insertBefore(toBeUnwrapped.firstChild, toBeUnwrapped);
}

// `ele` becomes an empty element, remove it from the parent
toBeUnwrappedParent.removeChild(toBeUnwrapped);

// Upload files with Ajax
const upload = (fileEle, backendURL) => {
  return new Promise((resolve, reject) => {
    // Get the list of selected files
    const files = fileEle.files;

    // Create a new FormData
    const formData = new FormData();

    // Loop over the files
    [].forEach.call(files, (file) => {
      formData.append(fileEle.name, file, file.name);
    });

    // Create a new Ajax request
    const req = new XMLHttpRequest();
    req.open("POST", backendURL, true);

    // Handle the events
    req.onload = () => {
      if (req.status >= 200 && req.status < 400) {
        resolve(req.responseText);
      }
    };
    req.onerror = () => {
      reject();
    };

    // Send it
    req.send(formData);
  });
};

const uploadTrigger = () => {
  const uploadFiles = document.querySelector(".upload-files-with-ajax");
  upload(uploadFiles, "/path/to/back-end").then((response) => {
    const data = JSON.parse(response);
  });
};

// Wrap an element around a given element
const wrapper = document.querySelector(
  ".wrap-an-element-around-a-given-element__wrapper"
);
const wrappee = document.querySelector(
  ".wrap-an-element-around-a-given-element__wrappee"
);

// First, insert `wrapper` before `wrappee` in its parent node
wrappee.parentNode.insertBefore(wrapper, wrappee);

// And then, turn `ele` into a children of `wrapper`
wrapper.appendChild(wrappee);

// Toggle password visibility
const togglePasswordBtn = document.querySelector(
  ".toggle-password-visibility__button"
);
togglePasswordBtn.addEventListener("click", () => {
  const togglePasswordElement = document.querySelector(
    ".toggle-password-visibility__password"
  );
  const type = togglePasswordElement.getAttribute("type");
  togglePasswordElement.setAttribute(
    "type",
    type === "password" ? "text" : "password"
  );
});

// Add or remove class from an element
const modifiedElement = document.querySelector(
  ".add-or-remove-class-from-an-element"
);

// Add a class to an element
modifiedElement.classList.add("text-yellow-500");

// Remove a class from an element
// modifiedElement.classList.remove("bg-red-500");

// Toggle a class from an element.
const toggleClass = (element, className) => {
  element.classList.toggle(className);
};
const toggledElement2 = document.querySelector(
  ".add-or-remove-class-from-an-element__button"
);
toggledElement2.addEventListener("click", () => {
  toggleClass(modifiedElement, "bg-blue-500");
});

// Append to an element
const createColoredBox = () => {
  const element = document.createElement("div");
  const colorsList = [
    "bg-red-500",
    "bg-green-400",
    "bg-orange-500",
    "bg-blue-500",
    "bg-pink-500",
  ];
  const randomNumber = Math.ceil(Math.random() * (colorsList.length - 1));
  element.classList.add(colorsList[randomNumber]);
  element.classList.add("w-10", "h-10");
  return element;
};

const buttonWithoutEvent = document.querySelector(
  ".append-to-an-element__button"
);
const addRandomBoxes = () => {
  const element = createColoredBox();
  const parent = document.querySelector(".append-to-an-element");
  parent.appendChild(element);
};

buttonWithoutEvent.addEventListener("click", addRandomBoxes);

// buttonWithoutEvent.removeEventListener("click", addRandomBoxes);

// Calculate the mouse position relative to an element
const mouseRelative = document.querySelector(
  ".calculate-the-mouse-position-relative-to-an-element__reference"
);
mouseRelative.addEventListener("mousedown", (e) => {
  // Get the target
  const target = e.target;

  // Get the bounding rectangle of target
  const rect = target.getBoundingClientRect();

  // Mouse position
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xElement = document.querySelector(
    ".calculate-the-mouse-position-relative-to-an-element__x"
  );
  const yElement = document.querySelector(
    ".calculate-the-mouse-position-relative-to-an-element__y"
  );
  xElement.innerHTML = x;
  yElement.innerHTML = y;
});

// Check an element against a selector
const matches = (ele, selector) => {
  return (
    ele.matches ||
    ele.mathesSelector ||
    ele.msMatchesSelector ||
    ele.mozMatchesSelector ||
    ele.webkitMathesSelector ||
    ele.oMatchesSelector
  ).call(ele, selector);
};

// Check if an element is in the viewport
const isInViewport = (ele) => {
  const rect = ele.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerHeight || document.documentElement.clientWidth)
  );
};

// setInterval(() => {
//   console.log(
//     "is in viewport ===> ",
//     isInViewport(
//       document.querySelector(".check-if-an-element-is-in-the-viewport")
//     )
//   );
// }, 500);

// Check if an element is a descendant of another
const isDescendant = (parent, child) => {
  let node = child.parentNode;
  while (node) {
    if (node === parent) {
      return true;
    }

    // traverse up to the parent
    node = node.parentNode;
  }

  // Go up until the root but couldn't find the `parent`
  return false;
};

const childComponent = document.querySelector(
  ".check-if-an-element-is-a-descendant-of-another__descendant"
);
const parentComponent = document.querySelector(
  ".check-if-an-element-is-a-descendant-of-another__parent"
);

// Check if the native date input is supported
const isDateInputSupported = () => {
  // Create a new input element
  const ele = document.createElement("input");

  // Set the type attribute
  ele.setAttribute("type", "date");
  const invalidValue = "not-a-value-date";

  return ele.value !== invalidValue;
};

console.log(isDateInputSupported());

// Check if the touch events are supported
const touchSupported = !!(
  "ontouchstart" in window ||
  (window.DocumentTouch && document instanceof DocumentTouch)
);

// Check if the code is running in the browser
const isBrowser = typeof window === "object" && typeof document === "object";

// Check if an element is visible in a scrollable container
const isVisibleFirst = (ele, container) => {
  const eleTop = ele.offsetTop;
  const eleBottom = eleTop + ele.clientHeight;

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  // The element is fully visible in the container
  return (
    (eleTop >= containerTop && eleBottom <= containerBottom) ||
    // Some part of the element is visible in the container.
    (eleTop < containerTop && containerTop < eleBottom) ||
    (eleTop < containerBottom && containerBottom < eleBottom)
  );
};

const isVisibleSecond = (ele, container) => {
  const { bottom, height, top } = ele.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return top <= containerRect.top
    ? containerRect.top - top <= height
    : bottom - containerRect.bottom <= height;
};

const isVisibleContainer = document.querySelector(
  ".check-if-an-element-is-visible-in-a-scrollable-container__container"
);

const isVisibleChild = document.querySelector(
  ".check-if-an-element-is-visible-in-a-scrollable-container__child"
);

isVisibleContainer.addEventListener("click", () => {
  const isVisible = isVisibleSecond(isVisibleChild, isVisibleContainer);
  console.log("isVisible 👀 ", isVisible);
});

// Check if an element has given class
const isClassExist = document
  .querySelector(
    ".check-if-an-element-is-visible-in-a-scrollable-container__container"
  )
  .classList.contains("justify-center");

// Count the number of characters of a textarea
const countNumberTextArea = document.querySelector(
  ".count-the-number-of-characters-of-a-textarea__textarea"
);
const countNumberCounter = document.querySelector(
  ".count-the-number-of-characters-of-a-textarea__counter"
);
countNumberTextArea.addEventListener("input", (e) => {
  const currentTextLength = e.target.value.length;
  const currentMaxLength = countNumberTextArea.getAttribute("maxlength");
  const counter = `${currentTextLength} / ${currentMaxLength}`;
  countNumberCounter.innerHTML = counter;
});

const copyButton = document.querySelector(
  ".copy-highlighted-code-to-the-clipboard__button"
);
copyButton.addEventListener("click", () => {
  const codeBlock = document.querySelector(
    ".copy-highlighted-code-to-the-clipboard__code"
  );
  const selection = window.getSelection();

  // Save the current selection
  const currentRange =
    selection.rangeCount === 0 ? null : selection.getRangeAt(0);

  // Select the text content of code element
  const range = document.createRange();
  range.selectNodeContents(codeBlock);
  selection.removeAllRanges();
  selection.addRange(range);

  // Copy to clipboard
  try {
    document.execCommand("copy");
    copyButton.innerHTML = "Copied";
  } catch (err) {
    // Unable to copy
    copyButton.innerHTML = "Copy";
  } finally {
    // Restore the previous selection
    selection.removeAllRanges();
    currentRange && selection.addRange(currentRange);
  }
});

// Create an element
const newElement = document.createElement("div");
newElement.classList.add(
  "w-content",
  "h-20",
  "bg-red-500",
  "text-white",
  "px-3",
  "flex",
  "items-center"
);
newElement.innerHTML = "ハローハッピーワールド！！！！";
const newElementContainer = document.querySelector(".create-an-element");
newElementContainer.appendChild(newElement);

// Clone an element
const clonedElementContainer = document.querySelector(".clone-an-element");
for (let i = 0; i < 5; i++) {
  const cloned = newElement.cloneNode(true);
  clonedElementContainer.appendChild(cloned);
}

// Detect clicks outside of an element
const outsideClick = document.querySelector(
  ".detect-clicks-outside-of-an-element"
);
document.addEventListener("click", (e) => {
  const isClickedOutside = !outsideClick.contains(e.target);
  const filledText = isClickedOutside ? "❌" : "✅";
  const outsideClickText = document.querySelector(
    ".detect-clicks-outside-of-an-element__text"
  );
  outsideClickText.innerHTML = filledText;
});

// Detect if an element is focused
const focusListener = document.querySelector(
  ".detect-if-an-element-is-focused"
);

const focusListenerHandler = () => {
  focusListener.setAttribute(
    "value",
    document.activeElement === focusListener ? "FOCUSED!😎" : "NOT FOCUSED 😢"
  );
};

focusListener.addEventListener("focus", focusListenerHandler);

focusListener.addEventListener("blur", focusListenerHandler);

// Create a one time event handler

const onceButton = document.querySelector(".create-one-time-event-handler");
const onceButtonHandler = () => {
  prompt("This should only be able to run once");
  // onceButton.removeEventListener("click", onceButtonHandler);
};
// 1. Use the once option
onceButton.addEventListener("click", onceButtonHandler, { once: true });

// 2. Self-remove the handler
// onceButton.addEventListener("click", onceButtonHandler);

// Detect mobile browsers

// 1. Check userAgent (not recommended)
const isMobile1 = /Android|BlackBerry|iPad|iPod|iPhone|webOS/i.test(
  navigator.userAgent
);

// 2. Use feature detection
const isMobile2 = () => {
  const match = window.matchMedia("(pointer:coarse)");
  return match && match.matches;
};

// Detect internet explorer browser
const isIE1 = () => {
  const ua = window.navigator.userAgent;
  return ua.indexOf("MSIE") > -1 || ua.indexOf("Trident") > -1;
};

const isIE2 = () => {
  return !!document.documentMode;
};

// Detect the dark mode
const isDarkMode = () => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

// Detect mac OS browser
const isMacBrowser = () => {
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
};

// Distinguish between left and right mouse clicks
const distinguishLeftRightButton = document.querySelector(
  ".distinguish-between-left-and-right-mouse-clicks__button"
);
distinguishLeftRightButton.addEventListener("mousedown", (e) => {
  let text = "";
  switch (e.button) {
    case 0:
      text = "👈";
      break;
    case 1:
      text = "🖕";
      break;
    case 2:
      text = "👉";
      break;
  }
  const distinguishLeftRightText = document.querySelector(
    ".distinguish-between-left-and-right-mouse-clicks__text"
  );
  distinguishLeftRightText.innerHTML = text;
});

// Determine the height and width of an element
const determineHeight = document.querySelector(
  ".determine-the-height-and-width-of-an-element"
);

determineHeight.addEventListener("click", () => {
  // Get the styles
  const styles = window.getComputedStyle(determineHeight);

  // The size without padding or border
  const height =
    determineHeight.clientHeight -
    parseFloat(styles.paddingTop) -
    parseFloat(styles.paddingBottom);
  const width =
    determineHeight.clientWidth -
    parseFloat(styles.paddingLeft) -
    parseFloat(styles.paddingRight);

  // The size include padding
  const clientheight = determineHeight.clientHeight;
  const clientWidth = determineHeight.clientWidth;

  // The size including padding and border
  const offsetHeight = determineHeight.offsetHeight;
  const offsetWidth = determineHeight.offsetWidth;

  // The size including padding, border, and margin
  const heightWithMargin =
    determineHeight.offsetHeight +
    parseFloat(styles.marginTop) +
    parseFloat(styles.marginBottom);
  const widthWithMargin =
    determineHeight.offsetWidth +
    parseFloat(styles.marginLeft) +
    parseFloat(styles.marginRight);

  // Transfer the value to the html document
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__height"
  ).innerHTML = height;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__width"
  ).innerHTML = width;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__client-height"
  ).innerHTML = clientheight;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__client-width"
  ).innerHTML = clientWidth;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__offset-height"
  ).innerHTML = offsetHeight;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__offset-width"
  ).innerHTML = offsetWidth;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__height-with-margin"
  ).innerHTML = heightWithMargin;
  document.querySelector(
    ".determine-the-height-and-width-of-an-element__width-with-margin"
  ).innerHTML = widthWithMargin;
});

const ready = (cb) => {
  // Check if the `document` is loaded completely
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", (e) => {
        cb();
      })
    : cb();
};

ready(() => {
  console.log("Document is ready!!!");
});

// Get CSS styles of an element
const getCSSStylesOfAnElement = () => {
  const ele = document.querySelector(".get-css-styles-of-an-element");
  const styles = window.getComputedStyle(ele, null);

  // Get the background color
  const bgColor = styles.backgroundColor;
  document.querySelector(".get-css-styles-of-an-element__bg").innerHTML =
    bgColor;

  const textSizeAdjust = styles["-webkit-text-size-adjust"];
  document.querySelector(
    ".get-css-styles-of-an-element__text-adjust"
  ).innerHTML = textSizeAdjust;

  const textColor = styles.getPropertyValue("color");
  document.querySelector(".get-css-styles-of-an-element__color").innerHTML =
    textColor;
};
getCSSStylesOfAnElement();

// Get or set the document title
document.title = "🤔ハローハッピーワールド🤔";

// Get siblings of an element
const siblingsOfAnElement = () => {
  const middle = document.querySelector(".get-siblings-of-an-element__middle");

  // Get the previous sibling
  const prev = middle.previousSibling;
  console.log("Get the previous sibling => ", prev.innerHTML);

  // Get the next sibling
  const next = middle.nextSibling;
  console.log("Get the next sibling => ", next);

  // Get all siblings
  const parent = middle.parentNode;

  // Filter the children , exclude the element
  const siblings = [].slice.call(parent.children).filter((child) => {
    return child !== middle;
  });
  console.log(
    "Get all siblings => ",
    siblings.map((sibling) => sibling.innerHTML.trim())
  );
};
siblingsOfAnElement();

// Get, set and remove attributes
const getSetAndRemove = () => {
  const ele = document.querySelector(".get-set-and-remove-attributes");

  // GET
  const width = ele.getAttribute("width");
  console.log("width => ", width);

  // SET
  const newSrc = "https://pbs.twimg.com/media/E3kqMX5VkAM9L5c.jpg:large";
  ele.setAttribute("src", newSrc);

  // REMOVE
  // ele.removeAttribute("height");
};
getSetAndRemove();

// Get, set and remove data attributes
const getSetDataAttributes = () => {
  const ele = document.querySelector(".get-set-and-remove-data-attributes");

  // Get the data attribute
  const messageBefore = ele.getAttribute("data-test");
  console.log("data-test before => ", messageBefore);

  // Set the data attribute's valu
  ele.setAttribute("data-test", "heyo THE END");
  const messageAfter = ele.getAttribute("data-test");
  console.log("date-test after => ", messageAfter);

  // Remove the data attribute
  ele.removeAttribute("data-test");
  delete ele.dataset["data-test"];
  const messageDeleted = ele.getAttribute("data-test");
  console.log("data-test END => ", messageDeleted);
};
getSetDataAttributes();

// Get the closest element by given selector
const closestElement = () => {
  // 1. Use the native closest() method
  const son = document.querySelector(
    ".get-the-closest-element-by-given-selector__son"
  );
  const result = son.closest("div");
  console.log("result => ", result);

  // 2. Traverse up until finding the matching element
  const matches = (ele, selector) => {
    return (
      ele.matches ||
      ele.matchesSelector ||
      ele.msMatchesSelector ||
      ele.mozMatchesSelector ||
      ele.webkitMatchesSelector ||
      ele.oMatchesSelector
    ).call(ele, selector);
  };

  // Find the closest element to `ele` and matches the `selector`
  const closest = (ele, selector) => {
    let e = ele;
    while (e) {
      if (matches(e, selector)) {
        break;
      }
      e = e.parentNode;
    }
    return e;
  };

  const result2 = closest(son, "div.w-32");
  console.log("result2 => ", result2);
};
closestElement();

// Get or set the HTML of an element
const getSetHTML = () => {
  const outerHtml = document.querySelector(
    ".get-or-set-the-html-of-an-element__outer"
  );

  // Get the HTML
  const innerHtml = outerHtml.innerHTML;

  // Set the HTML
  const innerMostHTML = document.querySelector(
    ".get-or-set-the-html-of-an-element__inner"
  );
  innerMostHTML.innerHTML =
    '<span class="text-white">ハローハッピーワールド！！！</span>';
};
getSetHTML();

// Get the size of the selected file
const getTheSizeFile = () => {
  const fileEle = document.querySelector(
    ".get-size-of-the-selected-file__input"
  );
  const sizeEle = document.querySelector(
    ".get-size-of-the-selected-file__size"
  );

  fileEle.addEventListener("change", (e) => {
    const formatFileSize = (bytes) => {
      const suffixes = ["B", "kB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${suffixes[i]}`;
    };

    const files = e.target.files;
    if (files.length === 0) {
      // Hide the size element if user doesn't choose any file.
      sizeEle.innerHTML = "";
      sizeEle.style.display = "none";
    } else {
      // File size in bytes.
      sizeEle.innerHTML = formatFileSize(files[0].size);

      // Display it.
      sizeEle.style.display = "block";
    }
  });
};
getTheSizeFile();

const getPositionRelative = () => {
  const ele = document.querySelector(
    ".get-the-position-of-an-element-relative-to-the-document__ele"
  );

  // Get the top, left coordinates of the element
  const rect = ele.getBoundingClientRect();

  // Add the scroll position to get the full distance from the element to the top, left sides of the document.
  const top = rect.top + document.body.scrollTop;
  const left = rect.left + document.body.scrollLeft;

  // Project the value on the screen.
  document.querySelector(
    ".get-the-position-of-an-element-relative-to-the-document__left"
  ).innerHTML = left;
  document.querySelector(
    ".get-the-position-of-an-element-relative-to-the-document__top"
  ).innerHTML = top;
};
getPositionRelative();

document.addEventListener("mousewheel", getPositionRelative);

// Get the document height and width.
const getDocumentHeightNWidth = () => {
  // Full height, including the scroll part
  const fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  const fullWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );

  document.querySelector(
    ".get-the-document-height-and-width__height"
  ).innerHTML = fullHeight;
  document.querySelector(
    ".get-the-document-height-and-width__width"
  ).innerHTML = fullWidth;
};
getDocumentHeightNWidth();

// Get the text content of an element.
const getTextContentElement = () => {
  const ele = document.querySelector(".get-the-text-content-of-an-element");
  const textContent = ele.textContent;
  console.log("textContent => ", textContent);
};
getTextContentElement();

// Get the position of an element relative to another.
const getPositionRelativeToAnother = () => {
  const reference = document.querySelector(
    ".get-the-position-of-an-element-relative-to-another__container"
  );
  const target = document.querySelector(".scroll-to-an-element");

  // Get the top, left coordinates of two elements.
  const referenceRect = reference.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // Calculate the top and left positions.
  const top = `${Math.abs(targetRect.top - referenceRect.top).toFixed(2)}px`;
  const left = `${Math.abs(targetRect.left - referenceRect.left).toFixed(2)}px`;

  // Input the value.
  document.querySelector(
    ".get-the-position-of-an-element-relative-to-another__text-top"
  ).innerHTML = top;
  document.querySelector(
    ".get-the-position-of-an-element-relative-to-another__text-left"
  ).innerHTML = left;
};

document.addEventListener("mousewheel", getPositionRelativeToAnother);

// Get the size of an image.
const calculateSize = (url) => {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.addEventListener("load", (e) => {
      resolve({
        width: e.target.width,
        height: e.target.height,
      });
    });

    image.addEventListener("error", () => {
      reject();
    });

    image.src = url;
  });
};
calculateSize("https://go.dev/blog/gopher/header.jpg").then(
  ({ width, height }) => {
    document.querySelector(".get-the-size-of-an-image__height").innerHTML =
      height;
    document.querySelector(".get-the-size-of-an-image__width").innerHTML =
      width;
  }
);

// Get the selected text.
document.addEventListener("selectionchange", () => {
  const selectedText = window.getSelection().toString();
  document.querySelector(".get-the-selected-text").innerHTML = selectedText;
});

// Go back to the previous page.
const goBackToPrevious = () => {
  history.back();

  history.go(-1);
};
// goBackToPrevious();

// Get the parent node of an element.
const getTheParentNode = () => {
  const ele = document.querySelector(".get-the-parent-node-of-an-element");
  const parent = ele.parentNode;
  ele.innerHTML = parent.children[0].innerHTML;
};
getTheParentNode();
