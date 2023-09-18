const loadPhone = async(searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
    
}


const displayPhones = (phones,isShowAll) => {
    // console.log(phones)
    //1 get the parents section
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards
    phoneContainer.textContent = "";




    // display show all button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('isShowAll',isShowAll)

    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }


    phones.forEach(phone => {
        // console.log(phone)
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-sky-100 p-4 shadow-xl mx-auto w-84`
        // 3 set innerText and innerHtml 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title mx-auto font-medium text-3xl">${phone.phone_name}</h2>
          <p class="mx-auto">There are many variations of passages of available, but the majority have suffered</p>
          <h4 class="text-2xl text-center text-gray-800">$999</h4>
          <div class="card-actions">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</button>
          </div>
        </div>
        `;

        // 4 append child section
        phoneContainer.appendChild(phoneCard)


    });
    // hide progress spinner
    toggleProgressSpinner(false);

}


// Show Details button

const handleShowDetails = async (id) =>{
    // console.log('clicked show details',id)
    // load single phone  data

    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)

}


const showPhoneDetails = (phone) =>{
    console.log(phone);
    const showDetailPhoneName = document.getElementById('show-detail-phone-name');
    showDetailPhoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img class="mx-auto my-6" src="${phone.image}" alt="">
        <p class="my-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chicest: </span>${phone?.mainFeatures?.chipSet}</p>
    
        <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    
        <p><span class="font-bold">Slug: </span>${phone?.slug}</p>

        
    
        <p><span class="font-bold">Release data : </span>${phone?.releaseDate}</p>

        <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
        

        <p><span class="font-bold">Release data : </span>${phone?.others?.GPS || 'No GPS available'}</p>
    
    `

    // show the modal
    show_details_modal.showModal()
}




// handle search button

// const handleSearch = () =>{
//     const searchField = document.getElementById('search-field');
//     const searchText = searchField.value;
//     // console.log(searchText);
//     loadPhone(searchText)
//     searchField.value = "";
// }

const handleSearch1 = (isShowAll) =>{
    toggleProgressSpinner(true)
    const searchField1 = document.getElementById('search-field1');
    const searchText1 = searchField1.value;
    loadPhone(searchText1,isShowAll); 
    
}

const toggleProgressSpinner = (isProgress) => {
    const loadingProgress = document.getElementById('loading-progress');
    if(isProgress){
        loadingProgress.classList.remove('hidden')
    }
    else{
        loadingProgress.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () =>{
    handleSearch1(true);
}


loadPhone();