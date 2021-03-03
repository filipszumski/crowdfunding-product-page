{
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

    }

    const onInput = (buttonIndex) => {
        const pledgeValueContainerElements = document.querySelectorAll(".js-pledgeValueContainer");

        pledgeValueContainerElements.forEach((pledgeElement, index) => {
            if (index === buttonIndex) {
                pledgeElement.innerHTML = `
                <span> Enter your pledge</span>
                <div>
                  <input class="form__input" type="number" step="1" value="0">
                  <button class="form__button">Continue</button>
                </div>
                `
            } else {
                pledgeElement.innerHTML = ``;
            }
        })
    };

    const bindButtonsEvents = () => {
        bookmarkButtonElement = document.querySelector(".js-bookmarkButton");
        bookmarkButtonElement.addEventListener("click", () => toggleBookmark(bookmarkButtonElement))

        const radioFormElements = document.querySelectorAll(".js-radio");
        radioFormElements.forEach((radioElement, index) => {
            radioElement.addEventListener("input", () => {
                onInput(index);
            })
        })
    }

    const init = () => {
        const formElement = document.querySelector(".js-form");
        console.log(formElement);

        bindButtonsEvents();
    }

    init()
}