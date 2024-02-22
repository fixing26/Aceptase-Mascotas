const changePhotoButtons = document.querySelectorAll("[data-change-slide-button]");

changePhotoButtons.forEach(button => {
  button.addEventListener("click", () => {
    const photos = document.querySelector(".photos");
    const activePhoto = photos.querySelector("[data-active]");
    const indexActivePhoto = Array.from(photos.children).indexOf(activePhoto);
    let indexNewActivePhoto;

    if (button.dataset.changeSlideButton === "next") {
      indexNewActivePhoto = indexActivePhoto + 1;
    } else {
      indexNewActivePhoto = indexActivePhoto - 1;
    }

    if (indexNewActivePhoto >= photos.children.length) {
      indexNewActivePhoto = 0;
    }

    if (indexNewActivePhoto < 0) {
      indexNewActivePhoto = photos.children.length - 1;
    }

    activePhoto.removeAttribute("data-active");
    photos.children[indexNewActivePhoto].setAttribute("data-active", true);
  });
});
const fav = document.getElementById("fav");
fav.addEventListener("click", function() {
  if (fav.classList.contains("like")) {
    fav.classList.remove("like");
  } else {
    fav.classList.add("like");
  }
});