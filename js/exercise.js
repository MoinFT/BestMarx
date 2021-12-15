function setProgress(exercise) {
    let exerciseProgressNumberElement = document.getElementById("exerciseProgressNumber")
    exerciseProgressNumberElement.innerHTML = "Aufgabe " + exercise.exerciseNumber + "/" + exercise.maxExerciseNumber

    let exerciseProgressBarElement = document.getElementById("progress")
    exerciseProgressBarElement.style.width = (exercise.exerciseNumber / exercise.maxExerciseNumber * 100).toString() + "%"

    let exerciseRestBarElement = document.getElementById("rest")
    exerciseRestBarElement.style.width = ((1 - (exercise.exerciseNumber / exercise.maxExerciseNumber)) * 100).toString() + "%"

    let backwardExerciseNavigation = document.getElementById("backwardExerciseNavigation")
    let forwardExerciseNavigation = document.getElementById("forwardExerciseNavigation")
    let finishExerciseNavigation = document.getElementById("finishExerciseNavigation")

    if (exercise.exerciseNumber === 1) {
        backwardExerciseNavigation.style.display = "none"
    } else {
        backwardExerciseNavigation.style.display = "inherit"
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

    if (exercise.exerciseNumber > 1) {
        exercise.exerciseNumber -= 1

        window.sessionStorage.setItem("exercise", JSON.stringify(exercise))

        setProgress(exercise)

        switch (exercise.type) {
            case "distributiveLaw":
                createDistributivLawExercise()
                break
            case "commutativeLaw":
                createCommutativeLawExercise()
                break
            case "associativeLaw":
                createAssociativeLawExercise()
                break
        }
    }
}

function forwardExerciseNavigation() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))

    if (exercise.exerciseNumber < exercise.maxExerciseNumber) {
        exercise.exerciseNumber += 1

        window.sessionStorage.setItem("exercise", JSON.stringify(exercise))

        setProgress(exercise)

        switch (exercise.type) {
            case "distributiveLaw":
                createDistributivLawExercise()
                break
            case "commutativeLaw":
                createCommutativeLawExercise()
                break
            case "associativeLaw":
                createAssociativeLawExercise()
                break
        }
    }
}

function getNumber(temp) {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseData = exercise.exercises[exercise.exerciseNumber - 1]

    let inputElementID = ""
    switch (temp) {
        case 0:
            inputElementID = "firstNumberAnswer"
            break
        case 1:
            inputElementID = "secondNumberAnswer"
            break
        case 2:
            inputElementID = "thirdNumberAnswer"
            break
        case 3:
            inputElementID = "fourthNumberAnswer"
            break
        case 4:
            inputElementID = "fifthNumberAnswer"
            break
        case 5:
            inputElementID = "sixthNumberAnswer"
            break
        case 6:
            inputElementID = "seventhNumberAnswer"
            break
    }

    let indexExist = false

    for(let i = 0; i < exerciseData.answerNumbers.length; i++) {
        if (exerciseData.answerNumbers[i].index === temp) {
            exerciseData.answerNumbers[i].input = document.getElementById(inputElementID).value
            indexExist = true
        }
    }

    if (!indexExist) {
        let inputField = createAnswerFieldObject("{}")
        inputField.index = temp;
        inputField.input = document.getElementById(inputElementID).value
        exerciseData.answerNumbers.push(inputField)
    }
    exercise.exercises[exercise.exerciseNumber - 1] = exerciseData

    window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
}

function createExerciseObject(exerciseData) {
    let exerciseObject = JSON.parse(exerciseData)

    exerciseObject = Object.assign(
        {
            exerciseNumber: 1,
            maxExerciseNumber: 10,
            difficulty: "",
            type: "",
            exercises: []
        },
        exerciseObject
    )
    return exerciseObject
}

function createExerciseDataObject(exerciseData) {
    let exerciseObject = JSON.parse(exerciseData)

    exerciseObject = Object.assign(
        {
            exerciseNumber: 0,
            exerciseTextNumber: 0,
            firstNumber: 0,
            secondNumber: 0,
            thirdNumber: 0,
            answerNumbers: [],
        },
        exerciseObject
    )
    return exerciseObject
}

function createAnswerFieldObject(fieldData) {
    let fieldObject = JSON.parse(fieldData)

    fieldObject = Object.assign(
        {
            index: 0,
            input: 0,
        },
        fieldObject
    )
    return fieldObject;
}