let displaydTimeOnScreen ="";
const passages = {};

for (let i = 0; i <= 150; i++) {
    passages[`English Passage ${i+1}`] = englishParagraphs[i];
}
passages[`Marathi Passage 1 (Easy)`] = marathiPassage1Easy;
for (let i = 0; i <= 150; i++) {
  passages[`Marathi Passage ${i+1}`] = marathiParagraphs[i];
}


const minFontSize = 10; 
const maxFontSize = 30; 
const displayPassage = document.getElementById("displaypassage");
const inputElement = document.getElementById('textInput');
const wordCountElement = document.getElementById('wordCount');
const keystrokesCountElement = document.getElementById('keystrokesCount');
const pendingWordCountElement = document.getElementById('pendingWord');
const upperBoxText = document.getElementById('loremIpsumBox');
const totalWordsCount = document.getElementById('totalWordsCount');
const backSpaceCount = document.getElementById('backspaceCount');
const textInput = document.getElementById('textInput');
const timerDisplay = document.getElementById('screenTimer');


let currentValue = inputElement.value;
let words = currentValue.trim().split(/\s+/);
let prevWordCount = words.length;
let flag = 0;

let startTime;
let timerInterval;
let elapsedTime = 0;
let elapsedTimeInSeconds=0;

let totalKeyStrokes2000 = 0;
let correctKeyStroke2000 = 0;
let incorrectKeyStrokes2000 = 0;
let totalWords2000 = 0;
let correctWords2000 = 0;
let incorrectWords2000 = 0;
let correctkeystrokesPercent2000 = 0;
let resultBackSpaceCount = 0;
let passFailValue = "";

// JavaScript for increasing and decreasing font size
document.getElementById("increaseFontSize").addEventListener("click", function() {
    increaseFontSize("loremIpsumBox");
    increaseFontSize("textInput");
  });

  document.getElementById("decreaseFontSize").addEventListener("click", function() {
    decreaseFontSize("loremIpsumBox");
    decreaseFontSize("textInput");
  });

  function increaseFontSize(elementId) {
    var element = document.getElementById(elementId);
    var currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    var newFontSize = currentFontSize * 1.1; // Increase font size by 10%

    // Check if new font size exceeds the maximum limit
    if (newFontSize <= maxFontSize) {
        element.style.fontSize = newFontSize + "px";
    } else {
        element.style.fontSize = maxFontSize + "px"; // Set font size to maximum limit
    }
}

function decreaseFontSize(elementId) {
    var element = document.getElementById(elementId);
    var currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    var newFontSize = currentFontSize / 1.1; // Decrease font size by 10%

    // Check if new font size exceeds the minimum limit
    if (newFontSize >= minFontSize) {
        element.style.fontSize = newFontSize + "px";
    } else {
        element.style.fontSize = minFontSize + "px"; // Set font size to minimum limit
    }
}

function isPass(parameter){
    if(parameter >= 1860){
        return "Pass";
    }
    else{
        return "Fail";
    }
}

// Initialize upper box text
upperBoxText.textContent = englishParagraphs[1];
displayPassage.textContent = passageNumber();
let sampleContent = upperBoxText.innerText.trim().split(' ');
totalWordsCount.innerText = `${sampleContent.length}`;
pendingWordCountElement.innerText =`${sampleContent.length}`;

// Initialize previous character count
let previousCharacterCount = inputElement.value.length;
let currentCharacterCount = 0;




