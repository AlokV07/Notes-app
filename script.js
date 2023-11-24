console.log('Welcome to Note app. This is H.js')

showNotes()
    // if user add anothers add it to the localStorage

let Addbtn = document.getElementById("Addbtn")
Addbtn.addEventListener("click", function(e) {
    let Addtxt = document.getElementById("Addtxt")
    let Addtitle = document.getElementById("Addtitle")
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesobj = []
    } else {
        notesobj = JSON.parse(notes)
    }

    let myObj = {
        title: Addtitle.value,
        text: Addtxt.value
    }

    notesobj.push(myObj)
    localStorage.setItem("notes", JSON.stringify(notesobj))
    Addtxt.value = ""
    Addtitle.value = ""
        // console.log(notesobj)
    showNotes()
})

// Function to show elements from local storage 

function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesobj = []
    } else {
        notesobj = JSON.parse(notes)
    }
    let html = ""
    notesobj.forEach(function(element, index) {
        html += `
        <div class="noteCard mx-4 my-3 card" style="width: 18rem;">

        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>
        `
    });
    let noteselem = document.getElementById('notes')
    if (notesobj.length != 0) {
        noteselem.innerHTML = html
    } else {
        noteselem.innerHTML = ` Nothing to show use "Add a Note" section above to add notes `
    }
}

// function to delete a note

function deletenote(index) {
    // console.log('I am deleting', index)

    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesobj = []
    } else {
        notesobj = JSON.parse(notes)
    }

    notesobj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesobj))
    showNotes()
}


// function to search a note


let search = document.getElementById('searchtext')
search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase()
        // console.log("Input event fired", inputVal)
    let notecards = document.getElementsByClassName('notecards')
    Array.from(notecards).forEach(function(element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText
        if (cardtxt.includes(inputVal)) {
            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
        // console.log(cardtxt)
    })
})



/*

further features:-

1. Mark a note as important
2. Seperate notes by user
3. Sync and host to web server

*/