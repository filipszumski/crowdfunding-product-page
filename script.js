{
    activeProduct = "";

    const toggleBookmark = (bookmarkButtonElement) => {
        const bookmarkButtonTextElement = document.querySelector(".js-bookmarkButtonText");
        const bookmarkImgCircleElement = document.querySelector(".js-bookmarkImgCircle");
        const bookmarkImgPathElement = document.querySelector(".js-bookmarkImgPath")

        if (bookmarkButtonTextElement.innerText === "Bookmark") {
            bookmarkButtonTextElement.innerText = "Bookmarked";
            bookmarkButtonElement.classList.add("section__bookmarkedButton")
            bookmarkImgCircleElement.setAttribute("fill", "hsl(176, 72%, 28%)")
            bookmarkImgPathElement.setAttribute("fill", "white")
        } else {
            bookmarkButtonTextElement.innerText = "Bookmark";
            bookmarkButtonElement.classList.remove("section__bookmarkedButton")
            bookmarkImgCircleElement.setAttribute("fill", "hsl(0, 0%, 48%)")
            bookmarkImgPathElement.setAttribute("fill", "#eee")
        }
    };

    makeProductDisabled = (element) => {
        const radioFormElements = document.querySelectorAll(".js-radio");
        const fieldsetElements = document.querySelectorAll(".js-fieldset");

        radioFormElements.forEach((radioElement, index) => {
            if (radioElement.value === activeProduct) {
                radioElement.disabled = true;
                fieldsetElements[index].classList.add("form__fieldset--disabled");
                renderInput(index);
            }
        })
    }

    const updatePiecesLeftState = () => {
        const blackEditionPiecesElements = document.querySelectorAll(".js-blackEditionPieces");
        const bambooStandPieceseElements = document.querySelectorAll(".js-bambooStandPieces");
        const mahoganyEditionPieceseElements = document.querySelectorAll(".js-mahoganyEditionPieces");


        bambooStandPieceseElements.forEach((element) => {
            if (activeProduct === "bambooStand") {
                element.innerText = +element.innerText - 1;
                if (+element.innerText < 1) {
                    makeProductDisabled();
                }
            }
        })

        blackEditionPiecesElements.forEach((element) => {
            if (activeProduct === "blackEditionStand") {
                element.innerText = +element.innerText - 1;
                if (+element.innerText < 1) {
                    makeProductDisabled();
                }
            }
        })

        mahoganyEditionPieceseElements.forEach((element) => {
            if (activeProduct === "mahoganyStand") {
                element.innerText = +element.innerText - 1;
                if (+element.innerText < 1) {
                    makeProductDisabled();
                }
            }

        })
    }

    const updateFundingInfo = () => {
        const totalPaidInAmountElement = document.querySelector(".js-totalPainInAmount");
        const backersAmountElement = document.querySelector(".js-backersAmount");
        const pledgeValueElement = document.querySelector(".js-pledgeValue");

        const updatedPaidInAmount = +totalPaidInAmountElement.innerText.replace(/,/g, "") + +pledgeValueElement.value;
        const updatedBackersAmount = +backersAmountElement.innerText.replace(/,/g, "") + 1;

        totalPaidInAmountElement.innerText = updatedPaidInAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        backersAmountElement.innerText = updatedBackersAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        updatePiecesLeftState();

        pledgeValueElement.value = "";
    }

    const renderInput = (buttonIndex) => {
        const pledgeValueContainerElements = document.querySelectorAll(".js-pledgeValueContainer");
        const fieldsetElements = document.querySelectorAll(".js-fieldset");
        const minimumPledgeValueElements = document.querySelectorAll(".js-minimumPledgeValue");

        pledgeValueContainerElements.forEach((pledgeElement, index) => {
            if (index === buttonIndex && !fieldsetElements[index].classList.contains("form__fieldset--disabled")) {
                pledgeElement.classList.add("form__flexContainer--active");
                fieldsetElements[index].classList.add("form__fieldset--active");
                pledgeElement.innerHTML = `
                <span> Enter your pledge ($)</span>
                <div>
                    <input 
                        class="form__input js-pledgeValue" 
                        type="number" 
                        step="1" 
                        min=${minimumPledgeValueElements[index - 1] ? minimumPledgeValueElements[index - 1].innerText : "0"}
                    >
                    <button class="form__button">Continue</button>
                </div>
                `
            } else {
                pledgeElement.innerHTML = ``;
                pledgeElement.classList.remove("form__flexContainer--active");
                fieldsetElements[index].classList.remove("form__fieldset--active");
            }
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        updateFundingInfo();

    };

    const bindButtonsEvents = () => {
        const bookmarkButtonElement = document.querySelector(".js-bookmarkButton");
        bookmarkButtonElement.addEventListener("click", () => toggleBookmark(bookmarkButtonElement))

        const radioFormElements = document.querySelectorAll(".js-radio");
        radioFormElements.forEach((radioElement, index) => {

            radioElement.addEventListener("input", () => {
                activeProduct = radioElement.value;
                renderInput(index);
            })
        })
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);

        bindButtonsEvents();
    }

    init()
}