// Define handleInputAndKeypress function
function handleInputAndKeypress(event) {
  if (!startTime) {
      startTime = new Date();
      clearInterval(timerInterval); // Clear any existing interval
      timerInterval = setInterval(updateTimer, 1000); // Start updating timer every second
  }
  let sample = upperBoxText.innerText.trim().split(' ');

  currentValue = inputElement.value;
  words = currentValue.trim().split(/\s+/);
  wordCount = words.length;
  const sanitizedValue = currentValue.replace(/\s{2,}/g, ' ');
  if (currentValue !== sanitizedValue) {
      inputElement.value = sanitizedValue;
  }

  currentCharacterCount = currentValue.length;
  flag = 1;
  prevWordCount = wordCount;

  if (currentCharacterCount < previousCharacterCount) {

      backSpaceCount.textContent = `${parseInt(backSpaceCount.textContent) + (previousCharacterCount - currentCharacterCount)}`;
      resultBackSpaceCount = backSpaceCount.textContent;
  }

  correctKeyStroke2000 = calculateCorrectKeystrokes(sample, words)[0];
  correctWords2000 = calculateCorrectKeystrokes(sample, words)[1];
  document.getElementById("errorcount").textContent = Math.min((calculateCorrectKeystrokes(sample, words)[2]),wordCount);
    document.getElementById("errorcount").textContent = 0;
  document.getElementById("box2").innerHTML = calculateCorrectKeystrokes(sample, words)[3].join(" ");
  document.getElementById("box1").innerHTML = calculateCorrectKeystrokes(sample, words)[4].join(" ");

  previousCharacterCount = currentCharacterCount;

  wordCountElement.textContent = `${wordCount}`;
  totalWords2000 = wordCount;
  incorrectWords2000 = totalWords2000 - correctWords2000;

  const actualKeystrokesCount = currentCharacterCount - (currentValue.match(/ +/g) || []).reduce((total, space) => total + space.length - 1, 0);
  keystrokesCountElement.textContent = `${actualKeystrokesCount}`;
  totalKeyStrokes2000 = actualKeystrokesCount;
  incorrectKeyStrokes2000 = totalKeyStrokes2000 - correctKeyStroke2000;
  correctkeystrokesPercent2000 = (correctKeyStroke2000 / totalKeyStrokes2000) * 100;
  correctkeystrokesPercent2000 = parseFloat(correctkeystrokesPercent2000.toFixed(2));
  passFailValue = isPass(correctKeyStroke2000);

  pendingWordCountElement.textContent = `${parseInt(totalWordsCount.textContent) - parseInt(wordCountElement.textContent)}`;
  if (!inputElement.value) {
      previousCharacterCount = 0;
  }
}

function handleInputAndKeypress(event) {
  if (!startTime) {
      startTime = new Date();
      clearInterval(timerInterval); // Clear any existing interval
      timerInterval = setInterval(updateTimer, 1000); // Start updating timer every second
  }
  let sample = upperBoxText.innerText.trim().split(' ');

  currentValue = inputElement.value;
  words = currentValue.trim().split(/\s+/);
  wordCount = words.length;
  const sanitizedValue = currentValue.replace(/\s{2,}/g, ' ');
  if (currentValue !== sanitizedValue) {
      inputElement.value = sanitizedValue;
  }

  currentCharacterCount = currentValue.length;
  flag = 1;
  prevWordCount = wordCount;

  if (currentCharacterCount < previousCharacterCount) {

      backSpaceCount.textContent = `${parseInt(backSpaceCount.textContent) + (previousCharacterCount - currentCharacterCount)}`;
      resultBackSpaceCount = parseInt(backSpaceCount.textContent);
  }

  correctKeyStroke2000 = calculateCorrectKeystrokes(sample, words)[0];
  correctWords2000 = calculateCorrectKeystrokes(sample, words)[1];
  document.getElementById("errorcount").textContent = (calculateCorrectKeystrokes(sample, words)[2]);
  document.getElementById("box2").innerHTML = calculateCorrectKeystrokes(sample, words)[3].join(" ");
  document.getElementById("box1").innerHTML = calculateCorrectKeystrokes(sample, words)[4].join(" ");

  previousCharacterCount = currentCharacterCount;

  wordCountElement.textContent = `${wordCount}`;
  totalWords2000 = wordCount;
  incorrectWords2000 = totalWords2000 - correctWords2000;

  const actualKeystrokesCount = currentCharacterCount - (currentValue.match(/ +/g) || []).reduce((total, space) => total + space.length - 1, 0);
  keystrokesCountElement.textContent = `${actualKeystrokesCount}`;
  totalKeyStrokes2000 = actualKeystrokesCount;
  incorrectKeyStrokes2000 = totalKeyStrokes2000 - correctKeyStroke2000;
  correctkeystrokesPercent2000 = (correctKeyStroke2000 / totalKeyStrokes2000) * 100;
  correctkeystrokesPercent2000 = parseFloat(correctkeystrokesPercent2000.toFixed(2));
  passFailValue = isPass(correctKeyStroke2000);

  pendingWordCountElement.textContent = `${parseInt(totalWordsCount.textContent) - parseInt(wordCountElement.textContent)}`;
  if (!inputElement.value) {
      previousCharacterCount = 0;
  }
}

