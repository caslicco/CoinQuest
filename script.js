document.addEventListener("DOMContentLoaded", function() {
    loadNotices();
    loadImages();
});

function addNotice() {
    var noticeInput = document.getElementById("noticeInput");
    var noticeText = noticeInput.value.trim();

    if (noticeText !== "") {
        var noticeList = document.getElementById("noticeList");
        var li = document.createElement("li");
        li.textContent = noticeText;
        noticeList.appendChild(li);

        saveNotice(noticeText);

        noticeInput.value = "";
    } else {
        alert("Please enter a notice before adding.");
    }
}

function saveNotice(notice) {
    var notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.push(notice);
    localStorage.setItem("notices", JSON.stringify(notices));
}

function loadNotices() {
    var notices = JSON.parse(localStorage.getItem("notices")) || [];
    var noticeList = document.getElementById("noticeList");

    if (notices.length > 0) {
        notices.forEach(function(notice) {
            var li = document.createElement("li");
            li.textContent = notice;
            noticeList.appendChild(li);
        });
    }
}

function uploadImage() {
    var fileInput = document.getElementById("imageInput");
    var file = fileInput.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imageData = e.target.result;
            displayImage(imageData);
            saveImage(imageData);
        };
        reader.readAsDataURL(file);
    }
}

function displayImage(imageData) {
    var uploadedImages = document.getElementById("uploadedImages");
    var img = document.createElement("img");
    img.src = imageData;
    uploadedImages.appendChild(img);
}

function saveImage(imageData) {
    var images = JSON.parse(localStorage.getItem("images")) || [];
    images.push(imageData);
    localStorage.setItem("images", JSON.stringify(images));

    // Update carousel
    updateCarousel(images);
}

function loadImages() {
    var images = JSON.parse(localStorage.getItem("images")) || [];
    updateCarousel(images);
}

function updateCarousel(images) {
    var carouselInner = document.getElementById("carouselInner");
    carouselInner.innerHTML = "";

    images.forEach(function(image, index) {
        var carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
            carouselItem.classList.add("active");
        }

        var img = document.createElement("img");
        img.src = image;
        img.classList.add("d-block", "w-100");

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
    });
}
