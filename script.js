function Gallery(gallery) {
    if(!gallery) {
        throw new Error('No Gallery');
    }

    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function openModal() {
        if(modal.matches('.modal-open')){
            return
        }

        modal.classList.add('modal-open');

        // Event listeners
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }

    function closeModal() {
        modal.classList.remove('modal-open');

        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function handleClickOutside(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    function handleKeyUp (event) {
        if(event.key === 'Escape') closeModal();
        if(event.key === 'ArrowRight') showNextImage();
        if(event.key === 'ArrowLeft') showPrevImage();
    }

    function showNextImage () {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage () {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showImage(el) {
        if(!el) {
            console.info('no image');
            return;
        }
    
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }    

    //listen for clicks on image to show modal
    images.forEach(image => image.addEventListener('click', (event) => showImage(event.currentTarget)));
    //listen for Enter key on image to show modal
    images.forEach(image => image.addEventListener('keyup', (event) => {
        if(event.key == 'Enter'){
            showImage(event.currentTarget);
        }
    }));
    modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery'));

