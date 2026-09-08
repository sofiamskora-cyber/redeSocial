document.addEventListener("DOMContentLoaded", () => {

    // Elementos
    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = document.querySelector(".likes-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    // Se o botão de curtida não existir, encerra
    if (!likeBtn) return;

    // =========================
    // CONFIGURAÇÃO DAS CURTIDAS
    // =========================

    let baseLikes = 1200;
    let isLiked = false;

    // =========================
    // FORMATA O NÚMERO
    // =========================

    function formatLikes(num) {

        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }

        return num.toString();
    }

    // =========================
    // ATUALIZA O CONTADOR
    // =========================

    function updateLikes() {

        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(baseLikes);
        }
    }

    // =========================
    // ANIMAÇÃO DO CORAÇÃO
    // =========================

    function animateHeart() {

        const svg = likeBtn.querySelector("svg");

        if (!svg) return;

        svg.style.transform = "scale(1.4)";

        setTimeout(() => {
            svg.style.transform = "scale(1)";
        }, 150);
    }

    // =========================
    // ADICIONAR CURTIDA
    // =========================

    function addLike() {

        // Evita curtidas duplicadas
        if (isLiked) return;

        baseLikes++;
        isLiked = true;

        likeBtn.classList.add("liked");

        updateLikes();
        animateHeart();
    }

    // =========================
    // REMOVER CURTIDA
    // =========================

    function removeLike() {

        // Se não estiver curtido, não faz nada
        if (!isLiked) return;

        baseLikes--;
        isLiked = false;

        likeBtn.classList.remove("liked");

        updateLikes();
        animateHeart();
    }

    // =========================
    // CLIQUE NO CORAÇÃO
    // =========================

    likeBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        if (isLiked) {
            removeLike();
        } else {
            addLike();
        }
    });

    // =========================
    // CLIQUE NA FOTO
    // =========================

    if (postMedia) {

        postMedia.addEventListener("click", (event) => {

            event.stopPropagation();

            // Clicar na foto dá curtida
            // somente se ainda não estiver curtido
            if (!isLiked) {
                addLike();
            }
        });
    }

    // =========================
    // BOTÃO DE SALVAR
    // =========================

    if (bookmarkBtn) {

        let isBookmarked = false;

        bookmarkBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            isBookmarked = !isBookmarked;

            bookmarkBtn.classList.toggle(
                "bookmarked",
                isBookmarked
            );

            const svg = bookmarkBtn.querySelector("svg");

            if (svg) {

                svg.style.transform = "scale(1.2)";

                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }

    // =========================
    // INICIALIZAÇÃO
    // =========================

    updateLikes();

});