// Attach event listeners to inputElement
inputElement.addEventListener('input', function(event) {
  if (event.target.value !== currentValue) {
      handleInputAndKeypress(event);
  }
});
function convertKeyBoardToMarathi() {
  inputElement.addEventListener('keypress', replaceWithMarathi);
  inputElement.addEventListener('keypress', handleInputAndKeypress);
  inputElement.addEventListener('input', handleInputAndKeypress);
}

function convertKeyboardToEnglish() {
  inputElement.removeEventListener('keypress', replaceWithMarathi);
  inputElement.removeEventListener('keypress', handleInputAndKeypress);
  inputElement.removeEventListener('input', handleInputAndKeypress);
}




inputElement.addEventListener('keyup', function(event) {
    
    if (event.key === 'Backspace') {
        // Update the word count after backspace
        const currentValue = inputElement.value;
        const words = currentValue.trim().split(/\s+/).filter(word => word !== ''); // Filter out empty strings
        const wordCount = words.length;
        wordCountElement.textContent = `${wordCount}`;
        totalWords2000 = wordCount;
        incorrectWords2000 = totalWords2000 - correctWords2000;
        if(!inputElement.value){
          pendingWordCountElement.innerText =`${totalWordsCount.textContent}`;
        }


    }
});
let CurrentDisplaySeconds = document.getElementById("screenTimer").textContent.split(":").map(Number)[0]*60 + document.getElementById("screenTimer").textContent.split(":").map(Number)[1];
function updateTimer() {
    const currentTime = new Date();
    elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
    const remainingTimeInSeconds = CurrentDisplaySeconds - elapsedTimeInSeconds; 
    const minutes = Math.floor(remainingTimeInSeconds / 60);
    const seconds = remainingTimeInSeconds % 60;
    timerDisplay.innerHTML = `${minutes}:${("0"+seconds).slice(-2)}`;

    if (remainingTimeInSeconds <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Time's up!";
        openTimeEndedPopup();
        disableInput();
    }
}

function resetTimer() {
    clearInterval(timerInterval); // Clear any existing interval
    startTime = false;
    resetAllData();
    timerDisplay.textContent = '10:00'; // Reset the timer display to initial value
    CurrentDisplaySeconds = 600;
}


function showPopup() {
  document.getElementById("usedtypingmin").innerText = parseInt(elapsedTimeInSeconds/60);
  document.getElementById("usedtypingsec").innerText = parseInt(elapsedTimeInSeconds%60);
  document.getElementById("resultofstudent").innerText = passFailValue;

  document.getElementById("TypedPassageName").innerText = passageNumber();
  document.getElementById("totalKeyStrokes2000").innerText = totalKeyStrokes2000;
  document.getElementById("correctKeyStroke2000").innerText = correctKeyStroke2000;
  document.getElementById("incorrectKeyStrokes2000").innerText = incorrectKeyStrokes2000;
  document.getElementById("totalWords2000").innerText = totalWords2000;
  document.getElementById("correctWords2000").innerText = correctWords2000;
  document.getElementById("incorrectWords2000").innerText = incorrectWords2000;
  document.getElementById("correctkeystrokesPercent2000").innerText = correctkeystrokesPercent2000;
  document.getElementById("resultofstudent2000").innerText = passFailValue;

  document.getElementById("totalKeyStrokesfull").innerText = totalKeyStrokes2000;
  document.getElementById("correctKeyStrokefull").innerText = correctKeyStroke2000;
  document.getElementById("incorrectKeyStrokesfull").innerText = incorrectKeyStrokes2000;
  document.getElementById("totalWordsfull").innerText = totalWords2000;
  document.getElementById("correctWordsfull").innerText = correctWords2000;
  document.getElementById("incorrectWordsfull").innerText = incorrectWords2000;
  document.getElementById("correctkeystrokesPercentfull").innerText = correctkeystrokesPercent2000;
  document.getElementById("resultofstudentfull").innerText = passFailValue;

  elapsedTimeInSeconds?(document.getElementById("cpm").innerText = ((totalKeyStrokes2000 / elapsedTimeInSeconds) * 60).toFixed(2)):(document.getElementById("cpm").innerText=0);
  elapsedTimeInSeconds?(document.getElementById("gwpm").innerText = ((totalWords2000 / elapsedTimeInSeconds) * 60).toFixed(2)):(document.getElementById("gwpm").innerText=0);
  elapsedTimeInSeconds?(document.getElementById("nwpm").innerText = ((correctWords2000 / elapsedTimeInSeconds) * 60).toFixed(2)):(document.getElementById("nwpm").innerText=0);
  let accuracy = (((correctWords2000 / elapsedTimeInSeconds) * 60) / ((totalWords2000 / elapsedTimeInSeconds) * 60)) * 100;
  elapsedTimeInSeconds?(document.getElementById("accuracy").innerText = accuracy.toFixed(2)):(document.getElementById("accuracy").innerText=0);
  document.getElementById("backspaceCount1").innerText = resultBackSpaceCount;

document.getElementById('result1').style.display = 'block';
}
function hideResult2() {
    document.getElementById('result1').style.display = 'none';
  }

