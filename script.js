document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    let currentIndex = 0;
    let isAnimating = false;
    let positions = []; // Координаты карточек
    let offsetX = 0, offsetY = 0;

    // Отключаем прокрутку страницы
    document.body.style.overflow = "hidden";

    function positionCards() {
        let x = 0, y = 0;
        positions.push({ x: 0, y: 0 });

        for (let i = 1; i < cards.length; i++) {
            const prevCard = cards[i - 1];
            const currentCard = cards[i];
            const direction = prevCard.dataset.slide;

            switch (direction) {
                case "right":
                    x += window.innerWidth;
                    break;
                case "left":
                    x -= window.innerWidth;
                    break;
                case "bottom":
                    y += window.innerHeight;
                    break;
                case "top":
                    y -= window.innerHeight;
                    break;
            }

            positions.push({ x, y });
            currentCard.style.left = `${x}px`;
            currentCard.style.top = `${y}px`;
        }
    }

    function moveToNextCard(event) {
        if (isAnimating) return;

        if (event.deltaY > 0) {
            if (currentIndex >= cards.length - 1) return;
            moveCamera(currentIndex + 1);
        } else {
            if (currentIndex <= 0) return;
            moveCamera(currentIndex - 1);
        }
    }

    function moveCamera(newIndex) {
        isAnimating = true;
        const targetPosition = positions[newIndex];

        offsetX = -targetPosition.x;
        offsetY = -targetPosition.y;

        document.querySelector("main").style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        document.querySelector("main").style.transition = "transform 0.8s ease-in-out";

        setTimeout(() => {
            currentIndex = newIndex;
            isAnimating = false;
        }, 800);
    }

    positionCards();
    document.addEventListener("wheel", moveToNextCard);
});
