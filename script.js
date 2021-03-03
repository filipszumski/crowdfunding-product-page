{
    const toggleBookmark = () => {
        const bookmarkButtonTextElement = document.querySelector(".js-bookmarkButtonText");
        const bookmarkButtonElement = document.querySelector(".js-bookmarkButton");
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

    const bindButtonsEvents = () => {
        const bookmarkButtonElement = document.querySelector(".js-bookmarkButton");

        bookmarkButtonElement.addEventListener("click", toggleBookmark)
    }

    const init = () => {


        bindButtonsEvents();
    }

    init()
}