function stopTimer() {
    clearInterval(timerInterval);
 }







 function resetAllData(){
  currentCharacterCount=0;
  previousCharacterCount=0;
  textInput.value = "";
  totalKeyStrokes2000 = 0;
  correctKeyStroke2000 = 0;
  incorrectKeyStrokes2000 = 0;
  totalWords2000 = 0;
  correctWords2000 = 0;
  incorrectWords2000 = 0;
  correctkeystrokesPercent2000 = 0;
  resultBackSpaceCount = 0;
  wordCountElement.innerText = '0';
  keystrokesCountElement.innerText = 0;
  pendingWordCountElement.innerText = upperBoxText.innerText.split(" ").length;
  totalWordsCount.innerText = upperBoxText.innerText.split(" ").length;
  backSpaceCount.innerText = 0 ;

}
function calculateCorrectKeystrokes(screenWords, userWords) {
  let arrayForComparingPassage2 =[...screenWords]
  let arrayForComparingPassage = [];
  let correctKeystrokes = 0;
  let correctWords = 0;

  let screenIndex = 0;
  let userIndex = 0;
  let errorCount = 0;

  while (screenIndex < screenWords.length && userIndex < userWords.length) {
      // Check if the words match exactly
      if (screenWords[screenIndex] === userWords[userIndex]) {
          correctKeystrokes += screenWords[screenIndex].length;
          correctWords++;
          arrayForComparingPassage.push(`<span style='color:green;font-weight:bold'>${screenWords[screenIndex]}</span>`)
          arrayForComparingPassage2[screenIndex] =`<span style='color:green;font-weight:bold'>${screenWords[screenIndex]}</span>`
      } else {
          // Check for different types of error
          arrayForComparingPassage.push(`<span style='color:red'>${ userWords[userIndex]}</span>`)
          arrayForComparingPassage2[userIndex] = `<span style ="background-color:yellow">${ screenWords[userIndex]}</span>`
          arrayForComparingPassage2[screenWords.indexOf(userWords[userIndex])] =`<span style='color:green;font-weight:bold'>${screenWords[screenWords.indexOf(userWords[userIndex])]}</span>`
          
          
          // Omission of word
          if(userWords[userIndex].length){
          errorCount++;}

          if (screenWords.slice(screenIndex + 1).join(" ").includes(userWords[userIndex])) {
              screenIndex++;
          }
          // Substitution of a wrong word or addition of a word
          else if (userWords.slice(userIndex + 1).join(" ").includes(screenWords[screenIndex])) {
              userIndex++;
          }
          // Spelling errors (repetition, addition, transposition, omission, substitution of letters)
          else {
              let screenWord = screenWords[screenIndex];
              let userWord = userWords[userIndex];
              let errors = 0;

              // Compare each character
              for (let i = 0; i < Math.min(screenWord.length, userWord.length); i++) {
                  if (screenWord[i] !== userWord[i]) {
                      errors++;
                  }
              }

              // Handle differences in word lengths
              errors += Math.abs(screenWord.length - userWord.length);

              // Penalize for each mistake
              correctKeystrokes += (screenWord.length - errors);
          }
      }

      screenIndex++;
      userIndex++;
    
  }

  return [Math.max(correctKeystrokes+correctWords-1,0), correctWords,errorCount,arrayForComparingPassage,arrayForComparingPassage2];
}








// Function to disable input for the text input field
function disableInput() {
  // Get reference to the text input field
  const textInput = document.getElementById('textInput');
  
  // Set the disabled attribute to true
  textInput.disabled = true;
}

