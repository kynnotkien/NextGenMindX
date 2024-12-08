const firebaseConfig = {
    apiKey: "AIzaSyBzlvmEsyqudNH3mPYnEJv7Iq4l48Y8Ea0",
    authDomain: "nextgenmindx.firebaseapp.com",
    databaseURL: "https://nextgenmindx-default-rtdb.firebaseio.com",
    projectId: "nextgenmindx",
    storageBucket: "nextgenmindx.firebasestorage.app",
    messagingSenderId: "280073077017",
    appId: "1:280073077017:web:7d8743c4674e1b3e8ec588"
};

// Khoi tao firebase
const app = firebase.initializeApp(firebaseConfig)
// Khoi tao noi chua du lieu web
const database = firebase.database()

// Form elements
const addForm = document.getElementById('addForm')
const apartmentName = document.getElementById('apartmentName')
const apartmentPrice = document.getElementById('apartmentPrice')
const apartmentDescription = document.getElementById('apartmentDescription')
const imageUpload = document.getElementById('imageUpload')
const updateForm = document.getElementById('updateForm')
const updateName = document.getElementById('updateName')
const updatePrice = document.getElementById('updatePrice')
const updateDescription = document.getElementById('updateDescription')
const updateImageUpload = document.getElementById('updateImageUpload')
const apartmentList = document.getElementById('apartmentList')

//Them san pham vào firebase (add data to firebase)
addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = apartmentName.value
    const price = apartmentPrice.value
    const description = apartmentDescription.value
    const image = imageUpload.files[0]

    if (image) {
        const reader = new FileReader()
        reader.onloadend = () => {
            const imageData = reader.result
            const newApartmentRef = database.ref('apartments').push()
            newApartmentRef.set({
                name: name,
                price: price,
                description: description,
                image: imageData
            }).then(() => {
                alert("Thêm sản phẩm thành công vào website")
                resetAddForm()
                displayApartment()
            })
        }
         reader.readAsDataURL(image) 
    }
})

// Reset khung thông tin thêm sản phẩm
function resetAddForm() {
    apartmentName.value = ''
    apartmentPrice.value = ''
    apartmentDescription.value = ''
    imageUpload.value = ''
}

// Hiển thị sản phẩm lên màn hình
function displayApartment() {
    apartmentList.innerHTML = ""
    database.ref('apartments').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const apartment = childSnapshot.val()
            const apartmentDiv = document.createElement('div')
            apartmentDiv.classList.add('apartment')
            apartmentDiv.innerHTML = `
                <h4>${apartment.name}</h4>
                <p>${apartment.description}</p>
                <p>${apartment.price}</p>
                <img src = "${apartment.image}">
                <button onclick = "editApartment('${childSnapshot.key}')">Edit</button>
                <button onclick = "deleteApartment('${childSnapshot.key}')">Delete</button>
            `
            apartmentList.appendChild(apartmentDiv)
        })
    })
}

// Kích hoạt chạy hàm hiển thị sản phẩm lên màn hình
displayApartment()