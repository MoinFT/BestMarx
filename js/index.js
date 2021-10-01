function showNavigation() {
    let navigation = document.getElementById("navigation")
    let navigationIcon = document.getElementById("navigationIcon")

    if (navigation.classList.contains("show")){
        navigation.classList.remove("show")
        navigationIcon.classList.remove("opened")
    } else {
        navigation.classList.add("show")
        navigationIcon.classList.add("opened")
    }
}