function enableInput() {
  // Get reference to the text input field
  const textInput = document.getElementById('textInput');
  
  // Set the disabled attribute to false
  textInput.disabled = false;
}





function updateTimerforSelect() {
  // Get the selected time from the dropdown
  const selectedTime = document.getElementById("timeInput").value;
  
  // Split the current timer into minutes and seconds
  const [currentMinutes, currentSeconds] = document.getElementById("screenTimer").textContent.split(":").map(Number);
  
  // Calculate the new time by adding the selected time to the current tim
  let newSecond = 0;
  let newMinutes = parseInt(selectedTime);
  if(selectedTime.includes(":")){
    newSecond = parseInt(selectedTime.split(":")[1]);
    newMinutes = parseInt(selectedTime.split(":").map(Number)[0]);

  }
  else if(selectedTime.includes(".")){
    newSecond = parseInt(selectedTime.split(".")[1]);
    newMinutes = parseInt(selectedTime.split(".").map(Number)[0]);

  }
  else if(selectedTime.includes(" ")){
    newSecond = parseInt(selectedTime.split(" ")[1]);
    newMinutes = parseInt(selectedTime.split(" ").map(Number)[0]);

  }
  
  // Update the timer display with the new time
  displaydTimeOnScreen = `${newMinutes ? newMinutes : "00"}:${newSecond ? ("0"+newSecond).slice(-2) : "00"}`
  document.getElementById("screenTimer").textContent = displaydTimeOnScreen;
  CurrentDisplaySeconds = document.getElementById("screenTimer").textContent.split(":").map(Number)[0]*60 + document.getElementById("screenTimer").textContent.split(":").map(Number)[1]
  document.getElementById("timeInput").value = ""
}

function changePassage( selectedPassage) {

  upperBoxText.textContent = passages[selectedPassage] || "Passage not found!";
  
  displayPassage.textContent = passageNumber();
  resetAllData();
}

function resetAllSelects(){
  document.querySelectorAll('select')[1].value = "Hard Level"
}


function passageNumber() {
  for (let i = 0; i <= 150; i++) {
    passages[englishParagraphs[i]] = `English Passage ${i+1}`
}
passages[ marathiPassage1Easy] = `Marathi Passage 1 (Easy)`;
for (let i = 0; i <= 150; i++) {
  passages[marathiParagraphs[i+1]] = `Marathi Passage ${i+1}`
}

  return passages[upperBoxText.textContent] || "Passage not found!";
}





// Object mapping languages to keyboard layouts
const keyboardLayouts = {
  'en-US': 'qwerty', // English US layout
  'hi-IN': 'devanagari', // Hindi Devanagari layout
  // Add more language-layout mappings as needed
};

// Function to detect user's language
function detectLanguage() {
  // Example: using navigator.language to get the language
  return navigator.language;
}

const marathiKeyboardMapping={
'a' : 'ं',

'b' : 'इ',

'c' : 'ब',

'd' : 'क',

'e' : 'म',

'f' : '‍ि',

'g' : 'ह',

'h' : 'ी',

'i' : 'प',

'j' : 'र',

'k' : 'ा',

'l' : 'स',

'm' : 'उ',

'n' : 'द',

'o' : 'व',

'p' : 'च',

'q' : 'ु',

'r' : 'त',

's' : 'े',

't' : 'ज',

'u' : 'न',

'v' : 'अ',

'w' : 'ू',

'x' : 'ग',

'y' : 'ल',

'z' : '्',


'A' : 'ा',

'B' : 'ठ',

'C' : 'ब्‍ ',

'D' : 'क्‍ ',

'E' : 'म्‍',

'F' : 'थ्‍ ',

'G' : 'ळ',

'H' : 'भ्‍',

'I' : 'प्‍' ,

'J' : 'श्र' ,

'K' : 'ज्ञ',

'L' : 'स्‍',

'M' : 'ड',

'N' : 'छ',

'O' : 'व्‍',

'P' : 'च्‍',

'Q' : 'फ',

'R' : 'त्‍',

'S' :' ै',

'T' :'ज्‍',

'U' : 'न्‍',

'V' : 'ट',

'W' : 'ॅ',

'X' : 'ग्‍',

'Y' : 'ल्‍',

'Z' : 'र्‍',


"`" : '़',

'1' : '१',

'2' : '२',

'3' : '३',

'4' : '४',

'5' : '५',

'6' : '६',

'7' : '७',

'8' : '८',

'9' : '९',

'0' : '०',

'-' : 'ञ',

'=' : 'ृ',

'[' : 'ख्‍',

']' : ',',

";" : 'य',

"'" : 'श्‍',

"," : 'ए',

'.' : 'ण्‍',

'/' : 'ध्‍',

'~' : 'द्य',

'!' : '।',

'@' : '/',

'#' : ':',

'$' : 'रऱ्‍',

'%' : '-',

'^' : '"',

'&' : "'",

'*' : 'द्ध',

'(' : 'त्र',

')' : 'ऋ',

'_' : '.',

'+' : '्',

'{' : 'क्ष्‍',

'}' : 'द्व',

'|' :'|',

':' : 'रू',

'"' : 'ष्‍',

'<' : 'ढ',

'>' : 'झ',

'?' : 'घ्‍'
}

