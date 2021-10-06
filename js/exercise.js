function setProgress(exercise) {
    let exerciseProgressNumberElement = document.getElementById("exerciseProgressNumber")
    exerciseProgressNumberElement.innerHTML = "Aufgabe " + exercise.exerciseNumber + "/" + exercise.maxExerciseNumber

    let exerciseProgressBarElement = document.getElementById("progress")
    exerciseProgressBarElement.style.width = (exercise.exerciseNumber / exercise.maxExerciseNumber * 100).toString() + "%"

    let exerciseRestBarElement = document.getElementById("rest")
    exerciseRestBarElement.style.width = ((1 - (exercise.exerciseNumber / exercise.maxExerciseNumber)) * 100).toString() + "%"

    let forwardExerciseNavigation = document.getElementById("forwardExerciseNavigation")
    let backExerciseNavigation = document.getElementById("backExerciseNavigation")
    let finishExerciseNavigation = document.getElementById("finishExerciseNavigation")

    if (exercise.exerciseNumber === 0) {
        backExerciseNavigation.style.display = "none"
        exerciseRestBarElement.style.borderRadius = "0.5rem"
    } else {
        backExerciseNavigation.style.display = "inherit"
        exerciseRestBarElement.style.borderRadius = "0 0.5rem 0.5rem 0"
    }

    if (exercise.exerciseNumber === exercise.maxExerciseNumber) {
        forwardExerciseNavigation.style.display = "none"
        finishExerciseNavigation.style.display = "inherit"
        exerciseProgressBarElement.style.borderRadius = "0.5rem"
    } else {
        forwardExerciseNavigation.style.display = "inherit"
        finishExerciseNavigation.style.display = "none"
        exerciseProgressBarElement.style.borderRadius = "0.5rem 0 0 0.5rem"
    }
}

function backExerciseNavigation() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))

    if (exercise.exerciseNumber > 0) {
        exercise.exerciseNumber -= 1

        setProgress(exercise)
    }

    window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
}

function forwardExerciseNavigation() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))

    if (exercise.exerciseNumber < exercise.maxExerciseNumber) {
        exercise.exerciseNumber += 1

        setProgress(exercise)
    }

    window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
}

function finishExerciseNavigation() {

}

function createExerciseObject(exerciseData) {
    let exerciseObject = JSON.parse(exerciseData)

    exerciseObject = Object.assign(
        {
            exerciseNumber: 0,
            maxExerciseNumber: 10,
            difficulty: "",
            type: ""
        },
        exerciseObject
    )
    return exerciseObject
}