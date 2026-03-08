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


function calculateStatistics(){
     let capsules = JSON.parse(localStorage.getItem("capsules")) || [];
      let favoritesLetter=JSON.parse(localStorage.getItem("favorites")) || [];


     const totalCapsules=capsules.length;
     //calculate locked capsules
      const userClickNow=new Date ();
     const lockedCapsules=capsules.filter((capsule)=>{
      const unLockDate=new Date(capsule.unlockDay);
      return userClickNow< unLockDate;
     }).length;
    
     //calculate unlocked capsules
     const unlockedCapsules=totalCapsules-lockedCapsules;
     const favoriteCount=favoritesLetter.length;


     const moodCount={}
     capsules.forEach(capsule=>{
        const mood=capsule.UserMood
        if(moodCount[mood]){
          moodCount[mood]++; //if mood exists add 1
        }
        else{
            moodCount[mood]=1; 

        }
     });
     const firstCapsuleCreated=capsules.length> 0 ? new Date(capsules[0].firstCreated).toLocaleDateString():" N/A"
     const lastCapsuleCreated=capsules.length>0 ? new Date(capsules[capsules.length - 1 ].firstCreated).toLocaleDateString():'N/A'

     displayStatistics(totalCapsules,lockedCapsules,unlockedCapsules,favoriteCount,moodCount,firstCapsuleCreated,lastCapsuleCreated);

}
function  displayStatistics(totalCapsules,lockedCapsules,unlockedCapsules,favoriteCount,moodCount,firstCapsuleCreated,lastCapsuleCreated){
   const statisticList=document.getElementById('statisticList');
 

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

  const displayStatistic=`
  <div class="stat-item">
  <div class="label">Total Capsules </div>
   <div class="stat-bar">
  <div class="bar" style="width: 100%;background:#ffd700;"></div>
  </div>
  <div class="value">${totalCapsules}</div>
  </div>

  
  <div class="stat-item">
   <div class="label">Locked</div>
   <div class="stat-bar">
    <div class="bar" style="width: ${lockedCapsules >0 ? (lockedCapsules /totalCapsules*100):0}%;background:#ff6b6b;"></div>
    </div>
   <div class="value">${lockedCapsules}</div>
   </div>


  <div class="stat-item">
   <div class="label">UnLocked</div>
   <div class="stat-bar">
     <div class="bar" style="width: ${unlockedCapsules>0 ? (unlockedCapsules /totalCapsules*100):0}%;background:#00ff00;"></div>
    </div>
     <div class="value">${unlockedCapsules}</div>
   </div>


  <div class="stat-item">
   <div class="label">Favorites</div>
    <div class="stat-bar">
      <div class="bar" style="width: ${favoriteCount>0 ? (favoriteCount /totalCapsules*100):0}%;background:#c56cf0;"></div>
      </div>
       <div class=value>${favoriteCount}</div>
   </div>

   
  
   <div class="stat-item">
   <div class="label">Mood Distribution</div>
   <div class="mood-dist">
   ${Object.keys(moodCount).map(md=>//I create an array for the mood
      `<div class="mood-item">
      <span class="mood-emoji">${mood[md]}</span>
      <span class="mood-name">${md}</span>
      <span class="mood-count">${moodCount[md]}</span>
      </div>
    
     `).join('')}
     </div>
     </div>
 

    <div class="stat-item">
     <div class="label">First Capsule</div>
      <div class="value">${firstCapsuleCreated}</div>
   </div>


       <div class="stat-item">
     <div class="label">Last Capsule</div>
      <div class="value">${lastCapsuleCreated}</div>
   </div>



  
  `

  statisticList.innerHTML=displayStatistic;



   
}

calculateStatistics()