function replaceWithMarathi(event) {
  const typedKey = event.key;
  const marathiEquivalent = marathiKeyboardMapping[typedKey];
  
  if (marathiEquivalent) {
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    const textBefore = event.target.value.substring(0, selectionStart);
    const textAfter = event.target.value.substring(selectionEnd);
    event.target.value = textBefore + marathiEquivalent + textAfter;
    event.preventDefault(); // Prevent the default behavior of the key
    event.target.setSelectionRange(selectionStart + 1, selectionStart + 1); // Move cursor to the next position
  }
}


function startTimerforButton() {
  if (!startTime) {
      startTime = new Date();
      clearInterval(timerInterval); // Clear any existing interval
      timerInterval = setInterval(updateTimer, 1000); // Start updating timer every second
  }
}

// Get elements
const openPopupButton = document.getElementById('submitBtn');
const popupWrapper = document.getElementById('confirmationPopup');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const popupTimeEnded = document.getElementById('TimeEndedPopup');

// Function to open popup
function openTimeEndedPopup(){
  popupTimeEnded.style.display = "block";
}
function openPopup() {
  popupWrapper.style.display = 'block';
}

// Function to close popup
function closePopup() {
  popupWrapper.style.display = 'none';
}

// Event listeners
cancelButton.addEventListener('click', closePopup);
confirmButton.addEventListener('click', function(){
  // closePopup();
  showCompareScreen();
  closePopup();
});
document.getElementById("OkButton").addEventListener('click', function(){
  // closePopup();
 showCompareScreen();
  document.getElementById("TimeEndedPopup").style.display = 'none';
});
document.getElementById("CancelTimeButton").addEventListener('click', function(){
  // closePopup();
  document.getElementById("TimeEndedPopup").style.display = 'none';
  enableInput();
});


function showCompareScreen(){
  document.getElementById("comparescreen").style.display = "flex";
}
function validateSignupForm() {
  var signupUsername = document.getElementById("signup_username").value;
  var signupPassword = document.getElementById("signup_password").value;
  var confirmPassword = document.getElementById("confirm_password").value;
  var email = document.getElementById("email").value;
  var fullname = document.getElementById("fullname").value;
  var dob = document.getElementById("dob").value;
  var signupError = document.getElementById("signupError");

  // Simple validation
  if (signupUsername === "" || signupPassword === "" || confirmPassword === "" || email === "" || fullname === "" || dob === "") {
      signupError.innerText = "All fields are required.";
      return false;
  }

  // Password confirmation
  if (signupPassword !== confirmPassword) {
      signupError.innerText = "Passwords do not match.";
      return false;
  }

  // You can add more complex validation here if needed
  handleSignup();
   showLogin();

  return true;
}




function hideSignUp(){
  document.getElementById("signupForUser").style.display='none';
  document.getElementById("displayStudentName").textContent=formDataJson[signup_username];
  
}
function hideCompareScreen(){
document.getElementById("comparescreen").style.display='none';
}

function handleSignup() {
  var form = document.getElementById('signupForm');
  var formData = {};

  for (var i = 0; i < form.elements.length; i++) {
      var element = form.elements[i];
      if (element.name && element.type !== 'button') {
          formData[element.name] = element.value;
      }
  }

  // Convert form data object to a JSON string
  var formDataString = JSON.stringify(formData);

  // Store the form data in local storage
  localStorage.setItem('userData', formDataString);

  // Optionally, you can perform additional actions after signup, such as redirecting to a dashboard
}

