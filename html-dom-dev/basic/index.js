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
