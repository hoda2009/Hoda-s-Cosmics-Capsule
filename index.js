/*const humburger = document.querySelector(".humburger");
const navlinks = document.querySelector("#navlinks"); // Target the menu

humburger.addEventListener("click", () => {

    navlinks.classList.toggle('active');
})
let quoteSection={
apiKey:"dUOvbEIjuFqGZpEVPOkxzAxekVrKazl9KbGnTjbk",
myChoices:["success","inspirational","courage","happiness","wisdom","freedom"],
fetchQuote:function(){
    const randomChoices=this.myChoices[Math.floor(Math.random()*this.myChoices.length)]
fetch(`https://api.api-ninjas.com/v1/quotes?category=${randomChoices}`, {
      headers: { 'X-Api-Key': this.apiKey }
    })
    .then(response => response.json())
    .then((data)=>{this.displayQuote(data[0])})
},
displayQuote:function(data){
    const{quote,author}=data;
document.getElementById('quoteText').innerText=`"${quote}"`;
document.getElementById("quoteAuthor").innerText=`-${author}-`;
}
};
const button=document.querySelector(".newBtn");
 button.addEventListener("click",function(){
    quoteSection.fetchQuote();
 });
 quoteSection.fetchQuote()*/



 const humburger = document.querySelector(".humburger");
const navlinks = document.querySelector("#navlinks"); // Target the menu

humburger.addEventListener("click", () => {

    navlinks.classList.toggle('active'); 
});

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



 function loadCapsulesPage(){
const capsuleList=document.getElementById('capsuleList');

let capsules=JSON.parse(localStorage.getItem("capsules")) || [];
//console.log("capsules from storage",capsules)
if(capsules.length===0){
    console.log("NO capsules found")
  capsuleList.innerHTML = `
        <div class="no-capsules">
            <p>You are alive. You are thinking. You are here.</p>
            <p>Future you is waiting. Don't let this moment slip away.</p>
            <a href="index.html" class="cosmic-link">Capture it <span class="glow">NOW!</span></a>
        </div>
    `;
    return
}
console.log("We have capsules found ")
 capsuleList.innerHTML = "";

//to show for the user as emoji not text inside the card

  const mood={
    'happy':'😊',
    'sad':'😓',
    'excited':'🤩',
    'calm':'😌',
    'curious':'🤔',
    'determined':'💪',
    'hopeful':'✨',
    'angry':'😠',
    'confident':'😎',
     'lovely':'🥰',
     'shy':'😳',
     'celebrate':'🥳',
     'headache':'🤕',
    'verySad':'😭',
  }
let allCardsHTML = "";
  capsules.forEach((capsule,index)=>{ //i was using index for deleting ,but i change it and i use id 
     //console.log('title',capsule.title)
    const unLockDate=new Date(capsule.unlockDay);//convert string to date object
    const userClickNow=new Date ();//get  current time
    //check if locked or unlocked
    const isLocked=userClickNow<(unLockDate); //if now is before unlockDate it will be locked ,,and now is after unlok date it will be unlocked
     console.log(isLocked)

    //CALCULATE TIME LEFT
     const oneDay = 1000 * 60 * 60 * 24;

    const diffDay= unLockDate-userClickNow //difference in millisecond
    const year=Math.floor(diffDay/(1000*60*60*24*365));
    //remaining after year
    const month=Math.floor((diffDay % (1000*60*60*24*365))/(1000*60*60*24*30));
    const day=Math.floor((diffDay % (1000*60*60*24*30))/(1000*60*60*24));
    const hour=Math.floor((diffDay % (1000*60*60*24))/(1000*60*60));
    const daysLeft=Math.floor(diffDay / oneDay)   /*Math.floor() or Math.ceil(),Math.floor rounds Down to the nearest whole number,Math.ceil rounds up*/
    //format date
    const dateDis= unLockDate.toLocaleDateString('en-US', //english format
        {
        year:"numeric",month:"long",day:'numeric'});
      //console.log("date:"+dateDis)

    const moodEmoji=mood[capsule.UserMood];


    /*if isLocked is true it will use locked ,and if its false it will use unlocked'*/
      allCardsHTML+=`
    <div class="card ${isLocked ? 'locked': 'unlocked'}"
     onclick="${isLocked ? '' :`openTimeCapsule(${capsule.id})`}">          
    <div class="capsule-icon">${isLocked ? "🔒":"🔓"}</div>
    <h3 class="capsule-title">${capsule.title}</h3>
    <div class="capsule-mood">${ moodEmoji}</div>
    <p class="capsule-date">🗓️Unlock : ${dateDis} </p>
    ${isLocked ?
        //`<p class="capsule-coutdown">⏰${ year}y ${month}m ${day}d ${hour} days left </p>`
        `<p class="capsule-coutdown">⏰${daysLeft} days left </p>`:
         '<p class="capsule-coutdown">✨ Ready to open !</p>'}
     <button class="capsule-delete-button" onclick="deleteCapsule(${capsule.id})">🗑️ Delete </button>
     </div>
     `
});
capsuleList.innerHTML = allCardsHTML;
}