// Function to handle login form submission
function handleLogin() {
  var form = document.getElementById('loginForm');
    var email = form.email.value;
    var password = form.password.value;

    // Your login verification logic here
    // For demonstration purposes, alerting the user with the entered email and password
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

  // Retrieve stored user data from local storage
  var storedUserDataString = localStorage.getItem('userData');

  if (storedUserDataString) {
      var storedUserData = JSON.parse(storedUserDataString);

      // Check if email and password match stored user data
      if (email === storedUserData.email && password == storedUserData.password) {
          alert('Login successful!'); // You can replace this with actual login actions
          document.getElementById("loginForUser").style.display = "none";
          document.getElementById("displayStudentName").textContent = storedUserData.fullname;
          document.getElementById("maincontainer").style.display = 'block';
          var token = "random_generated_token"; // Generate a token upon successful login
          localStorage.setItem('token', token);
          
      } else {
          alert('Invalid email or password.'); // You can replace this with appropriate error handling
      }
  } else {
      alert('No user data found. Please sign up.'); // You can replace this with appropriate error handling
  }
}
function checkLoggedIn() {
  // Retrieve the token from localStorage
  var token = localStorage.getItem('token');

  // Check if the token exists
  if (token) {
      // Token exists, user is logged in, redirect to dashboard or desired page
      document.getElementById("loginForUser").style.display = "none";
      document.getElementById("maincontainer").style.display = "block";
      document.getElementById("displayStudentName").textContent = JSON.parse(localStorage.getItem('userData')).fullname;
  }
}
function showLogin(){
  document.getElementById("signupForUser").style.display ="none";
  document.getElementById("loginForUser").style.display ="block";

}
function showSignUp(){
  document.getElementById("loginForUser").style.display ="none";
  document.getElementById("signupForUser").style.display ="block";

}

function disableRightClick(event) {
  event.preventDefault();
}

// Add event listener to document for right-click event
// document.addEventListener('contextmenu', disableRightClick);

 function logOut(){
   localStorage.removeItem('token');
  location.reload();
 }


document.addEventListener("DOMContentLoaded", function() {
  var languageSelect = document.getElementById('language-select');
  var difficultySelect = document.getElementById('difficulty-select');
  var passageSelect = document.getElementById('passage-select');

  // Define passages for each language and difficulty level
  const easyEnglishPassages = [];
  const mediumEnglishPassages = [];
  const hardEnglishPassages = [];
  const easyMarathiPassages = [];
  const mediumMarathiPassages = [];
  const hardMarathiPassages = [];

for (let i = 1; i <= 150; i++) {
    easyEnglishPassages.push(`English Passage ${i}`);
    mediumEnglishPassages.push(`English Passage ${i}(Medium)`);
    hardEnglishPassages.push(`English Passage ${i}(Hard)`);
    easyMarathiPassages.push(`Marathi Passage ${i}`);
    mediumMarathiPassages.push(`Marathi Passage ${i}(Medium)`);
    hardMarathiPassages.push(`Marathi Passage ${i}(Hard)`);
}
  var passages = {
    'English': {
      'Easy': easyEnglishPassages,
      'Medium': mediumEnglishPassages,
      'Hard': hardEnglishPassages
    },
    'Marathi': {
      'Easy': easyMarathiPassages,
      'Medium': mediumMarathiPassages,
      'Hard':hardMarathiPassages
    }
  };

  // Function to populate passages based on selected language and difficulty
  function populatePassages() {
    var selectedLanguage = languageSelect.value;
    var selectedDifficulty = difficultySelect.value;

    // Clear existing options
    passageSelect.innerHTML = '';

    // Populate options for the passage select based on the selected language and difficulty
    passages[selectedLanguage][selectedDifficulty].forEach(function(passage) {
      var optionElement = document.createElement('option');
      optionElement.textContent = passage;
      optionElement.value = passage;
      passageSelect.appendChild(optionElement);
    });
  }

  // Add event listener to language select
  languageSelect.addEventListener('change', populatePassages);

  // Add event listener to difficulty select
  difficultySelect.addEventListener('change', populatePassages);

  // Initial population of passages based on default selections
  populatePassages();
});
