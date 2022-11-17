const initializeHoverLists = () => {
  const movingUp = () => {
    document.documentElement.style.setProperty("--animation-in", "hover-up");
    document.documentElement.style.setProperty("--animation-out", "unhover-up");
  };

  const movingDown = () => {
    document.documentElement.style.setProperty("--animation-in", "hover-down");
    document.documentElement.style.setProperty(
      "--animation-out",
      "unhover-down"
    );
  };

  if (!window.lastHovered) {
    const lists = document.querySelectorAll(".hover-effect-list");
    const effectEls = document.querySelectorAll("a");

    effectEls.forEach((li) => {
      const activeEvents = ["mouseenter", "focus"];
      const deactiveEvents = ["mouseleave", "blur"];

      // On Hover/Focus
      activeEvents.forEach((event) => {
        li.addEventListener(event, (e) => {
          // Is it the current above or below the last?
          if (e.currentTarget === window.lastHovered) {
            e.offsetY < e.currentTarget.offsetHeight * 0.5
              ? movingDown()
              : movingUp();
          } else {
            e.currentTarget.offsetTop > window.lastHovered?.offsetTop
              ? movingDown()
              : movingUp();
          }
          window.lastHovered = e.currentTarget;
        });
      });

      // On MouseOut/Blur
      deactiveEvents.forEach((event) => {
        li.addEventListener(event, (e) => {
          effectEls.forEach((li) => {
            li.classList.remove("last");
          });
          e.currentTarget.classList.add("last");
        });

        // interesting effect here instead of removing 'last' class from all at once, I like it!
        // const l = e.currentTarget;
        // setTimeout( () =>l.classList.remove('last'), 333 );
      });
    });
  }
};

initializeHoverLists();
