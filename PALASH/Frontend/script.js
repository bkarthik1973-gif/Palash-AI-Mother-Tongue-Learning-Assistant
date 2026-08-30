/* =====================================================
   PALASH+ FRONTEND
===================================================== */


/* =====================================================
   GLOBAL
===================================================== */

let currentRole = "teacher";

let currentCard = 1;


/* =====================================================
   ROLE SELECTION
===================================================== */

function selectRole(role) {

    currentRole = role;

    localStorage.setItem(
        "palashRole",
        role
    );


    const roleScreen =
        document.getElementById("roleSelection");

    const app =
        document.getElementById("app");


    roleScreen.style.display = "none";

    app.classList.remove("hidden");


    updateRoleUI(role);


    showToast(
        "Welcome, " +
        role.charAt(0).toUpperCase() +
        role.slice(1) +
        "!"
    );

}


/* =====================================================
   UPDATE ROLE
===================================================== */

function updateRoleUI(role) {

    const avatar =
        document.getElementById("avatar");


    if (role === "teacher") {

        avatar.textContent = "T";

    }

    else if (role === "student") {

        avatar.textContent = "S";

    }

    else if (role === "admin") {

        avatar.textContent = "A";

    }

}


/* =====================================================
   NAVIGATION
===================================================== */

function showSection(sectionId, element) {

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const target =
        document.getElementById(sectionId);


    if (target) {

        target.classList.add(
            "active-section"
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (element) {

        element.classList.add("active");

    }


    updatePageTitle(sectionId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showSectionById(sectionId) {

    const target =
        document.getElementById(sectionId);


    if (!target) return;


    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    target.classList.add(
        "active-section"
    );


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(item => {

        if (
            item.getAttribute("onclick") &&
            item.getAttribute("onclick")
                .includes(sectionId)
        ) {

            item.classList.add("active");

        }

    });


    updatePageTitle(sectionId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   PAGE TITLES
===================================================== */

function updatePageTitle(sectionId) {

    const titles = {

        dashboard:
            "Dashboard",

        translation:
            "Hindi → Santhali",

        voice:
            "Voice Classroom",

        lessons:
            "Offline Lessons",

        worksheets:
            "AI Worksheets",

        flashcards:
            "Visual Flashcards",

        progress:
            "Learning Progress",

        validation:
            "Community Validation",

        ecosystem:
            "DIKSHA & J-Guruji"

    };


    document.getElementById(
        "pageTitle"
    ).textContent =
        titles[sectionId] || "Dashboard";

}


/* =====================================================
   TRANSLATION DEMO
===================================================== */

function translateDemo() {

    const input =
        document.getElementById(
            "hindiInput"
        ).value.trim();


    const output =
        document.getElementById(
            "santhaliOutput"
        );


    if (!input) {

        showToast(
            "Please enter Hindi content"
        );

        return;

    }


    output.innerHTML = `
        <div style="color:#7357e8;font-size:10px;margin-bottom:8px;">
            AI GENERATED OUTPUT
        </div>

        <div>
            ᱪᱮᱫ ᱠᱚ ᱯᱩᱛᱷᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱱᱟ။
        </div>

        <div style="margin-top:15px;color:#27a56b;font-size:8px;">
            ✓ Ready for community validation
        </div>
    `;


    showToast(
        "Translation generated"
    );

}


function clearTranslation() {

    document.getElementById(
        "hindiInput"
    ).value = "";


    document.getElementById(
        "santhaliOutput"
    ).innerHTML =
        "Translation will appear here.";

}


/* =====================================================
   TEXT TO SPEECH DEMO
===================================================== */

function speakSanthali() {

    const text =
        "Johar";


    if (
        "speechSynthesis" in window
    ) {

        const speech =
            new SpeechSynthesisUtterance(
                text
            );

        speech.lang = "en-IN";

        window.speechSynthesis.speak(
            speech
        );

        showToast(
            "Playing Santhali audio demo"
        );

    }

    else {

        showToast(
            "Text-to-speech unavailable"
        );

    }

}


/* =====================================================
   VOICE DEMO
===================================================== */

function startVoice() {

    const status =
        document.getElementById(
            "voiceStatus"
        );


    status.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        Listening...
    `;


    setTimeout(() => {

        status.innerHTML = `
            <strong>
                Speech detected
            </strong>
            <br>
            Hindi → Translation → Santhali Audio
        `;


        showToast(
            "Voice interaction completed"
        );

    }, 2000);

}


/* =====================================================
   WORKSHEET
===================================================== */

function generateWorksheet() {

    const topic =
        document.getElementById(
            "worksheetTopic"
        ).value.trim();


    const result =
        document.getElementById(
            "worksheetResult"
        );


    if (!topic) {

        showToast(
            "Enter a lesson topic first"
        );

        return;

    }


    result.innerHTML = `

        <strong>
            AI Generated Worksheet
        </strong>

        <br><br>

        <b>Topic:</b>
        ${topic}

        <br><br>

        <b>1.</b>
        Match the following pictures
        with their names.

        <br><br>

        <b>2.</b>
        Complete the missing numbers.

        <br><br>

        <b>3.</b>
        Identify the correct word
        in Hindi and Santhali.

        <br><br>

        <span style="color:#27a56b;">
            ✓ Bilingual activity generated
        </span>

    `;


    showToast(
        "Worksheet generated"
    );

}


/* =====================================================
   FLASHCARDS
===================================================== */

function flipCard() {

    const front =
        document.getElementById(
            "flashcardFront"
        );

    const back =
        document.getElementById(
            "flashcardBack"
        );


    if (
        front.style.display === "none"
    ) {

        front.style.display = "block";

        back.style.display = "none";

    }

    else {

        front.style.display = "none";

        back.style.display = "block";

    }

}


function nextCard() {

    currentCard++;


    if (currentCard > 5) {

        currentCard = 1;

    }


    document.getElementById(
        "cardNumber"
    ).textContent =
        currentCard;


    resetFlashcard();

}


function previousCard() {

    currentCard--;


    if (currentCard < 1) {

        currentCard = 5;

    }


    document.getElementById(
        "cardNumber"
    ).textContent =
        currentCard;


    resetFlashcard();

}


function resetFlashcard() {

    document.getElementById(
        "flashcardFront"
    ).style.display =
        "block";


    document.getElementById(
        "flashcardBack"
    ).style.display =
        "none";

}


/* =====================================================
   COMMUNITY VALIDATION
===================================================== */

function validateTranslation(type) {

    const status =
        document.getElementById(
            "validationStatus"
        );


    if (type === "approved") {

        status.innerHTML = `
            <span style="color:#27a56b;">
                <i class="fa-solid fa-circle-check"></i>
                Translation approved by community reviewer
            </span>
        `;

        showToast(
            "Translation approved"
        );

    }


    else {

        status.innerHTML = `
            <span style="color:#ef9145;">
                <i class="fa-solid fa-pen"></i>
                Correction submitted for review
            </span>
        `;

        showToast(
            "Correction submitted"
        );

    }

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastText =
        document.getElementById(
            "toastText"
        );


    toastText.textContent =
        message;


    toast.style.display =
        "flex";


    setTimeout(() => {

        toast.style.display =
            "none";

    }, 2500);

}


/* =====================================================
   LOAD SAVED ROLE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedRole =
            localStorage.getItem(
                "palashRole"
            );


        if (savedRole) {

            currentRole =
                savedRole;

            document
                .getElementById(
                    "roleSelection"
                )
                .style.display =
                "none";


            document
                .getElementById(
                    "app"
                )
                .classList.remove(
                    "hidden"
                );


            updateRoleUI(
                savedRole
            );

        }

    }
);