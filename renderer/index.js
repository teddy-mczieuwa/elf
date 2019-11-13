$(function () { 
  
    const path = require('path') // require the path module

    const fs = require('fs') // require the file system module
    
 
    // locate the local db
    const local_db = path.join(__dirname, '../.local')
    
    // declare the db selected
    let db

    // list out the folders in the path into an array
    let folder = local_db.split('/')
    
    // get the last item in the folder list
    let folderName = folder.pop()
    
    // remove the '.' at the begining of the folder name
    let content = `<li class="jstree-open" data-jstree='{"icon":"../assets/icons/folder-regular.svg"}' id="node_1">${folderName.substr(1,folderName.length)}</li>`
    
    console.log(content)
    
    // add the folder content to the  DOM  
    document.querySelector('.db_tree').innerHTML = content
    
    // read documents in the local database folder
    const files = fs.readdirSync(local_db)
    
    // list all directories in the local database folder
    files.forEach((name) => {
        let fileName = name.split('.')[0]
    
        const file = document.createElement('ul')
        file.classList.add('file')
    
        const item = document.createElement('li')
        item.setAttribute("data-jstree",'{"icon":"../assets/icons/file-regular.svg"}')
        item.setAttribute("data-name",fileName)
        item.setAttribute("id", fileName)
       item.innerText = fileName
        
        file.innerHTML = `<li data-jstree='{"icon":"../assets/icons/file-regular.svg"}' class="${fileName}" data-name="${fileName}">${fileName}</li>`
        //file.appendChild(item)
        // append the data to the ul with the id of node_1
        document.getElementById('node_1').appendChild(file)
    })
    
    
    
    // display the results in the result panel
    function renderResults(payload) {
        const results = document.getElementById('read')
        console.log(results)
        results.innerText = JSON.stringify(payload, null, 2)
    }

    // read the content data and render it 
    async function  readData() {
        // read data
        //model = this.dataset.name
        db = this.dataset.name ? require('../db')(this.dataset.name) : null

        //console.log(repos[this.dataset.name])
        try {
            const data = await db.findRecords()

            renderResults(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        
    }

    // handle data create
    async function handleCreate(e) {
        e.preventDefault()
        
        try {
            // get value from input
            const newData = document.getElementById('newData').value

            // insert data into the selected document record
            const res = await db.insertRecord(JSON.parse(newData))
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        //console.log(newData)
    }

    // handle updating the data
     async function handleUpdate(e) {
         e.preventDefault()
        try {
            const dataId = document.getElementById('recordId').value
            const updatedData = document.getElementById('updatedData').value
            const res = await db.updateRecord(dataId, JSON.parse(updatedData))
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        
    }

    // handle data deletion
    async function handleDelete(e) {
        e.preventDefault()
       try {
           const dataId = document.getElementById('deleteRecordId').value
           const res = await db.deleteRecord(parseInt(dataId))
           console.log(res)
       } catch (error) {
           console.log(error)
       }
       
   }


    // create data 
    const addData = document.getElementById('create-form')
    addData.addEventListener('submit', handleCreate)

    // read data
    let docs = document.querySelectorAll('.file li')
    docs.forEach(doc => doc.addEventListener('click', readData))

    // update data
    const updateData = document.getElementById('update-form')
    updateData.addEventListener('submit', handleUpdate)

    // delete data
    const deleteData = document.getElementById('delete-form')
    deleteData.addEventListener('submit', handleDelete)
    
})

