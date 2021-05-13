{
    activeProduct = "";

    const toggleBookmarkSymbol = (bookmarkButtonElement) => {
        const bookmarkImgCircleElement = document.querySelector(".js-bookmarkImgCircle");
        const bookmarkImgPathElement = document.querySelector(".js-bookmarkImgPath");

        if (!bookmarkButtonElement.classList.contains("section__bookmarkedButton")) {
            bookmarkButtonElement.classList.add("section__bookmarkedButton");
            bookmarkImgCircleElement.setAttribute("fill", "hsl(176, 72%, 28%)");
            bookmarkImgPathElement.setAttribute("fill", "white");
        } else {
            bookmarkButtonElement.classList.remove("section__bookmarkedButton");
            bookmarkImgCircleElement.setAttribute("fill", "hsl(0, 0%, 48%)");
            bookmarkImgPathElement.setAttribute("fill", "#eee");
        }
    }

    const toggleBookmarkText = (bookmarkButtonTextElement) => {
        if (bookmarkButtonTextElement.innerText === "Bookmark") {
            bookmarkButtonTextElement.innerText = "Bookmarked";
        } else {
            bookmarkButtonTextElement.innerText = "Bookmark";
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
                productElements[index - 1].classList.add("section__productContainer--disabled");
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
                <span class="form__flexElement form__span"> Enter your pledge ($)</span>
                <div class="form__flexElement form__flexContainer">
                    <input
                        class="form__input form__flexElement js-pledgeValue"
                        type="number" 
                        step="1" 
                        min=${minimumPledgeValueElements[index - 1] ? minimumPledgeValueElements[index - 1].innerText : "1"}
                        required
                    >
                    <button class="form__button form__flexElement--button js-confirmPledge">Continue</button>
                </div>
                `
            } else {
                pledgeElement.innerHTML = ``;
                pledgeElement.classList.remove("form__flexContainer--active");
                fieldsetElements[index].classList.remove("form__fieldset--active");
            }
        })
    };

    const goToPledgeConfirm = () => {
        const popupPledgeFormElement = document.querySelector(".js-popupPledgeForm");
        const popupPledgeConfirmElement = document.querySelector(".js-popupPledgeConfirm");

        popupPledgeFormElement.classList.remove("popupPledgeForm--active");
        popupPledgeConfirmElement.classList.add("popupPledgeForm--active");
    };

    const showPledgeForm = (overlayContainerElement, popupPledgeFormElement) => {
        overlayContainerElement.classList.add("overlay--active");
        popupPledgeFormElement.classList.add("popupPledgeForm--active");
    };

    const cancelPopupWindow = (overlayContainerElement, popupPledgeFormElement, popupPledgeConfirmElement) => {
        overlayContainerElement.classList.remove("overlay--active");
        popupPledgeFormElement.classList.remove("popupPledgeForm--active");
        popupPledgeConfirmElement.classList.remove("popupPledgeForm--active");
    };

    const showPledgeFormWithChosenProduct = (index, radioFormElements, overlayContainerElement, popupPledgeFormElement) => {
        activeProduct = radioFormElements[index + 1].value;
        radioFormElements[index + 1].checked = true;
        renderPledgeValueElement(index + 1);
        showPledgeForm(overlayContainerElement, popupPledgeFormElement);
    };

    const bindButtonsEvents = (radioFormElements) => {
        const bookmarkButtonTextElement = document.querySelector(".js-bookmarkButtonText");
        const bookmarkButtonElement = document.querySelector(".js-bookmarkButton");

        bookmarkButtonElement.addEventListener("click", () => {
            toggleBookmarkSymbol(bookmarkButtonElement);
            if (window.innerWidth >= 768) {
                toggleBookmarkText(bookmarkButtonTextElement);
            }
        });

        const overlayContainerElement = document.querySelector(".js-overlayContainer");
        const popupPledgeFormElement = document.querySelector(".js-popupPledgeForm");
        const popupPledgeConfirmElement = document.querySelector(".js-popupPledgeConfirm");
        const showFormButtonElement = document.querySelector(".js-showFormButton");
        const cancelPopupWindowButtonElements = document.querySelectorAll(".js-cancelPopupButton");
        const selectRewardButtonElements = document.querySelectorAll(".js-selectRewardButton");

        showFormButtonElement.addEventListener("click", () => {
            showPledgeForm(overlayContainerElement, popupPledgeFormElement);
        })

        cancelPopupWindowButtonElements.forEach((cancelPopupButtonElement) => {
            cancelPopupButtonElement.addEventListener("click", () => {
                cancelPopupWindow(overlayContainerElement, popupPledgeFormElement, popupPledgeConfirmElement);
            })
        })

        selectRewardButtonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener("click", () => {
                showPledgeFormWithChosenProduct(index, radioFormElements, overlayContainerElement, popupPledgeFormElement);
            })
        });
    };

    const toggleNavbar = () => {
        const hamburgerImgElement = document.querySelector(".js-hamburger");
        const navElement = document.querySelector(".js-nav");

        hamburgerImgElement.addEventListener("click", () => {
            navElement.classList.toggle("nav--active");
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        goToPledgeConfirm();

        updateInfo();
    };

    const onInputChange = (radioElement, index) => {
        activeProduct = radioElement.value;
        renderPledgeValueElement(index);
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        const radioFormElements = document.querySelectorAll(".js-radio");

        toggleNavbar();

        formElement.addEventListener("submit", onFormSubmit);

        bindButtonsEvents(radioFormElements);

        radioFormElements.forEach((radioElement, index) => {
            radioElement.addEventListener("input", () => {
                onInputChange(radioElement, index);
            })
        })
    };

    init();
}