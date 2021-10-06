function startExercise(difficulty) {
    let lawNavigation = document.getElementById("commutativeLawNavigation")
    lawNavigation.style.display = "none"

    let lawExercise = document.getElementById("commutativeLawExercise")
    lawExercise.style.display = "inherit"

    let exercise = createExerciseObject("{}")
    exercise.difficulty = difficulty;
    exercise.type = "commutativeLaw"

    window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    setProgress(exercise)
}

function backToNavigation() {
    let lawNavigation = document.getElementById("commutativeLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("commutativeLawExercise")
    lawExercise.style.display = "none"
}