//Carousel(scrollActive = true/false, buttonsActive = true/false)
Carousel(true, true)

function Carousel(scrollActive = false, buttonsActive = true) {

    const carousel = document.querySelector('.carousel')
    //slides
    const slideContainer = document.querySelector('.slide-container');
    const slides = [...slideContainer.children];
  
    //buttons
    const nextButton = document.querySelector('.btn-right');
    const prevButton = document.querySelector('.btn-left');
  
    //slide width
    let slideWidth = slides[0].getBoundingClientRect().width;
    
    if(scrollActive == true) {
      //mousemove/touchmove scroll
      let moving = false;
      let firstPosition;
      let lastPosition;
          
      const gestureStart = (e) => {
        moving = true;
        firstPosition = e.pageX
      };
          
      const gestureMove = (e) => {      
      
        if (moving) {
                
          e.preventDefault()
          lastPosition = e.pageX
          if(firstPosition > lastPosition) {
            const currentSlide = slideContainer.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            if(nextSlide) {
              moveSlide(currentSlide, nextSlide)
              prevButton.classList.remove('hidden');
              toggleButtons(nextSlide)
            }
      
          } else if(firstPosition < lastPosition) {
              const currentSlide = slideContainer.querySelector('.current-slide');
              const prevSlide = currentSlide.previousElementSibling;
              if(prevSlide) {
                moveSlide(currentSlide, prevSlide)
                toggleButtons(prevSlide)
              }
      
            }
          moving = false
        }
      };
          
      const gestureEnd = () => {
        moving = false;
      };
          
      if (window.PointerEvent) {
        carousel.addEventListener('pointerdown', gestureStart);
        carousel.addEventListener('pointermove', gestureMove);
        carousel.addEventListener('pointerup', gestureEnd);
      } else {
        carousel.addEventListener('touchdown', gestureStart);
        carousel.addEventListener('touchmove', gestureMove);
        carousel.addEventListener('touchup', gestureEnd);  
          
        carousel.addEventListener('mousedown', gestureStart);
        carousel.addEventListener('mousemove', gestureMove);
        carousel.addEventListener('mouseup', gestureEnd);  
      }
    }
  
    slides.forEach(setSlidePosition)
  
  
    window.addEventListener('resize', () => {
      const currentSlide = slideContainer.querySelector('.current-slide');
  
      slideWidth = slides[0].getBoundingClientRect().width;
      slides.forEach(setSlidePosition)
      slideContainer.style.transform = 'translateX(-' + currentSlide.style.left + ')';
    })
      
    if (buttonsActive == true) {
      nextButton.addEventListener('click', () => {
  
        const currentSlide = slideContainer.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        moveSlide(currentSlide, nextSlide)
        prevButton.classList.remove('hidden');
        toggleButtons(nextSlide)
      })
  
      prevButton.addEventListener('click', () => {
  
        const currentSlide = slideContainer.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        moveSlide(currentSlide, prevSlide)
        toggleButtons(prevSlide)
      })
    } else {
      nextButton.style.display = 'none';
      prevButton.style.display = 'none'
    }
     
    //sets slide position according to slide width and index
    function setSlidePosition(slide, index) {
       
      slide.style.left = slideWidth * index + 'px';
    }
  
    //moves slide and sets current slide
    function moveSlide(currentSlide, targetSlide) {
  
      slideContainer.style.transform = 'translateX(-' + targetSlide.style.left + ')';
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
    }
  
    //hides/shows left and right buttons
    function toggleButtons(targetSlide) {
  
      let i = slides.length - 1;
      if (targetSlide == slides[0]) {
        prevButton.classList.add('hidden');
      } else if (targetSlide == slides[i]){
        nextButton.classList.add('hidden');
      } else {
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
      }
    }
}