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
function displayFavorites(){
  const favoriteList=document.getElementById("favoritesList")
  let favoritesLetter=JSON.parse(localStorage.getItem("favorites")) || [];
   
    favoriteList.innerHTML=""
  if (favoritesLetter.length===0){
    favoriteList.innerHTML='<div class="no-favorites">✨ NO favorites yet ! Save some capsules! 🗃️</div>';
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
     <button class="remove-favo"onclick="removeFromFavorite(${favo.id})">🗑️ Remove </button>
     </div>`;
      favoriteList.innerHTML +=displayFavo;
   });

 }

  displayFavorites()


function removeFromFavorite(id) {
    if (confirm("Are you sure you want to remove this capsule from favorites? 🧐")) {
        let favoritesLetter = JSON.parse(localStorage.getItem("favorites")) || [];
      
        favoritesLetter = favoritesLetter.filter(favo => String(favo.id) !== String(id)); //i ask ai ,since first i was using index put when i check the application i face many problem when deleting a capsule it cause to open the other one 

        // 2. Save back to storage
        localStorage.setItem("favorites", JSON.stringify(favoritesLetter));
        
        // 3. Refresh the UI
        displayFavorites();
    }
}
  displayFavorites()
