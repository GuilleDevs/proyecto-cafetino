  const img = document.getElementById("flavor-img");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.querySelector(".close-modal");

  img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  }

  closeModal.onclick = function() {
    modal.style.display = "none";
  }

  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }