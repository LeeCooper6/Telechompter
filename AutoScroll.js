var ConsoleLoggingEnabled = true;
var ScrollSpeed = 0.25 * 1000;

var TogglePausePlayButton = document.getElementById("TogglePausePlayButton");
var Pause = "‖";
var Play = ">";

var ToggleDirectionButton = document.getElementById("ToggleDirectionButton");
var Up = "˄";
var Down = "˅";

var IncreaseScrollSpeedButton = document.getElementById("IncreaseScrollSpeedButton");
var DecreaseScrollSpeedButton = document.getElementById("DecreaseScrollSpeedButton");

var ScriptText = document.getElementById("ScriptText");
var TutorialCompleted = false;
var PreviousText = ScriptText.innerHTML;

function AutoScroll() {
    if (TogglePausePlayButton.innerHTML == Pause) {
        if (ToggleDirectionButton.innerHTML == Up)
            window.scrollBy(0, 1);
        else
            window.scrollBy(0, -1);
        timeout = window.setTimeout(AutoScroll, ScrollSpeed);
    }
}

function TogglePausePlay() {
    if (TogglePausePlayButton.innerHTML == Pause) {
        if (ConsoleLoggingEnabled) console.log("Paused.");
        TogglePausePlayButton.innerHTML = Play;
    } else {
        if (ConsoleLoggingEnabled) console.log("Scrolling.");
        TogglePausePlayButton.innerHTML = Pause;
        AutoScroll();
    }
}

TogglePausePlayButton.onclick = function() {
    if (ConsoleLoggingEnabled) console.log("Toggle pause/play button clicked.");
    TogglePausePlay();
}

function ToggleDirection(down) {
    if (typeof down == "undefined")
        if (ToggleDirectionButton.innerHTML == Down)
            down = true;
        else
            down = false;
    if (down) {
        if (ConsoleLoggingEnabled) console.log("Set to scroll downwards.");
        ToggleDirectionButton.innerHTML = Up;
    } else {
        if (ConsoleLoggingEnabled) console.log("Set to scroll upwards.");
        ToggleDirectionButton.innerHTML = Down;
    }
}

ToggleDirectionButton.onclick = function() {
    if (ConsoleLoggingEnabled) console.log("Toggle direction button clicked.");
    ToggleDirection();
}

function AdjustScrollSpeed(increasing) {
    var adjustmentIncrement = 0.025 * 1000;
    if (increasing) {
        if (ConsoleLoggingEnabled) console.log("Scroll speed increased.");
        ScrollSpeed -= adjustmentIncrement;
        if (ScrollSpeed < 0) ScrollSpeed = 0;
    } else {
        if (ConsoleLoggingEnabled) console.log("Scroll speed decreased.");
        ScrollSpeed += adjustmentIncrement;
        if (ScrollSpeed > 1000) ScrollSpeed = 1000;
    }
    if (ConsoleLoggingEnabled) console.log("Scroll Speed: " + ScrollSpeed);
}

IncreaseScrollSpeedButton.onclick = function() {
    AdjustScrollSpeed(true);
}

DecreaseScrollSpeedButton.onclick = function() {
    AdjustScrollSpeed(false);
}

document.onkeydown = function(e) {
    if (e.which == 32 || e.which == 13) {           // On pressing Spacebar or Enter key.
        if (ConsoleLoggingEnabled) console.log("Spacebar or Enter key pushed.");
        TogglePausePlay();
        e.preventDefault();
    } else if (e.which == 37 || e.which == 65) {    // On pressing left arrow button or 'a' key.
        if (ConsoleLoggingEnabled) console.log("Left arrow or 'a' pushed."); // RBF update
        AdjustScrollSpeed(false);
        e.preventDefault();
    } else if (e.which == 39 || e.which == 68) {    // On pressing right arrow button or 'd' key.
        if (ConsoleLoggingEnabled) console.log("Right arrow or 'd' key pushed.");
        AdjustScrollSpeed(true);
        e.preventDefault();
    } else if (e.which == 38 || e.which == 87) {    // On pressing up arrow button or 'w' key.
        if (ConsoleLoggingEnabled) console.log("Up arrow button or 'w' key pushed.");
        ToggleDirection(false);
        e.preventDefault();
    } else if (e.which == 40 || e.which == 83) {    // On pressing down arrow button or 's' key.
        if (ConsoleLoggingEnabled) console.log("Down arrow or 's' key pushed.");
        ToggleDirection(true);
        e.preventDefault();
    } else if (e.which == 90 && e.ctrlKey) {
        if (ConsoleLoggingEnabled) console.log("CTRL+Z buttons pushed.");
        if (ConsoleLoggingEnabled) console.log("Reverting to previous text.");
        var temp = ScriptText.innerHTML;
        ScriptText.innerHTML = PreviousText;
        PreviousText = temp;
    }
}

/*
document.onpaste = function(e) {
    if (!TutorialCompleted) {
        if (ConsoleLoggingEnabled) console.log("Tutorial completed. Removing tutorial text.");
        TutorialCompleted = true;
        var InitialTutorialText = document.getElementById("InitialTutorialText");
        InitialTutorialText.parentNode.removeChild(InitialTutorialText);
    }
    if (ConsoleLoggingEnabled) console.log("Pasting new text from clipboard.");
    PreviousText = ScriptText.innerHTML;
    if (ConsoleLoggingEnabled) console.log("Old text saved to Undo: " + PreviousText);
    ScriptText.innerHTML = e.clipboardData.getData("Text");
}

document.oncopy = function(e) {
    if (ConsoleLoggingEnabled) console.log("Copying text to clipboard.");
    e.clipboardData.setData("Text", ScriptText.innerHTML);
}
*/

/*
    Dev Notes:
        Check RBF.
        Refactor.
        Documentation.

        Consider implementing a Markdown renderer.
        Fill out meta keywords and other meta information.
        Update readme.md.
        Disable debug console logging.
*/
