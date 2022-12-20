// Collapsible
var coll = document.getElementsByClassName("collapsible");

// Open & close the chat box 
for(let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if(content.style.maxHeight) {
            content.style.maxHeight = null;
        }
        else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}



// Get the current time
function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if(hours < 10) {
        hours = "0" + hours; // 05.19
    }

    if(minutes < 10) {
        minutes = "0" + hours;
    }

    let time = hours + ":" + minutes;
    return time;
}



// First bot message
function firstBotMessage() {
    let firstMessage = "How's it going?";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    // Using jQuery to simplify element selection
    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

// Showing the first bot message when the chat bot get open
firstBotMessage();



// Getting the responses from the bot from responses.js | Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';

    $("#chatbox").append(botHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}



// Get the user response | Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if(userText == "") {
        userText = "I love to coding!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    // As as the user clicks enter the text input get clear
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    // To simulate 1sec delay as the bot is thinking & it can also simulate the server trying to respons
    setTimeout( () => {
        getHardResponse(userText);
    }, 1000);
}



// Allow us to add sample text to button in case want to add something which is premaid | Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    // Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}



// Getting the response
function sendButton() {
    getResponse();
}



// Heart button text
function heartButton() {
    buttonSendText("Heart Clicked!");
}



// Press enter to send a message | 13 is the key code to enter
$("#textInput").keypress(function(e) {
    if(e.which == 13) {
        getResponse();
    }
});