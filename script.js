// Transform an array into an object
const schools = {
    Yorktown: 10,
    "Washington & Liberty": 2,
    Wakefield: 5
};

const arraySchools = Object.keys(schools).map(key => ({
    name: key,
    wins: schools[key]
}));

console.log(arraySchools);
// End Transform an array into an object
// #################################################################################################################################


// reduce and reduceRight to transform an array into any value including a number, string, boolean, or even a function
// Find the maximum number in an array of numbers
const ages = [21, 18, 42, 40, 64, 63, 34];

const maxAge = ages.reduce((max, age) => {
    console.log(`${age} > ${max} = ${age > max}`);
    if (age > max) {
        return age;
    } else {
        return max;
    }
}, 0);

console.log("maxAge", maxAge);
document.getElementById("reduce").innerHTML = (`maxAge: ${maxAge}`);
// End reduce and reduceRight
// #################################################################################################################################

// reduce to tranform an array into an object
// Transform an array that contains colors into a hash
const colors = [
    {
        id: "xekare",
        title: "rad red",
        rating: 3
    },
    {
        id: "jbwsof",
        title: "big blue",
        ratting: 2
    },
    {
        id: "prigbj",
        title: "grizzly grey",
        ratting: 5
    },
    {
        id: "ryhbhsl",
        title: "banana",
        rating: 1
    }
]

const hashColors = colors.reduce((hash, { id, title, rating }) => {
    hash[id] = { title, rating };
    return hash;
}, {});

console.log(hashColors);
document.getElementById("hashColors").innerHTML = hashColors;
// End // Transform an array that contains colors into a hash
// #################################################################################################################################


// Transform arrays into different arrays using reduce
// Remove repeated values from the array
const colors1 = ["red", "blue", "green", "red", "green"];

const uniqueColors = colors1.reduce(
    (unique, color) =>
        unique.indexOf(color) !== -1 ? unique : [...unique, color],
    []
);

console.log(uniqueColors)
document.getElementById("colorsUnique").innerHTML = uniqueColors;
// End // Remove repeated values from the array
// #################################################################################################################################


// Higher order functions
// Return a call back function if true or another callback function if it is false
const invokeIf = (condition, fnTrue, fnFalse) =>
    condition ? fnTrue() : fnFalse();
const showWelcome = () => console.log("Welcome!!!");
const showUnauthorized = () => console.log("Unauthorized!!!");
invokeIf(true, showWelcome, showUnauthorized); // "Welcome!!!"
invokeIf(false, showWelcome, showUnauthorized); // "Unauthorized!!!"
// End Return a call back function if true or another callback function if it is false
// #################################################################################################################################


// Higher order function
// const userLogs = userName => message =>
//     console.log(`${userName} -> ${message}`);

// const log = userLogs("grandpa23");

// log("attempted to load 20 fake members");
// getFakeMembers(20).then(
//     members => log(`successfully loaded ${members.length} members`),
//     error => log("encountered an error loading members")
// );
// End high order funcition
// #################################################################################################################################


// Recursion
// Countdown from 10 to 0 with recursion
const countdown = (value, numberCountdown) => {
    numberCountdown(value);
    return value > 0 ? countdown(value - 1, numberCountdown) : value;
}

countdown(10, numberCountdown => console.log(numberCountdown));
// End countdown from 10 to 0 with recursion
// #################################################################################################################################


// Recursion
// Timer countdown
const timer = (count, fn, delay = 1000) => {
    fn(count)
    document.getElementById("timerCountdown").innerHTML = count
    return count > 0
        ? setTimeout(() => timer(count - 1, fn, delay), delay)
        : count;
}

const log2 = (count) => console.log(count);
timer(10, log2)
// End timer countdown
// #################################################################################################################################


// Recursion
// Searching data structures
const john = {
    type: "person",
    data: {
        gender: "male",
        info: {
            id: 22,
            fullname: {
                first: "John",
                last: "Deacon"
            }
        }
    }
};

const deepPick = (fields, object = {}) => {
    const [first, ...remaining] = fields.split(".");
    console.log(`first: ${first}`)
    console.log(`Remainig: ${remaining}`)
    console.log(`Remaining length: ${remaining.length}`)
    return remaining.length
        ? deepPick(remaining.join("."), object[first])
        : object[first];
};

deepPick("type", john); // Get the type of john
deepPick("data.info.fullname.first"); // Specify the location of the values to get
// End searching data structures
// #################################################################################################################################


// PUTTING ALL TOGETHER
// Clock application
const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log1 = message => console.log(message);

// Functions to trasnform data
const serializeClockTime = date => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
});

const civilianHours = clockTime => ({
    ...clockTime,
    hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours
});

const appendAMPM = clockTime => ({
    ...clockTime,
    ampm: clockTime.hours > 12 ? "PM" : "AM"
});

// A few higher-order functions that will be invoked to create the functions that will be reused to format the click time for every tick
const display = target => time => target(time); // Returns a function that will send a time to the target (console.log)

// Takes a template string and usses it to return clock time formatted based on the criteria from the string
const formatClock = format => time =>
    format
        .replace("hh", time.hours)
        .replace("mm", time.minutes)
        .replace("ss", time.seconds)
        .replace("tt", time.ampm);
// Appends 0 if the numbers are less than 10
const appendZero = key => clockTime => ({
    ...clockTime,
    key: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key]
});

// Compose the functions
// A single function that takes clockTime as an argument and transforms it into civilian time by using both civilian hours
const convertToCivilianTime = clockTime => compose(
    appendAMPM,
    civilianHours,
)(clockTime);

// A single function that tahkes civilian clock time and makes sure the hours, minutes, and seconds display double digits by prepending zeros where needed
const doubleDigits = civilianHours =>
    compose(
        appendZero("hours"),
        appendZero("minutes"),
        appendZero("seconds")
    )(civilianHours);

// Starts the clock by setting an interval that invokes a callback every second.
// The callback is composed using all our functions. Every second the console is cleared, currentTime is obtained, converted, vilianized, formated and displayed
const startTicking = () =>
        setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log1)
        ),
        oneSecond()
    );

    startTicking();
// End Putting it all together
// #################################################################################################################################