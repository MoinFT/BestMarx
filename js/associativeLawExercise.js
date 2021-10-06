function startExercise(difficulty) {
    let lawNavigation = document.getElementById("associativeLawNavigation")
    lawNavigation.style.display = "none"

    let lawExercise = document.getElementById("associativeLawExercise")
    lawExercise.style.display = "inherit"

    let exercise = createExerciseObject("{}")
    exercise.difficulty = difficulty;
    exercise.type = "associativeLaw"

    window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    setProgress(exercise)
}

function backToNavigation() {
    let lawNavigation = document.getElementById("associativeLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("associativeLawExercise")
    lawExercise.style.display = "none"
}