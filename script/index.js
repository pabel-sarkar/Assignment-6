

function removeActiveClass() {
    const activeButton = document.getElementsByClassName("active")

    for (let btn of activeButton) {
        btn.classList.remove("active");
    }
}


document.getElementById('faq-btn').addEventListener('click', () => {
    const callSection = document.getElementById('frequently');
    callSection.scrollIntoView({ behavior: "smooth" })
})



// [
//     {
//         "id": 101,
//         "level_no": 1,
//         "lessonName": "Basic Vocabulary"
//     },
//     {
//         "id": 102,
//         "level_no": 2,
//         "lessonName": "Everyday Words"
//     },
//     {
//         "id": 103,
//         "level_no": 3,
//         "lessonName": "Intermediate Vocabulary"
//     },
//     {
//         "id": 104,
//         "level_no": 4,
//         "lessonName": "Advanced Vocabulary"
//     },
//     {
//         "id": 105,
//         "level_no": 5,
//         "lessonName": "Complex Words"
//     },
//     {
//         "id": 106,
//         "level_no": 6,
//         "lessonName": "Mastering Vocabulary"
//     },
//     {
//         "id": 107,
//         "level_no": 7,
//         "lessonName": "Mastering Vocabulary"
//     }
// ]



// load api 1 data

function loadCategoryBtn() {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then(data => loadCategory(data.data))
}
// loadCategoryBtn()

// loadCategoryBtn()


function specificLessonButton() {
    fetch('https://openapi.programming-hero.com/api/level/5')
        .then((res) => res.json())
        .then(data => displayLesson(data.data))
}


const loadCategoryId = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add("active")
            displayLesson(data.data);
        })
        .catch(err => console.error("Error loading category:", err));
};


// {
//     "status": true,
//     "message": "successfully fetched a word details",
//     "data": {
//         "word": "Cautious",
//         "meaning": "সতর্ক",
//         "pronunciation": "কশাস",
//         "level": 2,
//         "sentence": "Be cautious while crossing the road.",
//         "points": 2,
//         "partsOfSpeech": "adjective",
//         "synonyms": [
//             "careful",
//             "alert",
//             "watchful"
//         ],
//         "id": 3
//     }
// }


const loadDetails = (loadId) => {
    const url = `https://openapi.programming-hero.com/api/word/${loadId}`
fetch(url)
.then(res=>res.json())
.then(data=>displayDetail(data.data))
}

const displayDetail=(load)=>{
console.log(load)
document.getElementById("card_details").showModal();
const detailContainer = document.getElementById("details-container")
detailContainer.innerHTML=`
<h2 class="text-2xl font-bold py-3">${load.word}</h2>
<div class="py-2">
  <p class="font-semibold">Meaning</p>
  <p class="text-sm text-gray-600">${load.meaning}</p>
</div>
<div class="py-2">
  <p class="font-semibold">Example</p>
  <p class="text-sm text-gray-600">${load.sentence}</p>
</div>
<div class="py-3">
  <p>সমার্থক শব্দ গুলো</p>
  <button class="btn">${load.partsOfSpeech}</button>
</div>


`;
}


function loadCategory(categories) {
    const categoriesContainer = document.getElementById('btn-container');
    for (let cat of categories) {
        const div = document.createElement('div');
        div.innerHTML = `
     <button id="btn-${cat.level_no}" onclick="loadCategoryId(${cat.level_no})" class="btn hover:bg-[#422AD5] hover:text-white"><img 
     class="w-5 h-5 hover:bg-white" src="assets/fa-book-open.png" alt="">Lesson-
     ${cat.level_no}</button>
    `;
        categoriesContainer.appendChild(div);
    }
}



// {
//     "id": 147,
//     "level": 5,
//     "word": "Recalcitrant",
//     "meaning": "অধিকারী নয় এমন",
//     "pronunciation": "রিক্যালসিট্রান্ট"
// }


function displayLesson(card) {
    const cardContainer = document.getElementById('lesson-container');

    // cardContainer.innerHTML = "";

    if (card.length === 0) {

        cardContainer.innerHTML = `
         <div class="col-span-full ">
              <div class="py-6 mx-auto rounded-sm ">
                <div class="flex justify-center">
                  <img src="assets/alert-error.png" alt="">
                </div>
                <p class="text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-xl font-semibold text-center">নেক্সট Lesson এ যান</h2>
               </div>
            </div>
         `;
        return;
    }


    for (let cards of card) {
        const buttonCard = document.createElement("div");
        buttonCard.innerHTML = `
        <div class="flex justify-center items-center">
        <div class="bg-white m-2 p-2 w-[540px]">
            <div>
                <h3 class="text-2xl font-bold py-2">${cards.word}</h3>
                <p class="font-medium py-2">${cards.meaning}</p>
                <h2 class="text-2xl font-bold py-2">${cards.pronunciation}</h2>
            </div>
            <div class="flex justify-between">
                <button onclick="loadDetails(${cards.id})" class="btn"><i class="fa-solid fa-exclamation"></i>
                </button>
                <button class="btn"><i class="fa-solid fa-music pr-5"></i>
                </button>
            </div>
        </div>
        </div>
        `
        cardContainer.appendChild(buttonCard);
    }
}

loadCategoryBtn()
// specificLessonButton()



