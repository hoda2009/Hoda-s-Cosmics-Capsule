const humburger = document.querySelector(".humburger");
const navlinks = document.querySelector("#navlinks"); // Target the menu

humburger.addEventListener("click", () => {

    navlinks.classList.toggle('active'); 
});
let quoteSection={
apiKey:"dUOvbEIjuFqGZpEVPOkxzAxekVrKazl9KbGnTjbk",
category:"inspiratinal",
fetchQuote:function(){
    const url=`https://api.api-ninjas.com/v1/quotes?category=${this.category}`
    fetch("https://api.api-ninjas.com/v1/quotes",{
        headers:{'X-Api-Key':this.apiKey}
    })
    .then(response => response.json())
    .then((data)=>{this.displayQuote(data[0])})
},
displayQuote:function(data){
    const{quote,author}=data;
document.getElementById('quoteText').innerText=`"${quote}"`;
document.getElementById("quoteAuthor").innerText=`- ${author} -`
}
}
const button=document.querySelector(".newBtn");
 button.addEventListener("click",function(){
    quoteSection.fetchQuote();
 });
 quoteSection.fetchQuote()


 let pinkTheme=false;
    const userChoice=localStorage.getItem('theme');
    if(userChoice==="pink"){
        document.documentElement.setAttribute("data-theme","pink");
        document.querySelector(".theme-change").textContent="🌌";
        pinkTheme=true;
    }
    else{
        document.documentElement.setAttribute('data-theme',"cosmic");
        pinkTheme=false;
        
    }
 
 function toggleTheme(){
    const themeChange=document.querySelector(".theme-change");
    const bodyHTML=document.documentElement;
    if(pinkTheme){
         bodyHTML.setAttribute('data-theme','cosmic')
         themeChange.textContent="🪷"
         pinkTheme=false; //initial
            localStorage.setItem("theme","cosmic")
         
    }
    else{
         bodyHTML.setAttribute('data-theme',"pink");
           themeChange.textContent="🌌"
           pinkTheme=true;
     localStorage.setItem("theme","pink")
    }

 }

 let userSelectedMood
 function selectMood(btn){ //for user clicked
    const buttons=document.querySelectorAll('.mood-button')
     buttons.forEach((button)=>{
        button.classList.remove('selected');
        btn.classList.add('selected');
        //save the mood (in order to do the other pages)
        userSelectedMood=btn.getAttribute('data-mood')
     })
 }

//for saving 
window.addEventListener('DOMContentLoaded',()=>{ //fires when html doc has been completely loaded
    const draft=localStorage.getItem('capsuleDraft');
    if (draft){
        document.getElementById('text').value=draft;

    }
});
document.getElementById('text').addEventListener("input",(e)=>{
    localStorage.setItem('capsuleDraft',e.target.value)
    
});


function craeteCapsule() {
    const title = document.getElementById("title").value;
    const textContent = document.getElementById("text").value;
    const photoInput = document.getElementById('userPhoto'); 
    const unLockDay = Number(document.getElementById('unlockTime').value);
 const textArea=document.getElementById('text');
   


    
    if (!title || !textContent) {
        alert("💌 Please fill in title and letter 🔮!!");
        return;
    }
    if (!userSelectedMood) {
        alert("☺️ Please select a Mood!");
        return;
    }

    
    const file = photoInput.files[0];

    if (file) {
        const reader = new FileReader(); // hodaa its create a FileReader object
        reader.onload = function(e) { 
            const base64Image = e.target.result;
            // Pass the image data to the save function
            completeSaving(title, textContent, base64Image, unLockDay);
        };//when done reading ,run this code
        reader.readAsDataURL(file); //convert into string
    } else {
        // No photo? Pass null
        completeSaving(title, textContent, null, unLockDay);
    }
}

