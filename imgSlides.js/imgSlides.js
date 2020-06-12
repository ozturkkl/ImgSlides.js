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
initSlides()

function initSlides() {
    observer.disconnect()

    slideContainers.forEach((slideContainer) => {
        let images = []
        images = getImages(slideContainer)

        createSlider(slideContainer)
        putImages(slideContainer, images)
        createButtonListeners(slideContainer, images)
    });
    slideContainers.forEach((slideContainer) => {
        observer.observe(slideContainer, observerConfig)
    });
}

function imageListChanged() {
    initSlides()
}

function getImages(container) {
    let images = []

    let containerCanvasElements
    if (container.children[1]) {
        containerCanvasElements = Array.from(container.children[1].children)
        containerCanvasElements.forEach(element => {
            if (element.nodeName === "IMG")
                images.push(element)
        })
    }

    const containerElements = Array.from(container.children)
    containerElements.forEach(element => {
        if (element.nodeName === "IMG")
            images.push(element)
    })
    return images
}
function putImages(container, images) {
    images.forEach((image, index) => {
        container.children[1].appendChild(image)

        const indicator = document.createElement("li")
        container.children[3].appendChild(indicator)
        setAppropriateSize(container)

        if (image.classList.contains("active"))
            indicator.classList.add("active")
    })
    if (!images.some((image) => { return image.classList.contains("active") }) && images.length > 0) {
        images[0].classList.add("active")
        container.children[3].children[0].classList.add("active")
    }
}

function createButtonListeners(container, images) {
    const btnPrev = container.children[0]
    const btnNext = container.children[2]
    const indicators = Array.from(container.children[3].children)

    if (images.length < 2)
        return;

    btnPrev.addEventListener("click", () => {
        if (images[0].classList.contains("active")) {
            return;
        }
        else {
            const imageActive = images.find(imageActive => imageActive.classList.contains("active"))
            imageActive.previousSibling.classList.add("active")
            imageActive.classList.remove("active")

            const indicatorActive = indicators.find(indicator => indicator.classList.contains("active"))
            indicatorActive.previousSibling.classList.add("active")
            indicatorActive.classList.remove("active")
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

            const indicatorActive = indicators.find(indicator => indicator.classList.contains("active"))
            indicatorActive.nextSibling.classList.add("active")
            indicatorActive.classList.remove("active")
            return;
        }
    })
    indicators.forEach(indicator => {
        indicator.addEventListener("click", () => {
            const indicatorClickIndex = indicators.findIndex(indicatorToFind => indicatorToFind === indicator)
            images.forEach(image => {
                image.classList.remove("active")
            })
            indicators.forEach(indicator => {
                indicator.classList.remove("active")
            })
            images[indicatorClickIndex].classList.add("active")
            indicators[indicatorClickIndex].classList.add("active")

        })
    })
}

function createSlider(container) {
    container.innerHTML = ""

    container.appendChild(createPrevButton())
    container.appendChild(createCanvas())
    container.appendChild(createNextButton())
    container.appendChild(createIndicator())
    setAppropriateSize(container)
}

function createIndicator() {
    const indicatorContainer = document.createElement("ul")
    return indicatorContainer
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

function setAppropriateSize(container) {
    const shortestEdge = (container.clientHeight < container.clientWidth) ? container.clientHeight : container.clientWidth

    container.style.borderWidth = shortestEdge / 20 + "px"

    container.children[0].children[0].style.height = container.children[2].children[0].style.height = shortestEdge / 8 + "px"

    container.children[3].style.height = shortestEdge / 25 + "px"
    container.children[3].style.margin = shortestEdge / 25 * 2 + "px 0px"
    Array.from(container.children[3].children).forEach((li) => {
        li.style.width = shortestEdge / 25 + "px"
    })
}

