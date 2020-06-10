// SVG
const arrowSvg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
x="0px" y="0px" viewBox="0 0 492 492" xml:space="preserve">
<g>
    <g>
        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" />
    </g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`

// CREATE OBSERVER FOR CHANGES IN IMAGE COUNT
const observerConfig = { attributes: false, childList: true, subtree: true }
const observer = new MutationObserver(imageListChanged)

// INITIALIZE SLIDER FOR EACH CONTAINER WITH ".imgSlides"
const slideContainers = document.querySelectorAll(".imgSlides")
let slideInitialized = false
initializeSlides()

function initializeSlides() {
    slideContainers.forEach((slideContainer) => {
        let images = []
        images = getImages(slideContainer)

        slideContainer.innerHTML = ""
        createSlider(slideContainer)
        putImages(slideContainer, images)
    });
    refreshSlides()
    slideInitialized = true;
}

function refreshSlides() {
    observer.disconnect()

    slideContainers.forEach((slideContainer) => {
        let images = []
        images = getImages(slideContainer.children[1])

        slideContainer.innerHTML = ""
        createSlider(slideContainer)
        putImages(slideContainer, images)
        createButtonListeners(slideContainer, images)
    });
    slideContainers.forEach((slideContainer) => {
        observer.observe(slideContainer, observerConfig)
    });
}

function imageListChanged(mutationsList, observer) {
    refreshSlides()
}

function getImages(container, images) {
    return Array.from(container.children)
}
function putImages(container, images) {
    images.forEach((image, index) => {
        container.children[1].appendChild(image)
        if (!slideInitialized && index === 0)
            image.classList.add("active")
    })
}

function createButtonListeners(container, images) {
    const btnPrev = container.children[0]
    const btnNext = container.children[2]

    if (images.length === 1)
        return;

    btnPrev.addEventListener("click", () => {
        if (images[0].classList.contains("active")) {
            return;
        }
        else {
            const imageActive = images.find(imageActive => imageActive.classList.contains("active"))
            imageActive.previousSibling.classList.add("active")
            imageActive.classList.remove("active")
            return;
        }
    })
    btnNext.addEventListener("click", () => {
        if (images[images.length - 1].classList.contains("active")) {
            return;
        }
        else {
            const imageActive = images.find(imageActive => imageActive.classList.contains("active"))
            imageActive.nextSibling.classList.add("active")
            imageActive.classList.remove("active")
            return;
        }
    })
}

function createSlider(container) {
    container.appendChild(createPrevButton())
    container.appendChild(createCanvas())
    container.appendChild(createNextButton())
    setAppropriateSize(container)
}

function createPrevButton() {
    const btnPrev = document.createElement("button")
    btnPrev.innerHTML = arrowSvg
    btnPrev.classList.add("imgSlidesPrevBtn", "imgSlidesBtn")
    return btnPrev
}
function createCanvas() {
    const canvas = document.createElement("div")
    canvas.classList.add("imgSlidesCanvas")
    return canvas
}
function createNextButton() {
    const btnNext = document.createElement("button")
    btnNext.innerHTML = arrowSvg
    btnNext.classList.add("imgSlidesNextBtn", "imgSlidesBtn")
    return btnNext
}

function setAppropriateSize(container){
    const shortestEdge = (container.clientHeight < container.clientWidth) ? container.clientHeight : container.clientWidth
    container.style.borderWidth = shortestEdge / 20 + "px"
    container.children[0].children[0].style.height = container.children[2].children[0].style.height = shortestEdge / 8 + "px"
}

