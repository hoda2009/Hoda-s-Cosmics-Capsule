const humburger = document.querySelector(".humburger");
const navlinks = document.querySelector("#navlinks"); // Target the menu

humburger.addEventListener("click", () => {

    navlinks.classList.toggle('active'); 
});
/*let quoteSection = {
  apiKey: "dUOvbEIjuFqGZpEVPOkxzAxekVrKazl9KbGnTjbk",
  category: "inspirational",
  fetchQuote: function () {
    const url = `https://api.api-ninjas.com/v1/quotes?category=${this.category}`;

    fetch(url, {
      headers: { "X-Api-Key": this.apiKey },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0 && data[0]) {
          this.displayQuote(data[0]);
        }
      }); // This closes the .then() correctly
  }, // This closes fetchQuote AND the comma lets you start displayQuote

  displayQuote: function (data) {
    const { quote, author } = data;
    document.getElementById("quoteText").innerText = `"${quote}"`;
    document.getElementById("quoteAuthor").innerText = `- ${author} -`;
  }
};

quoteSection.fetchQuote();
const button=document.querySelector(".newBtn");
 button.addEventListener("click",function(){
    quoteSection.fetchQuote();
 });
 quoteSection.fetchQuote()*/
let quoteSection = {
    fetchQuote: function() {
        const url = "https://dummyjson.com/quotes/random";

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Connection failed");
                return response.json(); 
            })
            .then((data) => {
                this.displayQuote(data);
            })
            .catch(err => {
                console.log("Using backup:", err);
                this.displayQuote({
                    quote: "The only way to do great work is to love what you do.",
                    author: "Steve Jobs"
                });
            });
    },
    displayQuote: function(data) {
        const text = document.getElementById('quoteText');
        const auth = document.getElementById("quoteAuthor");

        if (text && auth) { //and
            text.innerText = `"${data.quote}"`;
            auth.innerText = `- ${data.author} -`;
        }
    }
};

const button = document.querySelector(".newBtn");
if (button) {
    button.addEventListener("click", function() {
        quoteSection.fetchQuote();
    });
}

// Loads the first quote automatically when the page starts
quoteSection.fetchQuote();

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
    const bodyHTML=document.documentElement;//hodaa it will return <html>tag (the root element)
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

