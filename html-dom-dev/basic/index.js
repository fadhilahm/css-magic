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
newElement.classList.add("w-content", "h-20", "bg-red-500", "text-white", "px-3", "flex", "items-center");
newElement.innerHTML = "ハローハッピーワールド！！！！";
const newElementContainer = document.querySelector(".create-an-element");
newElementContainer.appendChild(newElement);
