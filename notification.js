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
