const wrap = document.getElementById('wrap');
const url = 'https://randomuser.me/api/?results=12&&nat=ie';

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch(url)
    .then(response => response.json())
    .then(data =>
        data.results.map(data => {
            let card = document.createElement('section');
            let info = document.createElement('div');
            card.className = 'card';
            info.className = 'info';
            wrap.appendChild(card);
            card.appendChild(info);
            const randomImage = data.picture.large;
            const randomName = `${data.name.first} ${data.name.last}`
            const randomEmail = data.email;
            const randomLocation = data.location.city;
            const randomCellNumber = data.cell;
            const randomDetailedLocation = `${data.location.street.name} ${data.location.city}, ${data.location.state}, ${data.location.postcode}`;
            const randomDob = data.dob.date.substring(0, 10);
            generateImage(randomImage);
            generateName(randomName);
            generateEmail(randomEmail);
            generateLocation(randomLocation);

            // Detailed Info
            const div = document.createElement('div');
            div.className = 'detailed-wrap';
            generateCellNumber(randomCellNumber);
            generateDetailedLocation(randomDetailedLocation);
            generateDob(randomDob);

            // ------------------------------------------
            //  HELPER FUNCTIONS
            // ------------------------------------------

            // Image
            function generateImage(data) {
                const img = document.createElement('img')
                img.src = data;
                card.insertBefore(img, card.childNoder);
            }

            // Name
            function generateName(data) {
                const name = data;
                const h2 = document.createElement('h2');
                h2.innerHTML = name;
                info.appendChild(h2);

            }

            // Email
            function generateEmail(data) {
                const email = data;
                const emailDiv = document.createElement('a');
                emailDiv.innerHTML = email;
                info.appendChild(emailDiv);
            }


            // Location
            function generateLocation(data) {
                const location = data;
                const p = document.createElement('p');
                p.innerHTML = location;
                info.appendChild(p);
            }

            // Cell Number
            function generateCellNumber(data) {
                const cellNumber = data;
                const p = document.createElement('p');
                p.innerHTML = cellNumber;
                info.appendChild(div);
                div.appendChild(p);
            }

            // Detailed Location including Street, City, State and Postcode
            function generateDetailedLocation(data) {
                const detailedLocation = data;
                const p = document.createElement('p');
                p.innerHTML = detailedLocation;
                info.appendChild(div);
                div.appendChild(p);

            }

            // Dob
            function generateDob(data) {
                const dobDate = data;
                const p = document.createElement('p')
                p.innerHTML = dobDate;
                info.appendChild(div);
                div.appendChild(p);
            }

        })
    )

// Modal Part //
const overlay = document.getElementById('overlay');
const modalWindow = document.getElementById('modal-window');
const imageDiv = document.createElement('div');
const newDiv = document.createElement('div');
const closeDiv = document.createElement('div');
const detailedDisplayWrap = document.createElement('div');
const rightArrowDiv = document.createElement('div');
const leftArrowDiv = document.createElement('div');
const cards = document.getElementsByClassName('card');


wrap.addEventListener('click', (e) => {
    if (e.target.tagName === 'SECTION') {
        overlay.style.display = 'flex';
        modalWindow.style.display = 'block';
        const info = e.target.childNodes[0];
        const imageSrc = e.target.childNodes[1].src;

        popUp(info, imageSrc);
        arrowFunction()
        closeFunction();
        
        
    }
    if (e.target.tagName === 'H2' ||
        e.target.tagName === 'A' ||
        e.target.tagName === 'P') {
        overlay.style.display = 'flex';
        modalWindow.style.display = 'block';
        const info = e.target.parentNode;
        const sectionCard = info.parentNode;
        const imageSrc = sectionCard.childNodes[1].src;

        popUp(info, imageSrc);
        arrowFunction();
        closeFunction();
        

    }
    if (e.target.tagName === 'IMG') {
        overlay.style.display = 'flex';
        modalWindow.style.display = 'block';
        const sectionCard = e.target.parentNode;
        const info = sectionCard.childNodes[0];
        const imageSrc = sectionCard.childNodes[1].src;

        popUp(info, imageSrc);
        arrowFunction();
        closeFunction();
        

    }


});

