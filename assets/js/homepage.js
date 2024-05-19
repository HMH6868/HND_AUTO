
const showIntrolBtn = document.getElementById("showIntrolBtn");
const closeIntrolBtn = document.getElementById("closeIntrolBtn");

function handleHomepage() {
    //Hiện introl của trang web
    if (showIntrolBtn) {
        showIntrolBtn.onclick = () => {
            const videoIntrol = document.querySelector(".video-introl");
            videoIntrol.style.opacity = 1;
            videoIntrol.style.userSelect = "all";
            videoIntrol.style.pointerEvents = "all";
        };
        document.querySelector(".video-introl .bg-blur").onclick = () => {
            const videoIntrol = document.querySelector(".video-introl");
            videoIntrol.style.opacity = 0;
            videoIntrol.style.userSelect = "none";
            videoIntrol.style.pointerEvents = "none";
        };
    }

    if (closeIntrolBtn) {
        closeIntrolBtn.onclick = () => {
            const videoIntrol = document.querySelector(".video-introl");
            videoIntrol.style.opacity = 0;
            videoIntrol.style.userSelect = "none";
            videoIntrol.style.pointerEvents = "none";
        };
    }
}

handleHomepage();
