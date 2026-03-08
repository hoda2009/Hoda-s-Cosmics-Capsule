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

function craeteCapsule() {
    const title = document.getElementById("title").value;
    const textContent = document.getElementById("text").value;
    const photoInput = document.getElementById('userPhoto'); 
    const unLockDay = Number(document.getElementById('unlockTime').value);

     // let notificationTime=new Date(unLockDate);
//  notificationTime.setMinutes(notificationTime.getTime() -5);

    
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
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            // Pass the image data to the save function
            completeSaving(title, textContent, base64Image, unLockDay);
        };
        reader.readAsDataURL(file);
    } else {
        // No photo? Pass null
        completeSaving(title, textContent, null, unLockDay);
    }
}

//  This function handles the actual math and saving
function completeSaving(title, textContent, photoData, unLockDay) {
    let addedTimeMlls;
    if (unLockDay === 1) {
        addedTimeMlls = 1 * 60 * 1000; // 1 minute
    } else {
        addedTimeMlls = unLockDay * 24 * 60 * 60 * 1000;
    }

    const nowMlls = Date.now();
    const totalMlls = nowMlls + addedTimeMlls;
    const unLockDate = new Date(totalMlls);
     let notificationTime=new Date(unLockDate);
  notificationTime.setMinutes(notificationTime.getTime() -5);
    



    const capsule = {
        title: title,
        content: textContent,
        UserMood: userSelectedMood,
        UserPhoto: photoData, // Hodaa look at localStorage !!
        unlockDay: unLockDate.toISOString(),
        firstCreated: new Date().toISOString()
    };

    let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
    capsules.push(capsule);
    localStorage.setItem('capsules', JSON.stringify(capsules));

startNotificationChecker();
    
    alert("Time Capsule Sealed! 🔮");
    document.getElementById('title').value = "";
    document.getElementById("text").value = "";
    document.getElementById("userPhoto").value = ""; // Clear file input
    userSelectedMood = "";
    document.querySelectorAll(".mood-button").forEach((button) => {
        button.classList.remove('selected');
    });
}
//Web Notifications API
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




// to check the time every minute    
function startNotificationChecker() {
    setInterval(()=>{
         let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
         let userClickNow=new Date();
        capsules.forEach((capsule,index)=>{
            let notificationTime=newDate(capsule.notificationTime);
        if( userClickNow>= notificationTime){
            sendNotification(
                "⌛Capsule Unlocking Soon!,"
                `${capsule.title} will unlock in 5 minutes !!⏰`
            
            );
            capsule.NotificationSend=true;
               localStorage.setItem('capsules', JSON.stringify(capsules));
           
        }  

        });

    },60000);
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