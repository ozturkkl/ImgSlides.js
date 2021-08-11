# imgSlides.js
A responsive easy to use image presentation tool with no external dependencies. Developed initially to display portraits.

![image](https://user-images.githubusercontent.com/51798197/129019556-fefe90bf-193f-48d4-b919-51263e004ed4.png)

## Demo
Click [here](https://ozturkkl.github.io/ImgSlides.js/demo/index.html) to view the demo.

## Usage
Fist download the [script file](https://raw.githubusercontent.com/ozturkkl/ImgSlides.js/master/dist/imgSlides.js) and the [css file](https://raw.githubusercontent.com/ozturkkl/ImgSlides.js/master/dist/imgSlides.css) include them in your project.
```html
<link rel="stylesheet" href="imgSlides.css">
<script src="imgSlides.js" defer></script>
```

Create a div element and add "imgSlides" class to it. Set it's width and height according to your preference. The slide will be responsive according to the size that is set for it.
```html
<div class="imgSlides" id="my-image-slide-1">
    <img src="img/rx7-1.jpg" alt="picture of a car">
    <img src="img/rx7-2.jpg" alt="picture of a car">
    <img src="img/rx7-3.jpg" alt="picture of a car">
</div>
```
*That's it, thanks for checking it out! :D*

## Other useful things to know: 
- You can append images directly into the div element and the code will automatically detect changes and re-initialize the imgSlide
```js
const imgSlide = document.querySelector("#my-image-slide-1")

imgSlide.insertAdjacentHTML('beforeend', '<img src="img/rx7-1.jpg" alt="">');
imgSlide.insertAdjacentHTML('beforeend', '<img src="img/rx7-2.jpg" alt="">');
imgSlide.insertAdjacentHTML('beforeend', '<img src="img/rx7-3.jpg" alt="">');
```

- You can empty the div to remove all the images and get an empty canvas.
```js
const imgSlide = document.querySelector("#my-image-slide-1")
imgSlide.innerHTML = ''

// After emptying the imgSlides div element, code will detect the change and re-initialize the canvas. Will result in an empty slide canvas.
```

- If you want to delete a certain image after the slide is initialized, you can find the images in `#my-image-slide-1 .imgSlidesCanvas`:
```js
const images = document.querySelector("#my-image-slide-1 .imgSlidesCanvas")

console.log(images.children)
// Will return an HTML collection that has all the images. You can delete any image using this collection and the slide will update automatically.
```

## License
This project is licensed under the MIT License.
