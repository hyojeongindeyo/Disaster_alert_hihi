const closeButton = document.getElementById('closePopup');

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

const openModalBtn = document.getElementById('open-modal');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementsByClassName('close')[0];

openModalBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'block';
    body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

