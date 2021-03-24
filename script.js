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

    makeProductDisabled = () => {
        const radioFormElements = document.querySelectorAll(".js-radio");
        const fieldsetElements = document.querySelectorAll(".js-fieldset");

        radioFormElements.forEach((radioElement, index) => {
            if (radioElement.value === activeProduct) {
                radioElement.disabled = true;
                fieldsetElements[index].classList.add("form__fieldset--disabled");
                renderPledgeValueElement(index);
            }
        })
    }

    const updatePiecesLeftInfo = () => {
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
        pledgeValueElement.value = "";

        totalPaidInAmountElement.innerText = updatedPaidInAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        backersAmountElement.innerText = updatedBackersAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const updateInfo = () => {
        updateFundingInfo();
        updatePiecesLeftInfo();
    }

    const renderPledgeValueElement = (inputIndex) => {
        const pledgeValueContainerElements = document.querySelectorAll(".js-pledgeValueContainer");
        const fieldsetElements = document.querySelectorAll(".js-fieldset");
        const minimumPledgeValueElements = document.querySelectorAll(".js-minimumPledgeValue");

        pledgeValueContainerElements.forEach((pledgeElement, index) => {
            if (index === inputIndex && !fieldsetElements[index].classList.contains("form__fieldset--disabled")) {
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

        updateInfo();
    };

    const bindButtonsEvents = () => {
        const bookmarkButtonElement = document.querySelector(".js-bookmarkButton");
        bookmarkButtonElement.addEventListener("click", () => toggleBookmark(bookmarkButtonElement))

        const showFormElement = document.querySelector(".js-showForm");
        const overlayElement = document.querySelector(".js-overlay");
        const popupElement = document.querySelector(".js-popup");
        showFormElement.addEventListener("click", () => {
            overlayElement.classList.toggle("overlay--active");
            popupElement.classList.toggle("popup--active");
        })

        const deletePopupElements = document.querySelectorAll(".js-deletePopup");
        deletePopupElements.forEach((button) => {
            button.addEventListener("click", () => {
                overlayElement.classList.toggle("overlay--active");
                popupElement.classList.toggle("popup--active");
            })

        })
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);

        const radioFormElements = document.querySelectorAll(".js-radio");
        radioFormElements.forEach((radioElement, index) => {

            radioElement.addEventListener("input", () => {
                activeProduct = radioElement.value;
                renderPledgeValueElement(index);
            })
        })

        bindButtonsEvents();
    }

    init()
}