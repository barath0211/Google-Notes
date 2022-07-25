const modalBox=document.querySelector(".modalBox");
const addNote=document.querySelector("#takeText");
const tagDescription=document.querySelector(".getDescription");
const tagTitle=document.querySelector(".getTitle");
const closeBtn=modalBox.querySelector("#closeBtn");
let addBtn=modalBox.querySelector( "#addBtn");


//SAVING NOTES
const notes=JSON.parse(localStorage.getItem("notes") ||"[]");
let update= false,updateId;
addNote.addEventListener("click", (event) =>{
    event.preventDefault();
    tagTitle.focus();
       modalBox.classList.add("show");
});
window.onclick = function(e){
    if(e.target == modalBox){
        modalBox.classList.remove("show")
    }
};
closeBtn.addEventListener("click", () =>{ 
    update=false;
    tagTitle.value="";
    tagDescription.value="";
    addBtn.innerText= "add note";
    modalBox.classList.remove("show");
});



function displayNotes(){
    document.querySelectorAll(".note").forEach(note =>note.remove());
    notes.forEach((note,index)=> {
        let content=`<li class="note">
                            <div class="content"><h4>${note.title}</h4><p>${note.description}</p>
                            </div>
                                <ul class="menu">
                                    <li onclick="editNotes(${index},'${note.title}', '${note.description}')"><button class="editbtn">Edit </button></li>
                                    <li onclick="deleteNotes(${index})"><button class="delete-btn">Delete</button></li>
                                </ul>
                            </div>
    </li>`
    addNote.insertAdjacentHTML("afterend",content);
    });
}
 displayNotes();


 //DELETE A NOTE
function deleteNotes(noteId){
     notes.splice(noteId,1);
     localStorage.setItem("notes",JSON.stringify(notes));
     displayNotes(); 
}


//EDIT A NOTE
function editNotes(noteId,title,description){
    update= true;
    updateId=noteId;
    tagTitle.value=title;
    tagDescription.value=description;
    addNote.click();
    addBtn.innerText= "update";
    displayNotes();
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    
    let noteTitle=tagTitle.value;
    let desc=tagDescription.value;
    if(noteTitle || desc) {
       let noteDetails = {
               title:noteTitle,
                description:desc
        }
      if(!update){
        notes.push(noteDetails);
      }else{
        update=false;
        notes[updateId] = noteDetails;
      }
       localStorage.setItem("notes",JSON.stringify(notes));
       closeBtn.click();
       displayNotes();
    }
});
