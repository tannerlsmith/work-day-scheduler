// timeblock function
function createTimeBlock(selectStart, selectEnd) {

    // creates time-block storage vars.
    var containerElement = $(".container");
    var timeElement = $("<div></div>")
        .addClass("row time-block");
    var hourElement = $("<div></div>")
        .addClass("col-1 hour");
    var content = $("<textarea></textarea>")
        .addClass("col-10")
        .attr("id", "textarea")
    var saveButton = $("<button></button>")
        .addClass("col-1 saveBtn")
        .html("<i class='fas fa-plus'></i>");
    // iterates through time
    for (var i = selectStart; i < selectEnd; i++) {
        // Adds Timeblock 
        timeElement
            .html(
                hourElement.html(
                    "<span>" +
                    (moment().set('hour', i).format('h a')).toUpperCase()
                    + "</span>")
                    .add(content)
                    .add(saveButton),
                content
                    .text(schedule[i]),
                saveButton
            );
            containerElement.append(

            timeElement.clone()
            .attr("id", (moment().set('hour', i).format('H')))
        );
    };
};

function updateTask(selectStart, selectEnd) {
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if (!schedule) { 
        schedule = {};
        for (var i = selectStart; i < selectEnd; i++) {
            schedule[i] = "";
        };
    };
};

function updateTimeBlock() {
    var currentTime = parseInt(moment().format('H'));
    var classy = ""; 

    for (var i = selectStart; i < selectEnd; i++) {
        if (i < currentTime) {
            classy = "past";
        } else if (i == currentTime) {
            classy = "present";
        } else {
            classy = "future";
        };

        $(String("#" + i)).find("textarea")
            .removeClass()
            .addClass(classy)
            .addClass("col-10")
    };
};

function updatePresent() {}

var time = 0;

var update_time = setInterval(function () {
    time = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay")
        .html(
            time.toString().substr(0, 13)
            + "\n\n" + time.toString().substr(15).toUpperCase()
        );

    if (moment().format("mm:ss") == "00:00") {
        console.log("updating timeblocks");
        updateTimeBlock(selectStart, selectEnd);
        updatePresent();
    }
    if (moment().format('s') == '0' || moment().format('s') == '30'){
        updatePresent();
    }
}, 1000);

var selectStart = 9; 
var selectEnd = 17 + 1; 

var schedule = {};

updateTask(selectStart, selectEnd);
createTimeBlock(selectStart, selectEnd);
updateTimeBlock(selectStart, selectEnd);
updatePresent();

$(".saveBtn").on("click", function () {
    var this_previous = $(($(this))[0].previousElementSibling);
    var this_previous_val = this_previous.val().trim();
    var this_block_id = this_previous[0].parentElement.id;

    schedule[this_block_id] = this_previous_val;
    localStorage.setItem("schedule", JSON.stringify(schedule));
});