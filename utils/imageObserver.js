let targetObserver;
export function imageObserver(imagesArr) {
  const options = {
    root: null,
    rootMargin: "30px 0px",
    threshold: 1.0, //don't show image until every pixel is visible.
  }

  const loadImage = (image) => {
    image.classList.add("image-observer-fade-in");
    image.src = image.dataset.src;
  };

  const handler = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  // Check if the IntersectionObserver is supported or not
  if ("IntersectionObserver" in window) {
    // LazyLoad images using IntersectionObserver
    const observer = new IntersectionObserver(handler, options);
    targetObserver = observer;
    imagesArr.forEach((img) => observer.observe(img));
  } else {
    // Load all images at once
    imagesArr.forEach((image) => loadImage(image));
  }
}

export function disconnectImageObserver() {
  targetObserver.disconnect();
}
