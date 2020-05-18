const divContainer = document. querySelector('.container');
const url = 'https://randomuser.me/api/?results=12';

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch(url)
.then(response => response.json())
.then(data => 
    data.results.map(data => {
        let card = document.createElement('section');
        let info = document. createElement('div');
            card.className = 'card';
            info.className = 'info';
            divContainer.appendChild(card);
            card.appendChild(info);        
    const randomImage = data.picture.large;
    const randomName = `${data.name.first} ${data.name.last}`
    const randomEmail = data.email;
    const randomLocation = data.location.city;
    generateImage(randomImage);
    generateName(randomName);    
    generateEmail(randomEmail);
    generateLocation(randomLocation);

    // ------------------------------------------
    //  HELPER FUNCTIONS
    // ------------------------------------------

    function generateImage(data) {
        const img = document.createElement('img')
        img.src = data;
        card.insertBefore(img, card.childNoder);
    }
    
    function generateName (data) {
        const name = data;
        const h2 = document.createElement('h2');
        h2.innerHTML = name;
        info.appendChild(h2);
    
    }
    
    function generateEmail (data) {
        const email = data;
        const emailDiv = document.createElement('a');
        emailDiv.innerHTML = email;
        info.appendChild(emailDiv);
    }
    
    function generateLocation (data) {
        const location = data;
        const p = document.createElement('p');
        p.innerHTML = location;
        info.appendChild(p);
    }
    
    
}   
)
)

// Modal Part //
const overlay = document.getElementById('overlay');
const wrap = document.getElementById('wrap');

wrap.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.tagName === 'SECTION' 
        || e.target.tagName === 'IMG' 
        || e.target.tagName ==='DIV')
         {  console.log(e.target);
            overlay.style.display = 'flex';
        }

    });

