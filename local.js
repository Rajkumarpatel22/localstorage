showtask();
let name1 = document.getElementById("name1");
let submit = document.getElementById("submit");

submit.addEventListener("click", function(){
    name1val = name1.value;
    if(name1val.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);
        }
        taskObj.push({'task_name':name1val, 'completeStatus':false});
		// console.log(taskObj, 'Ashendra');
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        name1.value = '';
    }
    showtask();
})

// showtask
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let namelist = document.getElementById("namelist");
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
     html += `<tr>        <th scope="row">${index+1}</th>
               ${taskCompleteValue}
      <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
     
    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
    </tr>`;
 });
   namelist.innerHTML = html;
 }

// edittask
function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let submit = document.getElementById("submit");
   let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    
    name1.value = taskObj[index]['task_name'];
    submit.style.display="shown";
   savetaskbtn.style.display="block";
}

// savetask
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let submit = document.getElementById("submit");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = name1.value;
        }
      }
    // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
  //  taskObj[saveindex][task_name] = addtaskinput.value;
    savetaskbtn.style.display="none";
    submit.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    name1.value='';
    showtask();
})
// deleteitem
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}

//complete task
/* function completetask(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj[index] = '<span style="text-decoration:line-through">' + taskObj[index] + '</span>';
    let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
        console.log(addedtasklist)
    })
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
} */

// complete task
let namelist = document.getElementById("namelist");
    namelist.addEventListener("click", function(e){
       // console.log(e);
        
        // showtask();
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        
        // let taskValue = taskObj[mytargetid]['task_name'];
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
            // let mynewelem = mytargetpresibling.classList.toggle("completed");
            // taskObj.splice(mytargetid,1,mynewelem);
            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                   // taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':false};
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                    //taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':true};
                }
              }
        //}
       // showtask();        
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
    })

    



// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let submit = document.getElementById("submit");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display="none";
    submit.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})


// serachlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})














