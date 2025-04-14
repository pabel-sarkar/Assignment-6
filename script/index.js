
document.getElementById('faq-btn').addEventListener('click',()=>{
    const callSection = document.getElementById('frequently');
    callSection.scrollIntoView({behavior: "smooth"})
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

function loadCategoryBtn () {
    fetch('https://openapi.programming-hero.com/api/levels/all')
   .then((res)=>res.json())
   .then(data=>displayCategory(data.data))
}

function displayCategory (categories){
const categoriesContainer = document.getElementById('btn-container');
for(let cat of categories){
    const div = document.createElement('div');
    div.innerHTML=`
     <button class="btn hover:bg-[#422AD5] hover:text-white"><img 
     class="w-5 h-5 hover:bg-white" src="assets/fa-book-open.png" alt="">Lesson-
     ${cat.level_no}</button>
    `;
    categoriesContainer.appendChild(div);
}
}

loadCategoryBtn()