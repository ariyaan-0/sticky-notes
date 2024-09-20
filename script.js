// variable
const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");

const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"];

//getting local storate notes if exists and parsing them to js objec
//else passing an empty array to store notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", ()=>{
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
    popupBox.classList.remove("show");
});

function showNotes(){
    
}

addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;
    
    if(noteTitle || noteDesc){
        //getting date
        let dateObj = new Date()
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        };

        // console.log(noteInfo)

        notes.push(noteInfo); //adding new notes.
        //Save notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();

    }
});