//  This function handles the actual math and saving
function completeSaving(title, textContent, photoData, unLockDay) { //take 4 parameters
    let addedTimeMlls; //to store the time delay in milliseconds
    if (unLockDay === 1) {   //i calculate time in milliseconds
        addedTimeMlls = 1 * 60 * 1000; //only for 1 minute
    } else {
        addedTimeMlls = unLockDay * 24 * 60 * 60 * 1000;  //hodaa this is the standard way to convert day to millisecond ..24hr 60min in an hour 60seconds in minute 1000 milliseconds in a seconds
    }

    const nowMlls = Date.now();//to get the current timestamp in milliseconds
    console.log("testing:"+nowMlls)
    const totalMlls = nowMlls + addedTimeMlls;//calculate unlock time
    const unLockDate = new Date(totalMlls);
     let notificationTime=new Date(unLockDate);//im copy it 
     //subtract 5 min for notification
  notificationTime.setMinutes(notificationTime.getTime() -5);//noww  notificationTime is 5 min before the unlockedtime!
    



    const capsule = {
        title: title,
        content: textContent,
        UserMood: userSelectedMood,
        UserPhoto: photoData, // Hodaa look at localStorage !!
        unlockDay: unLockDate.toISOString(),//convert a Date object into a string format ,it make it easy to store in local storage
        firstCreated: new Date().toISOString(),//here its return a string not a date object
        id: Date.now(),
        NotificationSend: false
    };
    // new Date():creates a date Object .That object represent a specific date and time

    let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
    capsules.push(capsule);
    localStorage.setItem('capsules', JSON.stringify(capsules));
    localStorage.removeItem('capsuleDraft'); //remove the draft 

startNotificationChecker();
    const sound=document.getElementById('sealSound');
    sound.play()
    alert("Time Capsule Sealed! 🔮");
    document.getElementById('title').value = "";
    document.getElementById("text").value = "";
    document.getElementById("userPhoto").value = ""; // Clear file input
    userSelectedMood = "";
    document.querySelectorAll(".mood-button").forEach((button) => {
        button.classList.remove('selected');
    });
}
//Browser Notification API
Notification.requestPermission().then(function(permission){
    if(permission==="granted"){
        console.log("Notification permissin granted !")
    }
    else{
          console.log("Notification permissin denied!")
    }
})



//to send the notification for the user 
function sendNotification(title,message){
    if(Notification.permission==="granted"){
        new Notification(title,{
            body:message
    
        })
    }
}




// to check the time every 1 minute    
function startNotificationChecker() {
    setInterval(() => {
        let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
        let now = new Date(); //i get the current date and time
        let wasUpdated = false; 

        capsules.forEach((capsule) => {
            let unlockDate = new Date(capsule.unlockDay);//to convert the date string(unlockday) into a Date object
            let notifyAt = new Date(unlockDate.getTime() - (5 * 60 * 1000));

            if (now >= notifyAt && !capsule.NotificationSend) {
                
                sendNotification(
                    "🎊 Capsule Unlocking Soon!",
                    `${capsule.title} will unlock in 5 minutes !!⏰`
                );

                capsule.NotificationSend = true;
                wasUpdated = true;
            }
        });
        if (wasUpdated) {
            localStorage.setItem('capsules', JSON.stringify(capsules));
        }

    }, 60000);
}


/*function testNotification(){
    if(Notification.permission==="granted")
        sendNotification(
    "🧪Testing Notification🥳🙌 !!!");
    else{
        alert("please allow notifications")
        Notification.requestPermission();
    }
}*/ //Amazinggggg its working hodaaaa try it !!*/


const loader=document.getElementById("preloader")
window.addEventListener("load",hidePreLoader);
function hidePreLoader(){
    loader.style.display="none";
    
}

function fetchAdvice(){
fetch("https://api.adviceslip.com/advice")
.then(response=>response.json())
.then(data=>{
    document.getElementById("advise").textContent=data.slip.advice;
})



}
fetchAdvice();

const changeAdvise =document.getElementById("advisebtn")
changeAdvise.addEventListener("click",fetchAdvice)



function fetchFunFact(){
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
    .then(response=>response.json())
    .then(data=>{
    document.getElementById("fact").textContent=data.text;
})
}
fetchFunFact()

const changefact =document.getElementById("factbtn")
changefact.addEventListener("click",fetchFunFact)