// Display Modal Window Function
function popUp(info, imageSrc) {

    const name = info.childNodes[0];
    const email = info.childNodes[1];
    const city = info.childNodes[2];

    const modalImage = document.createElement('img');
    const modalName = document.createElement('h2');
    const modalEmail = document.createElement('a');
    const modalCity = document.createElement('p');
    modalImage.src = imageSrc;
    modalName.innerHTML = name.innerHTML;
    modalEmail.innerHTML = email.innerHTML;
    modalCity.innerHTML = city.innerHTML;
    imageDiv.appendChild(modalImage);
    newDiv.appendChild(modalName);
    newDiv.appendChild(modalEmail);
    newDiv.appendChild(modalCity);

    // Detailed Info

    imageDiv.className = 'image-div';
    newDiv.className = 'new-div';
    closeDiv.className = 'close-div';
    modalWindow.appendChild(closeDiv);
    modalWindow.appendChild(imageDiv);
    modalWindow.appendChild(newDiv);
    detailedDisplayWrap.innerHTML = info.lastChild.innerHTML;
    modalWindow.appendChild(detailedDisplayWrap);
    detailedDisplayWrap.className = 'detailed-display-wrap';

    // Close Modal Window
    closeMark = document.createElement('p');
    closeDiv.appendChild(closeMark);
    closeMark.innerHTML = '&#10799';

    // Right Arrow Mark
    modalWindow.appendChild(rightArrowDiv);
    rightArrowDiv.className = 'right-arrow-div'
    rightArrowDiv.innerHTML = '>';


    // Left Arrow Mark
    modalWindow.appendChild(leftArrowDiv);
    leftArrowDiv.className = 'left-arrow-div';
    leftArrowDiv.innerHTML = '<';

    console.log(imageDiv);

}

// Display Next Person
function nextPerson(nextInfo, nextImageSrc) {

    const nextName = nextInfo.childNodes[0];
    const nextEmail = nextInfo.childNodes[1];
    const nextCity = nextInfo.childNodes[2];

    const currentModalWindow = document.getElementById('modal-window');

    const nextModalImageDiv = currentModalWindow.childNodes[1];
    nextModalImageDiv.firstChild.src = nextImageSrc;

    const nextModalNewDiv = currentModalWindow.childNodes[2];
    nextModalNewDiv.childNodes[0].innerHTML = nextName.innerHTML;
    nextModalNewDiv.childNodes[1].innerHTML = nextEmail.innerHTML;
    nextModalNewDiv.childNodes[2].innerHTML = nextCity.innerHTML;
    detailedDisplayWrap.innerHTML = nextInfo.lastChild.innerHTML;

}

// Display Previous Person
function previousPerson(previousInfo, previousImageSrc) {

    const previousName = previousInfo.childNodes[0];
    const previousEmail = previousInfo.childNodes[1];
    const previousCity = previousInfo.childNodes[2];

    const currentModalWindow = document.getElementById('modal-window');

    const previousModalImageDiv = currentModalWindow.childNodes[1];
    previousModalImageDiv.firstChild.src = previousImageSrc;

    const previousModalNewDiv = currentModalWindow.childNodes[2];
    previousModalNewDiv.childNodes[0].innerHTML = previousName.innerHTML;
    previousModalNewDiv.childNodes[1].innerHTML = previousEmail.innerHTML;
    previousModalNewDiv.childNodes[2].innerHTML = previousCity.innerHTML;
    detailedDisplayWrap.innerHTML = previousInfo.lastChild.innerHTML;

}

// Close & Reset Function
function closeFunction() {
    closeMark.addEventListener('click', () => {
        imageDiv.innerHTML = '';
        newDiv.innerHTML = '';
        closeDiv.innerHTML = '';
        detailedDisplayWrap.innerHTML = '';
        overlay.style.display = 'none';
        modalWindow.style.display = 'none';

    });
}

// Arrow Function
function arrowFunction() {
    // Right Arrow for Displaying the Next Person
    rightArrowDiv.addEventListener('click', () => {

        for (let i = 0; i < cards.length; i += 1)
            if (imageDiv.firstElementChild.src === cards[i].lastElementChild.src) {
                const nextSection = cards[i + 1];
                const nextInfo = nextSection.childNodes[0];
                const nextImageSrc = nextSection.childNodes[1].src;
                nextPerson(nextInfo, nextImageSrc);
                break;
            } 
            
    });

    // Left Arrow for Displaying the Previous Person
    leftArrowDiv.addEventListener('click', () => {
        for (let i = 0; i < cards.length; i += 1) {
            if (imageDiv.firstElementChild.src === cards[i].lastElementChild.src) {
                const previousSection = cards[i - 1];
                const previousInfo = previousSection.childNodes[0];
                const previousImageSrc = previousSection.childNodes[1].src;
                previousPerson(previousInfo, previousImageSrc);
                break;

            }
        }
    });
}

// Search/Filter Function
function nameFilterFunction() {
    const input = document.getElementById('name');
    const filter = input.value.toUpperCase();
    console.log(input);
    console.log(filter);
    
    for (i = 0; i < cards.length; i += 1) {
        searchName = cards[i].firstElementChild.getElementsByTagName('h2')[0];
        txtValue = searchName.textContent || serachName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }

}

