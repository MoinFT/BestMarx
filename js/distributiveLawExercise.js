function startExercise(difficulty) {
    let lawNavigation = document.getElementById("distributiveLawNavigation")
    lawNavigation.style.display = "none"

    let lawExercise = document.getElementById("distributiveLawExercise")
    lawExercise.style.display = "inherit"

    let exercise = createExerciseObject("{}")
    exercise.difficulty = difficulty;
    exercise.type = "distributiveLaw"

    window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    setProgress(exercise)
}

function backToNavigation() {
    let lawNavigation = document.getElementById("distributiveLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("distributiveLawExercise")
    lawExercise.style.display = "none"
}