let recordedAudioBase64 = null; // This will stay null until a recording is finished



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
   


    
    if (!title || !textContent) {    //logical not operator 
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
        reader.onload = function(e) { //when you read this file (your done loading) run this fun tion
            const base64Image = e.target.result;
            // Pass the image data to the save function
            //completeSaving(title, textContent, base64Image, unLockDay);this is before i add the voice 
            completeSaving(title, textContent, base64Image, recordedAudioBase64, unLockDay);
        };//when done reading ,run this code
        reader.readAsDataURL(file); //convert into string
    } else {
        // No photo? Pass null
        //completeSaving(title, textContent, null, unLockDay);
        completeSaving(title, textContent, null, recordedAudioBase64, unLockDay);
    }
}
let checkerInterval = null;
//  This function handles the actual math and saving
 //function completeSaving(title, textContent, photoData, unLockDay) 
 function completeSaving(title, textContent,photoData, audioData, unLockDay){ //take 5 parameters
    let addedTimeMlls; //to store the time delay in milliseconds
    if (unLockDay === 1) {   //i calculate time in milliseconds
        addedTimeMlls = 1 * 60 * 1000; //only for 1 minute
    } else {
        addedTimeMlls = unLockDay * 24 * 60 * 60 * 1000;  //hodaa this is the standard way to convert day to millisecond ..24hr 60min in an hour 60seconds in minute 1000 milliseconds in a seconds
    }

    const nowMlls = Date.now();//to get the current timestamp in milliseconds
    console.log("testing:"+nowMlls)
    const totalMlls = nowMlls + addedTimeMlls;//calculate unlock time
    const unLockDate = new Date(totalMlls);//object
     let notificationTime=new Date(unLockDate);//im copy the unlockdate to other variable //Example Wensday  March 18 2025 10:40:00 GMT+

    
    



    const capsule = {
        title: title,
        content: textContent,
        UserMood: userSelectedMood,
        UserPhoto: photoData, // Hodaa look at localStorage !!
        unlockDay: unLockDate.toISOString(),//convert a Date object into a string format ,it make it easy to store in local storage
        firstCreated: new Date().toISOString(),//here its return a string not a date object
        id: Date.now(),
        NotificationSend: false,
        UserAudio: audioData,
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
    audioPlaySection.style.display = 'none'; 
recordingControl.style.display = 'flex';
timerDisplay.innerText = "00:00";
recordButton.innerHTML = "🎤 Record";
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
/*function startNotificationChecker() {
    setInterval(() => {
        let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
        let now = new Date(); //i get the current date and time
        let wasUpdated = false; 

        capsules.forEach((capsule) => {
            let unlockDate = new Date(capsule.unlockDay);//to convert the date string(unlockday) into a Date object
            //let notifyAt = new Date(unlockDate.getTime() - (5 * 60 * 1000)); for check every 5 min but i have 1 min 
            // During testing (1 minute capsules):
            let notifyAt = new Date(unlockDate.getTime() - (10 * 1000)); // 10 seconds before
            if (now >= notifyAt && now <unlockDate &&!capsule.NotificationSend) {
                
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

    }, 1000); // 1 min =60 000 i , 1s 1000}*/
/*function startNotificationChecker() {
    setInterval(() => {
        const capsules = JSON.parse(localStorage.getItem("capsules")) || [];
        const now = Date.now();
        let wasUpdated = false;

        capsules.forEach((capsule) => {
            const unlockTime = new Date(capsule.unlockDay).getTime();
            
            // Define the "Warning Zone" (e.g., between 15 seconds and 1 second before unlock)
            const notifyLeadTime = 15 * 1000; // 15 seconds early
            const isTimeForWarning = (now >= (unlockTime - notifyLeadTime)) && (now < unlockTime);

            if (isTimeForWarning && !capsule.NotificationSend) {
                sendNotification(
                    "🔮 Almost Ready!",
                    `"${capsule.title}" will be ready in a few seconds!`
                );
                
                capsule.NotificationSend = true;
                wasUpdated = true;
                console.log("Pre-unlock notification sent!");
            }
        });

        if (wasUpdated) {
            localStorage.setItem('capsules', JSON.stringify(capsules));
        }
    }, 1000); 
}*/

function startNotificationChecker() {
    if (checkerInterval !== null) {   //prevents multiple timers from running at once
        console.log("Checker already running, skipping...");
        return; 
    }
    //to start check every second
    checkerInterval = setInterval(() => {
        // This "Heartbeat" will show every second so you know the loop is alive
        console.log("Checker Heartbeat: Checking capsules..."); 

        const capsules = JSON.parse(localStorage.getItem("capsules")) || [];
        if (capsules.length === 0) {
            console.log("No capsules found in localStorage.");
            return
        }
        //i start the time check setup
        const now = Date.now();
        let wasUpdated = false;
         const notifyLeadTime = 20 * 1000; //20 second before unlock (it still in milliseconds)

        capsules.forEach((capsule) => {
            const unlockTime = new Date(capsule.unlockDay).getTime();
            const secondsLeft = Math.floor((unlockTime - now) / 1000); //i calculates seconds remanining until unlock
            
            //console.log(`Capsule "${capsule.title}" - Status: ${capsule.NotificationSend ? 'Sent' : 'Waiting'}, Seconds left: ${secondsLeft}`);



            //Notification will send ONLYY if : Notification hasnt been sent yet   AND current time is within 20 seconds of unlock time
            if (!capsule.NotificationSend && now >= (unlockTime - notifyLeadTime)) { //remmember hoda that LOGICAL NOT operator return Boolean values (here if it true will cotinue)
                sendNotification("🔮 Almost Ready!", `"${capsule.title}" unlocks soon!`);
                capsule.NotificationSend = true;
                wasUpdated = true;
                console.log("!!! NOTIFICATION TRIGGERED !!!");
            }
        });

        if (wasUpdated) {
            localStorage.setItem('capsules', JSON.stringify(capsules));
        }
    }, 1000); 
}


startNotificationChecker();



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



//for voice message
let mediaRecorder;
let audioChunks = [];//stores the audio data
let timerInterval; //to stop the stop watch

const recordButton = document.getElementById('recordButton');
const recordAgain = document.getElementById('recordAgain');
const audioPlayback = document.getElementById('audioPlayback');
const audioPlaySection = document.getElementById('audioPlay');
const recordingControl = document.querySelector('.recording-Control');
const timerDisplay = document.getElementById('timer');

// START/STOP RECORDING
recordButton.addEventListener('click', async () => { //hodaa asyn and await work like a team (this fun might need to wait )
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        try {
            //  asking for microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); //without await ,the code would continue running before the user responds 
            //create a recorder
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];//clear previous recording

            mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
             
        //when recording stops
            mediaRecorder.onstop = () => {
                //here they combine all audio pieces into one file
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioPlayback.src = URL.createObjectURL(audioBlob);//create playable audio
                

                //and then they start to convert to base 64 
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    recordedAudioBase64 = reader.result; // Saves to global variable
                    console.log("Audio captured and ready for sealing!");
                };

                recordingControl.style.display = 'none';
                audioPlaySection.style.display = 'flex';
            };
           

            //it will start RECORDING 
            mediaRecorder.start();
            startTimer();
            recordButton.innerHTML = "⏹️ Stop";
        } catch (err) {
            alert("Microphone access denied!");
        }
    } else {
        mediaRecorder.stop();
        stopTimer();
        recordButton.innerHTML = "🎤 Record";
    }
});


recordAgain.addEventListener('click', () => {
    recordedAudioBase64 = null; // Clear old recording
    audioPlayback.src = "";
    audioPlaySection.style.display = 'none';
    recordingControl.style.display = 'flex';
    timerDisplay.innerText = "00:00";
    recordButton.innerHTML = "🎤 Record";
});

function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerDisplay.innerText = `${mins}:${secs}`;

        if (seconds >= 60) {
            mediaRecorder.stop();
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}