const faviconTag = document.getElementById("faviconTag") ;
const isDark = window.matchMedia("(prefers-color-scheme: dark)");

const changeFavicon = () => {
        if (isDark.matches) faviconTag.href = "./assets/img/Logo/an-pictures-light.svg";
        else faviconTag.href = "./assets/img/Logo/an-pictures-dark.svg";
};

changeFavicon() ;
setInterval(changeFavicon, 10);