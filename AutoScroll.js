// Declare global variables.
var ConsoleLoggingEnabled = false;

var TogglePausePlayButton = document.getElementById("TogglePausePlayButton");
var Pause = "‖";
var Play = ">";

var ToggleDirectionButton = document.getElementById("ToggleDirectionButton");
var Up = "˄";
var Down = "˅";

var ScrollSpeed = 0.25 * 1000; // 250 milliseconds.
var IncreaseScrollSpeedButton = document.getElementById("IncreaseScrollSpeedButton");
var DecreaseScrollSpeedButton = document.getElementById("DecreaseScrollSpeedButton");

var ScriptText = document.getElementById("ScriptText");
var TutorialCompleted = false;

var InputBox = document.getElementById("InputBox");
/*
    Automatically scrolls the page.

    Recursive loop that continually scrolls while the play button is on play.
    Scrolls up or down depending on the direction button.
    Scrolls at the speed determined by the speed adjustment buttons.
*/
function AutoScroll() {
    if (TogglePausePlayButton.innerHTML == Pause) {
        if (ToggleDirectionButton.innerHTML == Down)
            window.scrollBy(0, -1);
        else
            window.scrollBy(0, 1);
        timeout = window.setTimeout(AutoScroll, ScrollSpeed);
    }
}
/*
    Toggle pause/play of auto-scroll.
    Technically only changes the play button's text, which is used in AutoScroll() to determine whether to scroll.
    Can be called be either clicking the play button(TogglePausePlayButton.onclick) or by keyboard commands (document.onkeydown).
*/
function TogglePausePlay() {
    if (TogglePausePlayButton.innerHTML == Pause) {
        TogglePausePlayButton.innerHTML = Play;
        if (ConsoleLoggingEnabled) console.log("Paused.");
    } else {
        TogglePausePlayButton.innerHTML = Pause;
        if (ConsoleLoggingEnabled) console.log("Scrolling.");
        AutoScroll();
    }
}
/*
    Toggles pause/play of auto-scroll.
    Simply calls TogglePausePlay().
*/
TogglePausePlayButton.onclick = function() {
    if (ConsoleLoggingEnabled) console.log("Toggle pause/play button clicked.");
    TogglePausePlay();
}
/*
    Toggles up/down auto-scroll direction.
    Technically only changes the play button's text, which is used in AutoScroll() to determine which direction to scroll.
    Can be called be either clicking the direction button (ToggleDirectionButton.onclick) or by keyboard commands (document.onkeydown).

    Overloaded function:
        0 arguments:        Toggles to the other direction.
        1 Boolean argument: True sets it to down, false sets it to up.
*/
function ToggleDirection(down) {
    if (typeof down == "undefined")
        if (ToggleDirectionButton.innerHTML == Down)
            down = true;
        else
            down = false;
    if (down) {
        ToggleDirectionButton.innerHTML = Up;
        if (ConsoleLoggingEnabled) console.log("Set to scroll downwards.");
    } else {
        ToggleDirectionButton.innerHTML = Down;
        if (ConsoleLoggingEnabled) console.log("Set to scroll upwards.");
    }
}
/*
    Toggles up/down auto-scroll direction.
    Simply calls ToggleDirection().
*/
ToggleDirectionButton.onclick = function() {
    if (ConsoleLoggingEnabled) console.log("Toggle direction button clicked.");
    ToggleDirection();
}
/*
    Increments auto-scroll speed to be faster or slower.
    Technically only changes ScrollSpeed variable, which is the number of milliseconds waited before scrolling again.
    A smaller ScrollSpeed number of milliseconds produces a faster scroll while a larger ScrollSpeed number of milliseconds produces a slower scroll.
    Can be called be either clicking either speed adjustment buttons (IncreaseScrollSpeedButton.onclick and DecreaseScrollSpeedButton.onclick) or by keyboard commands (document.onkeydown).
*/
function AdjustScrollSpeed(increasing) {
    var adjustmentIncrement = 0.025 * 1000;
    if (increasing) {
        ScrollSpeed -= adjustmentIncrement;
        if (ScrollSpeed < 0) ScrollSpeed = 0;
        if (ConsoleLoggingEnabled) console.log("Scroll speed increased.");
    } else {
        ScrollSpeed += adjustmentIncrement;
        if (ScrollSpeed > 1000) ScrollSpeed = 1000;
        if (ConsoleLoggingEnabled) console.log("Scroll speed decreased.");
    }
    if (ConsoleLoggingEnabled) console.log("Scroll Speed: " + ScrollSpeed);
}
/*
    Increases auto-scroll speed.
    Simply calls AdjustScrollSpeed().
*/
IncreaseScrollSpeedButton.onclick = function() {
    AdjustScrollSpeed(true);
}
/*
    Decreases auto-scroll speed.
    Simply calls AdjustScrollSpeed().
*/
DecreaseScrollSpeedButton.onclick = function() {
    AdjustScrollSpeed(false);
}
// Defines a slew of keyboard commands.
document.onkeydown = function(e) {
    if (e.which == 32 || e.which == 13) {           // On pressing Spacebar or Enter key, toggle pause/play of auto-scroll using TogglePausePlay().
        TogglePausePlay();
        e.preventDefault();
        if (ConsoleLoggingEnabled) console.log("Spacebar or Enter key pushed.");
    } else if (e.which == 38 || e.which == 87) {    // On pressing up arrow button or 'w' key, change auto-scroll direction to up using ToggleDirection().
        ToggleDirection(false);
        e.preventDefault();
        if (ConsoleLoggingEnabled) console.log("Up arrow button or 'w' key pushed.");
    } else if (e.which == 40 || e.which == 83) {    // On pressing down arrow button or 's' key, change auto-scroll direction to down using ToggleDirection().
        ToggleDirection(true);
        e.preventDefault();
        if (ConsoleLoggingEnabled) console.log("Down arrow or 's' key pushed.");
    } else if (e.which == 39 || e.which == 68) {    // On pressing right arrow button or 'd' key, increase auto-scroll speed using AdjustScrollSpeed().
        AdjustScrollSpeed(true);
        e.preventDefault();
        if (ConsoleLoggingEnabled) console.log("Right arrow or 'd' key pushed.");
    } else if (e.which == 37 || e.which == 65) {    // On pressing left arrow button or 'a' key, decrease auto-scroll speed using AdjustScrollSpeed().
        AdjustScrollSpeed(false);
        e.preventDefault();
        if (ConsoleLoggingEnabled) console.log("Left arrow or 'a' pushed.");
    } else if (e.which == 90 && e.ctrlKey) {        // On pressing CTRL+Z, refresh the page from cache.
        location.reload(false);
    }
}
/*
    Pastes script text from the clipboard into body.
    Technically, the user pastes text from the clipboard to the textarea, which automatically converts its text to ScriptText's HTML.
    Also removes the initial tutorial text if it hasn't already been removed.
*/
InputBox.oninput = function() {
    ScriptText.innerHTML = InputBox.value;
    if (!TutorialCompleted) {
        TutorialCompleted = true;
        var InitialTutorialText = document.getElementById("InitialTutorialText");
        InitialTutorialText.parentNode.removeChild(InitialTutorialText);
        if (ConsoleLoggingEnabled) console.log("Tutorial completed. Removing tutorial text.");
    }
}
// Automatically selects InputBox on page load so the user can immediately paste their script.
InputBox.select();
/*
    Dev Notes:
        Check RBF.
        Refactoring.
        Documentation.
        Disable debug console logging.
        Increase responsiveness.

        Consider implementing a Markdown renderer.
        Fill out meta keywords and other meta information.
        Update readme.md.

        Test HTML:
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        Normal text.<br>
        <i>Italicized text.</i><br>
        <b>Bold text.</b><br>
        <em>Emphasized text.</em><br>
        <strong>Strong text.</strong><br>
        <u>Underlined text.</u><br>
        <a href="ScriptText">Link text.</a><br>
        <code>Code text.</code><br>
        <big>Big text.</big><br>
        <small>Small text.</small><br>
        <sup>Superscript text.</sup><br>
        <sub>Subscript text.</sub><br>
        <pre>
            It little profits that an idle king,
            By this still hearth, among these barren crags,
            Match'd with an aged wife, I mete and dole
            Unequal laws unto a savage race,
            That hoard, and sleep, and feed, and know not me.
            I cannot rest from travel: I will drink
            Life to the lees: All times I have enjoy'd
            Greatly, have suffer'd greatly, both with those
            That loved me, and alone, on shore, and when
            Thro' scudding drifts the rainy Hyades
            Vext the dim sea: I am become a name;
            For always roaming with a hungry heart
            Much have I seen and known; cities of men
            And manners, climates, councils, governments,
            Myself not least, but honour'd of them all;
            And drunk delight of battle with my peers,
            Far on the ringing plains of windy Troy.
            I am a part of all that I have met;
            Yet all experience is an arch wherethro'
            Gleams that untravell'd world whose margin fades
            For ever and forever when I move.
            How dull it is to pause, to make an end,
            To rust unburnish'd, not to shine in use!
            As tho' to breathe were life! Life piled on life
            Were all too little, and of one to me
            Little remains: but every hour is saved
            From that eternal silence, something more,
            A bringer of new things; and vile it were
            For some three suns to store and hoard myself,
            And this gray spirit yearning in desire
            To follow knowledge like a sinking star,
            Beyond the utmost bound of human thought.

            This is my son, mine own Telemachus,
            To whom I leave the sceptre and the isle,—
            Well-loved of me, discerning to fulfil
            This labour, by slow prudence to make mild
            A rugged people, and thro' soft degrees
            Subdue them to the useful and the good.
            Most blameless is he, centred in the sphere
            Of common duties, decent not to fail
            In offices of tenderness, and pay
            Meet adoration to my household gods,
            When I am gone. He works his work, I mine.

            There lies the port; the vessel puffs her sail:
            There gloom the dark, broad seas. My mariners,
            Souls that have toil'd, and wrought, and thought with me—
            That ever with a frolic welcome took
            The thunder and the sunshine, and opposed
            Free hearts, free foreheads—you and I are old;
            Old age hath yet his honour and his toil;
            Death closes all: but something ere the end,
            Some work of noble note, may yet be done,
            Not unbecoming men that strove with Gods.
            The lights begin to twinkle from the rocks:
            The long day wanes: the slow moon climbs: the deep
            Moans round with many voices. Come, my friends,
            'T is not too late to seek a newer world.
            Push off, and sitting well in order smite
            The sounding furrows; for my purpose holds
            To sail beyond the sunset, and the baths
            Of all the western stars, until I die.
            It may be that the gulfs will wash us down:
            It may be we shall touch the Happy Isles,
            And see the great Achilles, whom we knew.
            Tho' much is taken, much abides; and tho'
            We are not now that strength which in old days
            Moved earth and heaven, that which we are, we are;
            One equal temper of heroic hearts,
            Made weak by time and fate, but strong in will
            To strive, to seek, to find, and not to yield.</pre><br>
            - Ulysses, by Alfred Lord Tennyson.<br/>
            <blockquote>Doesn't matter what the press says. Doesn't matter what the politicians or the mobs say. Doesn't matter if the whole country decides that something wrong is something right. This nation was founded on one principle above all else: the requirement that we stand up for what we believe, no matter the odds or the consequences. When the mob and the press and the whole world tell you to move, your job is to plant yourself like a tree beside the river of truth, and tell the whole world — "No, you move."</blockquote><br/>
            - Captain America.<br>
*/
