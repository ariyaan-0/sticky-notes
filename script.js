// variable
const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const popupTitle = popupBox.querySelector("header p");

const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"];

let isUpdate = false;
let updateID;

//getting local storate notes if exists and parsing them to js objec
//else passing an empty array to store notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBox.addEventListener("click", ()=>{
    titleTag.focus()
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
    isUpdate = false;
    titleTag.value = "";
    descTag.value= "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index)=>{
        // console.log(note);
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

        addBox.insertAdjacentHTML("afterend", liTag);
    });

}

showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteID){
    // console.log(noteID);
    let confirmDel = confirm("Are you sure?");
    if(!confirmDel) return;
    //removing selected note
    notes.splice(noteID, 1);
    //Save notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteID, title, desc){
    // console.log(noteID, title, desc)
    addBox.click()
    isUpdate = true;
    updateID = noteID;
    titleTag.value = title;
    descTag.value= desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
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

        if(!isUpdate){
            notes.push(noteInfo); //adding new notes.
        } else{
            notes[updateID] = noteInfo;
            isUpdate = false;
        }
        
        //Save notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});