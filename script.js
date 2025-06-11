var audio = new Audio("money-pickup-2-89563.mp3");
document.addEventListener("DOMContentLoaded", function() {});
    let droneBuyButtons = document.querySelectorAll(".drone_choose_buy");
    if (droneBuyButtons && droneBuyButtons.length > 0) {
        droneBuyButtons.forEach(button => {
            button.addEventListener("click", () => {
                audio.play();
                alert("Sorry, this feature is not available yet.");
                });
            
            button.addEventListener("mouseover", () => droneBuyButtonsMouseOver(button));
            button.addEventListener("mouseout", () => droneBuyButtonsMouseOut(button));
        });
        console.log("Drone buy buttons initialized:", droneBuyButtons.length);
    };