function deleteCapsule(id) {
    const userConfirmed = confirm("Are you sure you want to delete this capsule?");
    if (userConfirmed) {
        let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
        
        capsules = capsules.filter(capsule => capsule.id !== id);
        
        localStorage.setItem('capsules', JSON.stringify(capsules));
        loadCapsulesPage(); // Refresh the screen
    }
}
 loadCapsulesPage()
 


 function openTimeCapsule(id){

    const capsules=JSON.parse(localStorage.getItem("capsules")) || [];
  //FIND the specific capsule using the ID
    const capsule = capsules.find(c => c.id === id); 

    if (!capsule) return;


     const mood={
    'happy':'😊',
    'sad':'😓',
    'excited':'🤩',
    'calm':'😌',
    'curious':'🤔',
    'determined':'💪',
    'hopeful':'✨',
    'angry':'😠',
    'confident':'😎',
     'lovely':'🥰',
     'shy':'😳',
     'celebrate':'🥳',
     'headache':'🤕',
    'verySad':'😭',
  };


    
    const createDiv=document.createElement('div');
    createDiv.className="capsule-Div";

    const content=document.createElement('div');
    content.className="letter-content";

    const closeBtn=document.createElement('span');
    closeBtn.className="close-btn";
    closeBtn.innerHTML="❌";
    closeBtn.addEventListener('click',()=>closeCapsule());
    

    const header=document.createElement('div');
    header.className="letter-header";
     
    const headerTitle=document.createElement('h2');
    headerTitle.textContent="🌟 YOUR TIME CAPSULE HAS UNLOCKED ! 🌟";
    header.appendChild(headerTitle);

    const userInfo=document.createElement('div');
    userInfo.className='capsule-info';

    const title=document.createElement('h3');
    title.textContent=capsule.title;

    const userMood=document.createElement('div');
    userMood.textContent=mood[capsule.UserMood]
    userMood.className='capsule-mood';

    
    const createdDate=document.createElement('p')
    createdDate.textContent='🗓️Created:' + new Date(capsule.firstCreated).toLocaleDateString();
    createdDate.className="capsule-date";

     
    const unlockDate=document.createElement('p')
     unlockDate.textContent='🗓️Unlock:' + new Date(capsule.unlockDay).toLocaleDateString();
    unlockDate.className="capsule-date";
   userInfo.appendChild(title)
   userInfo.appendChild(userMood)
   userInfo.appendChild(createdDate)
   userInfo.appendChild(unlockDate)
   

   //create content section 

   const contentDiv=document.createElement('div');
   contentDiv.className="capsule-content";

   const contentText=document.createElement('p');
   contentText.textContent=capsule.content;
 contentDiv.appendChild(contentText);

 //if the user put a photo its (optional)
 if(capsule.UserPhoto){
    const photo=document.createElement('img');
     photo.src=capsule.UserPhoto;
     photo.alt='User Photo .'
     photo.className='capsule-photo';
      contentDiv.appendChild(photo);


 }
const actions=document.createElement('div');
actions.className="letter-actions";
 const saveButton=document.createElement('button');
  saveButton.textContent='🗃️ Save to Favorites'
  saveButton.className='save-btn';
  saveButton.addEventListener('click',()=>saveCapsule(id));
  actions.appendChild(saveButton);


content.appendChild(closeBtn);
content.appendChild(header);
content.appendChild(userInfo);
content.appendChild(contentDiv);
content.appendChild(actions);

createDiv.appendChild(content)
document.body.appendChild(createDiv);


  /*const openCapsule=.`
  <div class="caspule-Container">
  <div class="letter-content">
  <span class="close-button" onclick="closeLetter()">❌</span>
  <div class="header">
  <h2>✨✨✨🌟 YOUR TIME CAPSULE HAS UNLOCKED ! 🌟✨✨✨</h2>
  </div>

  <div class="capsule-info">
  <h3>${capsule.title}</h3>
  <div class="capsule-mood">${mood[capsule.UserMood]}</div>
  <p class="capsule-date">🗓️Created: ${new Date(capsule.firstCreated).toLocaleDateString()}</p>
  <p class="capsule-date">🗓️Unlock: ${new Date(capsule.unlockDay).toLocaleDateString()}</p>
  </div>
  <div class="capsule-content">
  <p>${capsule.content}</p>
  </div>
  ${capsule.UserPhoto ?
    `<img src="${capsule.UserPhoto}"class=capsule-userphoto">` : ''}
    <div class="user-action">
    <button class="save-btn" onclick="saveOpenCapsule(${index})">🗃️ Save to Favorites</button>
    </div>
    </div>
  `;*/


 }
 function closeCapsule(){
    const closeletter=document.querySelector('.capsule-Div')
    if (closeletter){
        closeletter.remove();
    }
 }
 //take the id as parameter to identify which capsule to save !
 function saveCapsule(id){  //i was using index but it cause to a problem when deleting


    let capsules=JSON.parse(localStorage.getItem("capsules")) || [];
   const capsule = capsules.find(c => c.id === id); //to search through all capsules to find one with a matching id

    if (!capsule) {
        alert("Capsule not found!");
        return;
    }

    let favoritesLetter=JSON.parse(localStorage.getItem("favorites")) || [];//
    const isAlreadySaved=favoritesLetter.some(favo=>String(favo.id)===String(id));
    if (isAlreadySaved){
      alert("This capsule is already in your favorites🗃️! ")
    }
    else{
    favoritesLetter.push(capsule);
    localStorage.setItem("favorites",JSON.stringify(favoritesLetter))
   alert("Your Capsule saved to favorites !!🗃️")
    }

    closeCapsule()

    

 }




 //for favorites capsule page

 function displayFavorites(){
  const favoriteList=document.getElementById("favoritesList")
  let favoritesLetter=JSON.parse(localStorage.getItem("favorites")) || [];
   
    favoriteList.innerHTML=""
  if (favoritesLetter.length===0){
    favoriteList.innerHTML='<div class="no-favorites">✨ NO favorites yet! Save some capsules! 🗃️</div>';
    return
  }

       const mood={
    'happy':'😊',
    'sad':'😓',
    'excited':'🤩',
    'calm':'😌',
    'curious':'🤔',
    'determined':'💪',
    'hopeful':'✨',
    'angry':'😠',
    'confident':'😎',
     'lovely':'🥰',
     'shy':'😳',
     'celebrate':'🥳',
     'headache':'🤕',
    'verySad':'😭',
  };

   favoritesLetter.forEach((favo)=>{
     const moodEmoji=mood[favo.UserMood];
     const displayFavo=`
     <div class="favorite-capsule">
     <div class="favorite-icon">🗃️</div>
     <h3 class="favorite-title">${favo.title}</h3>
     <div class="favorite-mood">${moodEmoji}</div>
     <p class="favorite-date">🗓️ Created: ${new Date(favo.firstCreated).toLocaleDateString()}</p>
     <button class="remove-favo"onclick="removeFromFavorite('${favo.id}')">🗑️ Remove </button>
     </div>`;
      favoriteList.innerHTML +=displayFavo;
   });

  }

  displayFavorites()

  

  