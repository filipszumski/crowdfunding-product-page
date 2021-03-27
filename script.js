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
        const productElements = document.querySelectorAll(".js-product");
        const selectRewardButtonElements = document.querySelectorAll(".js-selectRewardButton");

        radioFormElements.forEach((radioElement, index) => {
            if (radioElement.value === activeProduct) {
                radioElement.disabled = true;
                fieldsetElements[index].classList.add("form__fieldset--disabled");
                productElements[index - 1].classList.add("section--disabled");
                selectRewardButtonElements[index - 1].classList.add("section__button--disabled");
                selectRewardButtonElements[index - 1].innerText = "Out of stock";
                selectRewardButtonElements[index - 1].disabled = true;
                renderPledgeValueElement(index);
            }
        })
    };

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
    };

    const updateFundingInfo = () => {
        const totalPaidInAmountElement = document.querySelector(".js-totalPainInAmount");
        const backersAmountElement = document.querySelector(".js-backersAmount");
        const pledgeValueInputElement = document.querySelector(".js-pledgeValue");

        const updatedPaidInAmount = +totalPaidInAmountElement.innerText.replace(/,/g, "") + +pledgeValueInputElement.value;
        const updatedBackersAmount = +backersAmountElement.innerText.replace(/,/g, "") + 1;
        pledgeValueInputElement.value = "";

        totalPaidInAmountElement.innerText = updatedPaidInAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        backersAmountElement.innerText = updatedBackersAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const updateInfo = () => {
        updateFundingInfo();
        updatePiecesLeftInfo();
    };

    const renderPledgeValueElement = (elIndex) => {
        const pledgeValueContainerElements = document.querySelectorAll(".js-pledgeValueContainer");
        const fieldsetElements = document.querySelectorAll(".js-fieldset");
        const minimumPledgeValueElements = document.querySelectorAll(".js-minimumPledgeValue");

        pledgeValueContainerElements.forEach((pledgeElement, index) => {
            if (index === elIndex && !fieldsetElements[index].classList.contains("form__fieldset--disabled")) {
                pledgeElement.classList.add("form__flexContainer--active");
                fieldsetElements[index].classList.add("form__fieldset--active");
                pledgeElement.innerHTML = `
                <span> Enter your pledge ($)</span>
                <div>
                    <input
                        class="form__input js-pledgeValue"
                        type="number" 
                        step="1" 
                        min=${minimumPledgeValueElements[index - 1] ? minimumPledgeValueElements[index - 1].innerText : "1"}
                        required
                    >
                    <button class="form__button js-confirmPledge">Continue</button>
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

        // CONFIRM PLEDGE POPUP
        const popupPledgeFormElement = document.querySelector(".js-popupPledgeForm");
        const popupPledgeConfirmElement = document.querySelector(".js-popupPledgeConfirm");

        popupPledgeFormElement.classList.remove("popupPledgeForm--active");
        popupPledgeConfirmElement.classList.add("popupPledgeForm--active");

        updateInfo();
    };

    const bindButtonsEvents = (radioFormElements) => {
        const bookmarkButtonElement = document.querySelector(".js-bookmarkButton");
        bookmarkButtonElement.addEventListener("click", () => toggleBookmark(bookmarkButtonElement));

        const showForm = () => {
            overlayElement.classList.add("overlay--active");
            popupPledgeFormElement.classList.add("popupPledgeForm--active");
        }

        const selectRewardButtonElements = document.querySelectorAll(".js-selectRewardButton");
        selectRewardButtonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener("click", () => {
                activeProduct = radioFormElements[index + 1].value;
                radioFormElements[index + 1].checked = true;
                renderPledgeValueElement(index + 1);
                showForm();
            })
        });

        // POPUP
        const overlayElement = document.querySelector(".js-overlay");
        const popupPledgeFormElement = document.querySelector(".js-popupPledgeForm");
        const popupPledgeConfirmElement = document.querySelector(".js-popupPledgeConfirm");
        const showFormElement = document.querySelector(".js-showForm");
        const cancelPopupElements = document.querySelectorAll(".js-cancelPopup");

        // POPUP PLEDGE FORM
        showFormElement.addEventListener("click", showForm)

        // CANCEL POPUP
        cancelPopupElements.forEach((cancelPopupElement) => {
            cancelPopupElement.addEventListener("click", () => {
                overlayElement.classList.remove("overlay--active");
                popupPledgeFormElement.classList.remove("popupPledgeForm--active");
                popupPledgeConfirmElement.classList.remove("popupPledgeForm--active");
            })
        })
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        const radioFormElements = document.querySelectorAll(".js-radio");

        formElement.addEventListener("submit", onFormSubmit);

        bindButtonsEvents(radioFormElements);

        radioFormElements.forEach((radioElement, index) => {
            radioElement.addEventListener("input", () => {
                activeProduct = radioElement.value;
                renderPledgeValueElement(index);
            })
        })
    };

    init();
}