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

    const updatePiecesState = () => {
        const blackEditionPiecesElements = document.querySelectorAll(".js-blackEditionPieces");
        const bambooStandPieceseElements = document.querySelectorAll(".js-bambooStandPieces");

        bambooStandPieceseElements.forEach((element) => {
            if (activeProduct === "bambooStand") {
                return element.innerText = +element.innerText - 1;
            } else {
                return;
            }
        })

        blackEditionPiecesElements.forEach((element) => {
            if (activeProduct === "blackEditionStand") {
                return element.innerText = +element.innerText - 1;
            } else {
                return;
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

        updatePiecesState();

        pledgeValueElement.value = "";
    }

    const onInput = (buttonIndex) => {
        const pledgeValueContainerElements = document.querySelectorAll(".js-pledgeValueContainer");
        const fieldsetElement = document.querySelectorAll(".js-fieldset");
        const minimumPledgeValueElements = document.querySelectorAll(".js-minimumPledgeValue")

        pledgeValueContainerElements.forEach((pledgeElement, index) => {
            if (index === buttonIndex) {
                pledgeElement.classList.add("form__flexContainer--active");
                fieldsetElement[index].classList.add("form__fieldset--active");
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
                fieldsetElement[index].classList.remove("form__fieldset--active");
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
                console.log(activeProduct);
                onInput(index);
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