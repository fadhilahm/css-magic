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
