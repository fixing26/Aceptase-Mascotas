const allChangePhotoButtons = document.querySelectorAll("[photo-change-slide-button]");

allChangePhotoButtons.forEach(button => {
  button.addEventListener("click", () => {
    const photos = button.closest(".info").querySelector(".photos");
    const activePhoto = photos.querySelector("[photo-active]");
    const indexActivePhoto = Array.from(photos.children).indexOf(activePhoto);
    let indexNewActivePhoto;

    if (button.getAttribute("photo-change-slide-button") === "next") {
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
    activePhoto.removeAttribute("photo-active");
    photos.children[indexNewActivePhoto].setAttribute("photo-active", "true");
  });
});
