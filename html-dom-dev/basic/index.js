// Select the children of an element
const element = document.querySelector(".select-the-children-of-an-element");
const childNodes = element.children;
const first = childNodes[0];
const last = childNodes[childNodes.length - 1];
console.log("Should contain the content of first child => ", first.innerHTML);
console.log("Should contain the content of last child => ", last.innerHTML);

// Scroll to an element
const element2 = document.querySelector(".scroll-to-an-element__scroll-target");
setInterval(() => {
  console.log("scrollIntoView()");
  //   element2.scrollIntoView();
  element2.scrollIntoView({ behavior: "smooth" });
}, 200);
