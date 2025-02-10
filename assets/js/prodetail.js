// for user info with logout.....
const  userDetails = document.querySelector('.userDetails')

async function getuserInfo(userID){
    if(userID){
        const userInfoSnap = await firebase.firestore()
        .collection('users')
        .doc(userID)
        .get()
    }
    
    const userInfo = userInfoSnap.data()
    if(userInfo){
        userDetails.innerHTML = +
        <h3>${userInfo.name}</h3>
        // <h3>${userInfo.email}</h3>
        // <h3>${userInfo.phone}</h3>
        +
    
    }
    else{
        userDetails.innerHTML = +
        <h3>pleas Login</h3>
        +
    }
    
// For fetchig Data into Table......


var stdNo=0;
    var tbody= document.getElementById('tbody1');
    function AddItemToTable(name){
        let trow=document.createElement("trow");
        let td1= document.createElement('td');

        td1.innerHTML=++ stdNo;
        trow.appendChild(td1);
        tbody.appendChild(trow);
    }

    function AddItemToTable(TheStudents){
        stdNo=0;
        tbody.innerHTML="";
        TheStudents.forEach(element =>{
            AddItemToTable(element.NameofStd);
        });
    }
    function GetAllDataOnce(){
        const dbRef = ref(db);
    get(child(dbRef, "StudentsList"))
    .then((snapshot)=>{

        var students=[];
        
        snapshot.forEach(childSnapshot =>{
            students.push(childSnapshot.val());
        });

        AddAllItemToTable(students);
    });
    }


    function GetAllDataRealtime(){

        const dbRef = ref(db, "StudentsList");

        
        onValue(dbRef,(snapshot)=>{
            var students=[];
            
                snapshot.forEach(childSnapshot =>{
                    students.push(childSnapshot.val());
                });
    
                AddAllItemToTable(students);
            })
        

    }
    window.onload = GetAllDataOnce;
    window.onload = GetAllDataRealtime;
}