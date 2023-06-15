// menu button for mobile 

function myFunction() {
    if (window.matchMedia("(min-width: 380px) and (max-width: 767px)").matches) {
        if (document.getElementById('myLinks').style.display == "block") {
            document.getElementById('myLinks').style.display = 'none'
        } else {
            document.getElementById('myLinks').style.display = "block"
        }
    } else {
        document.getElementById('myLinks').style.display = 'flex'
    }
}


document.querySelector('main').addEventListener('click', handler)
function handler() {
    if (window.matchMedia("(min-width: 380px) and (max-width: 767px)").matches) {
        document.getElementById('myLinks').style.display = 'none'
    }

};

// buttons in SERVICE SECTION


// when click button become blur
document.getElementById('garden_btn').addEventListener('click', (event) => {
    blurProcessing(event.target)
})
document.getElementById('lawn_btn').addEventListener('click', (event) => {
    blurProcessing(event.target)
})
document.getElementById('plant_btn').addEventListener('click', (event) => {
    blurProcessing(event.target)
})

let mapping = {
    ["garden_btn"]: "garden",
    ["lawn_btn"]: "lawn",
    ["plant_btn"]: "plant",
}


function blurProcessing(btn) {
    btn.classList.toggle("active_button")
    restrictButtons(btn)

    let allActiveButtons = document.querySelectorAll(".button_srv.active_button")
    if (allActiveButtons.length > 0) {
        applyBlur(allActiveButtons)
    } else {
        unBlurAll();
    }
}

// remove class active button from the last button if all buttons are clicked
function restrictButtons(btn) {
    let allActiveButtons = document.querySelectorAll(".button_srv.active_button")
    if(allActiveButtons.length === 3) {
        btn.classList.remove("active_button")
    }
}

// unblur pictures that belong to active buttons
function applyBlur(allActiveButtons) {
    let classesNotToBlur = []
    for (btn of allActiveButtons) {
        classesNotToBlur.push(mapping[btn.id])
    }
    blurAll()
    for (notToBLur of classesNotToBlur) {
        unBlurOne(notToBLur)
    }
}


function blurAll() {
    let imgs = document.querySelectorAll("div.service_pic > div")
    for (image of Array.from(imgs)) {
        image.classList.add("blur")
    }
}

function unBlurAll() {
    let imgsBlurred = document.querySelectorAll("div.service_pic > div")
    for (image of Array.from(imgsBlurred)) {
        image.classList.remove("blur")
    }
}

// unblur pictures that belong to the same button
function unBlurOne(imgClass) {
    let imgsBlurred = document.querySelectorAll("div.service_pic > div." + imgClass)
    for (image of Array.from(imgsBlurred)) {
        image.classList.remove("blur")
    }
}


//ACCORDIONS buttons in PRICE SECTION

let accordion = document.querySelectorAll('.accordion')

accordion.forEach((item) => {
    let header = item.querySelector('header')
    header.addEventListener('click', (event) => {
        item.classList.toggle('open')

        if (item.classList.contains('open')) {
            for (acc of accordion) {
                if (acc != event.target.parentNode) {
                    acc.classList.remove("open")
                }
            }
        }
    })

})

//ACCORDIONS button in CONTACT SECTION

document.querySelector('.header_button').addEventListener('click', (index) => {
    let part = document.querySelector('.button_cont')
    part.classList.toggle('active')

    let des = part.querySelector('.accordion_part')
    if (part.classList.contains('active')) {
        des.style.height = `${des.scrollHeight}px`
    } else {
        des.style.height = '0px'
    }

    if(document.querySelector('.button_cont.active')) {
        document.querySelector('.hidden').style.visibility = 'hidden'
    }

})

let allCities = document.querySelectorAll('.city')
allCities.forEach((city) => {

    city.addEventListener('click', (event) => {
        document.querySelector('.btn_cont').textContent = event.target.textContent
        document.querySelector('.button_cont').classList.toggle('active')
        
        document.querySelector('.btn_cont').classList.add('fontSize')
        document.querySelector('.accordion_part').style.height = '0px'
        // BUTTON WITH ADDRESS
        document.querySelector('.hidden').style.visibility = 'visible'
        document.querySelector('.header_button').style.backgroundColor = 'rgb(193, 230, 152)'

        let cityData = address[event.target.textContent]
        setAddress(cityData)

        if (window.matchMedia("(min-width: 380px) and (max-width: 767px)").matches) {
            document.querySelector('.img_woman').style.display = 'none'
        }

        if(document.querySelector('.accordion_part').style.height = '0px') {
            changeButton()
        }

    })
})

function changeButton() {
    document.querySelector('.btn_cont').style.setProperty('--check-secondary', "url('/img/unact_drop_btn.png')")
}

// BUTTON WITH ADDRESS

let address = {
    ["Canandaigua, NY"]: {
        city: "Canandaigua, NY",
        phone: "+1 585 393 0001",
        address: "151 Charlotte Street"
    },
    ["New York City"]: {
        city: "New York City",
        phone: "+1 212 456 0002",
        address: "9 East 91st Street"
    },
    ["Yonkers, NY"]: {
        city: "Yonkers, NY",
        phone: "+1 914 678 0003",
        address: "511 Warburton Ave"
    },
    ["Sherrill, NY"]: {
        city: "Sherrill, NY",
        phone: "+1 315 908 0004",
        address: "14 WEST Noyes BLVD"
    }
}

function setAddress(cityData) {
    document.querySelector('address').querySelectorAll('span').item(0).textContent = cityData.city
    document.querySelector('address').querySelectorAll('span').item(1).textContent = cityData.phone
    document.querySelector('address').querySelectorAll('span').item(2).textContent = cityData.address
}


// BUTTON CALL US

function onCall() {
    let number = document.querySelector('address').querySelectorAll('span').item(1).textContent
    window.open('tel:' + number)
}
