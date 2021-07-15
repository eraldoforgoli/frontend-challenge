let slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides");

function slide(wrapper, items) {
  let posX1 = 0,
    posX2 = 0,
    initialPosition,
    finalPosition,
    slides = items.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName("slide")[0].offsetWidth,
    currentIndex = 0,
    allowShift = true;

  const SLIDE_THRESHOLD = 100;

  wrapper.classList.add("loaded");

  // Mouse events for desktop
  items.onmousedown = onDragStart;

  // Touch events for mobile
  items.addEventListener("touchstart", onDragStart);
  items.addEventListener("touchend", onDragEnd);
  items.addEventListener("touchmove", onDragAction);

  // Transition events
  items.addEventListener("transitionend", onItemTransitioned);

  function onDragStart(e) {
    e = e || window.event;
    e.preventDefault();
    initialPosition = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = onDragEnd;
      document.onmousemove = onDragAction;
    }
  }

  function onDragAction(e) {
    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function onDragEnd() {
    finalPosition = items.offsetLeft;
    const shouldMoveToTheNextSlide =
      finalPosition - initialPosition < -SLIDE_THRESHOLD &&
      currentIndex < slidesLength - 1;
    const shouldMoveToPreviousSlide =
      finalPosition - initialPosition > SLIDE_THRESHOLD && currentIndex > 0;

    if (shouldMoveToTheNextSlide) shiftSlide(1);
    else if (shouldMoveToPreviousSlide) shiftSlide(-1);
    else items.style.left = initialPosition + "px";

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(direction) {
    items.classList.add("shifting");

    if (allowShift) {
      if (direction == 1) {
        items.style.left = initialPosition - slideSize + "px";
        currentIndex++;
      } else if (direction == -1) {
        items.style.left = initialPosition + slideSize + "px";
        currentIndex--;
      }
    }

    allowShift = false;
  }

  function onItemTransitioned() {
    items.classList.remove("shifting");

    if (currentIndex == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      currentIndex = slidesLength - 1;
    }

    if (currentIndex == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      currentIndex = 0;
    }

    allowShift = true;
  }
}

slide(slider, sliderItems);
