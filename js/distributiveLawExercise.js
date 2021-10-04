function startExercise(difficulty) {
    let lawNavigation = document.getElementById("distributiveLawNavigation")
    lawNavigation.style.display = "none"

    let lawExercise = document.getElementById("distributiveLawExercise")
    lawExercise.style.display = "inherit"
}

function backToNavigation() {
    let lawNavigation = document.getElementById("distributiveLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("distributiveLawExercise")
    lawExercise.style.display = "none"
}