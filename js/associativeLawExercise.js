const exerciseDefinition = JSON.parse('[{}]')

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

    createAssociativeLawExercise()
}

function backToNavigation() {
    let lawNavigation = document.getElementById("associativeLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("associativeLawExercise")
    lawExercise.style.display = "none"

    let lawExerciseCorrection = document.getElementById("associativeLawExerciseResults")
    lawExerciseCorrection.style.display = "none"
}

let firstNumberAnswer = "0"
let secondNumberAnswer = "0"
let thirdNumberAnswer = "0"
let fourthNumberAnswer = "0"
let fifthNumberAnswer = "0"
let sixthNumberAnswer = "0"

function createAssociativeLawExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

    let div = document.getElementById("exercise")

    let additionTask
    let bracketIndex

    let firstNumber
    let secondNumber
    let thirdNumber

    if (exercise.exercises[exercise.exerciseNumber - 1] === undefined) {
        firstNumber = Math.floor(Math.random() * 20 + 5)
        secondNumber = Math.floor(Math.random() * 20 + 5)
        thirdNumber = Math.floor(Math.random() * 20 + 5)

        while (secondNumber === firstNumber) {
            secondNumber = Math.floor(Math.random() * 20 + 5)
        }

        while (thirdNumber === firstNumber || thirdNumber === secondNumber) {
            thirdNumber = Math.floor(Math.random() * 20 + 5)
        }

        additionTask = Math.floor(Math.random() + 0.5)
        bracketIndex = Math.floor(Math.random() * 3 + 1)

        let exerciseData = createExerciseDataObject("{}")
        exerciseData.exerciseNumber = exercise.exerciseNumber
        exerciseData.firstNumber = firstNumber
        exerciseData.secondNumber = secondNumber
        exerciseData.thirdNumber = thirdNumber

        exerciseData.additionTask = additionTask
        exerciseData.bracketIndex = bracketIndex

        insertExerciseDefinition(exerciseData, exerciseDifficulty)

        exercise.exercises.push(exerciseData)
        window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    } else {
        firstNumber = exercise.exercises[exercise.exerciseNumber - 1].firstNumber
        secondNumber = exercise.exercises[exercise.exerciseNumber - 1].secondNumber
        thirdNumber = exercise.exercises[exercise.exerciseNumber - 1].thirdNumber

        additionTask = exercise.exercises[exercise.exerciseNumber - 1].additionTask
        bracketIndex = exercise.exercises[exercise.exerciseNumber - 1].bracketIndex

        insertExerciseDefinition(exercise.exercises[exercise.exerciseNumber - 1], exerciseDifficulty)

        getExerciseAnswers(exercise.exercises, exercise.exerciseNumber - 1)
    }

    let firstNumberText = ""
    let secondNumberText = ""
    let thirdNumberText = ""
    let fourthNumberText = ""
    let fifthNumberText = ""
    let sixthNumberText = ""

    if (firstNumberAnswer !== "0") {
        firstNumberText = firstNumberAnswer.toString()
    }

    if (secondNumberAnswer !== "0") {
        secondNumberText = secondNumberAnswer.toString()
    }

    if (thirdNumberAnswer !== "0") {
        thirdNumberText = thirdNumberAnswer.toString()
    }

    if (fourthNumberAnswer !== "0") {
        fourthNumberText = fourthNumberAnswer.toString()
    }

    if (fifthNumberAnswer !== "0") {
        fifthNumberText = fifthNumberAnswer.toString()
    }

    if (sixthNumberAnswer !== "0") {
        sixthNumberText = sixthNumberAnswer.toString()
    }

    let html = ""

    html += "<div>"
    if (exerciseDifficulty === "light") {
        if (additionTask === 1) {
            switch (bracketIndex) {
                case 1:
                    html += `<p>(${firstNumber} + ${secondNumber}) + ${thirdNumber} = ${firstNumber} + </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    break
                case 2:
                    html += `<p>(${firstNumber} + ${secondNumber}) + ${thirdNumber} = (${firstNumber} + </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p>) + </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    break
                case 3:
                    html += `<p>(${firstNumber} + ${secondNumber}) + ${thirdNumber} = ${firstNumber} + (</p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p>)</p>`
                    break
            }
        } else {
            switch (bracketIndex) {
                case 1:
                    html += `<p>(${firstNumber} ⋅ ${secondNumber}) ⋅ ${thirdNumber} = ${firstNumber} ⋅ </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    break
                case 2:
                    html += `<p>(${firstNumber} ⋅ ${secondNumber}) ⋅ ${thirdNumber} = (${firstNumber} ⋅ </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p>) ⋅ </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    break
                case 3:
                    html += `<p>(${firstNumber} ⋅ ${secondNumber}) ⋅ ${thirdNumber} = ${firstNumber} ⋅ (</p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p>)</p>`
                    break
            }
        }
    } else if (exerciseDifficulty === "medium") {
        if (additionTask === 1) {
            switch (bracketIndex) {
                case 1:
                    html += `<p>(${firstNumber} + ${secondNumber}) + ${thirdNumber} = </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                    break
                case 2:
                    html += `<p>${firstNumber} + (${secondNumber} + ${thirdNumber}) = </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                    break
                case 3:
                    html += `<p>${firstNumber} + ${secondNumber} + ${thirdNumber} = (</p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> + </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p>) + </p>`
                    html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                    break
            }
        } else {
            switch (bracketIndex) {
                case 1:
                    html += `<p>(${firstNumber} ⋅ ${secondNumber}) ⋅ ${thirdNumber} = </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                    break
                case 2:
                    html += `<p>${firstNumber} ⋅ (${secondNumber} ⋅ ${thirdNumber}) = </p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                    break
                case 3:
                    html += `<p>${firstNumber} ⋅ ${secondNumber} ⋅ ${thirdNumber} = (</p>`
                    html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                    html += `<p> ⋅ </p>`
                    html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                    html += `<p>) ⋅ </p>`
                    html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                    break
            }
        }
    } else if (exerciseDifficulty === "hard") {
        if (additionTask === 1) {
            if (Math.floor(Math.random() + 0.5) === 1) {
                html += `<p>(</p>`
                html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                html += `<p> + </p>`
                html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                html += `<p>) + </p>`
                html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                html += `<p> = </p>`
                html += `<input value="${fourthNumberText}" oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
                html += `<p> + </p>`
                html += `<input value="${fifthNumberText}" oninput="getNumber(4)" class='textField' type='text' id='fifthNumberAnswer' maxlength='2'/>`
                html += `<p> + </p>`
                html += `<input value="${sixthNumberText}" oninput="getNumber(5)" class='textField' type='text' id='sixthNumberAnswer' maxlength='2'/>`
            } else {
                html += `<p></p>`
                html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                html += `<p> + (</p>`
                html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                html += `<p> + </p>`
                html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                html += `<p>) = </p>`
                html += `<input value="${fourthNumberText}" oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
                html += `<p> + </p>`
                html += `<input value="${fifthNumberText}" oninput="getNumber(4)" class='textField' type='text' id='fifthNumberAnswer' maxlength='2'/>`
                html += `<p> + </p>`
                html += `<input value="${sixthNumberText}" oninput="getNumber(5)" class='textField' type='text' id='sixthNumberAnswer' maxlength='2'/>`
            }
        } else {
            if (Math.floor(Math.random() + 0.5) === 1) {
                html += `<p>(</p>`
                html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                html += `<p>) ⋅ </p>`
                html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                html += `<p> = </p>`
                html += `<input value="${fourthNumberText}" oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${fifthNumberText}" oninput="getNumber(4)" class='textField' type='text' id='fifthNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${sixthNumberText}" oninput="getNumber(5)" class='textField' type='text' id='sixthNumberAnswer' maxlength='2'/>`
            } else {
                html += `<p></p>`
                html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ (</p>`
                html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
                html += `<p>) = </p>`
                html += `<input value="${fourthNumberText}" oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${fifthNumberText}" oninput="getNumber(4)" class='textField' type='text' id='fifthNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${sixthNumberText}" oninput="getNumber(5)" class='textField' type='text' id='sixthNumberAnswer' maxlength='2'/>`
            }
        }
    }
    html += "</div>"

    div.innerHTML = html
}

function insertExerciseDefinition(exerciseData, exerciseDifficulty) {
    let html = ""

    if (exerciseDifficulty === "light") {
        html = "Vervollständige den Term."
    } else if (exerciseDifficulty === "medium") {
        html = "Stelle den Term um, um ihn leichter rechnen zu können."
    } else {
        let exerciseDefinitionObject = exerciseDefinition[exerciseData.exerciseTextNumber]

        exerciseDefinitionObject = Object.assign(
            {
                exerciseType: "none",
                exerciseDefinition: []
            }, exerciseDefinitionObject
        )
    }

    document.getElementById("exerciseDefinition").innerHTML = html
}

function finishExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

    let allExercisesCorrect = true
    let html = ""
    let exerciseData = exercise.exercises

    for (let i = 0; i < exercise.maxExerciseNumber; i++) {
        getExerciseAnswers(exerciseData, i)

        if (i / 5 === Math.round(i / 5)) {
            html += `<div class="exerciseOutputSplit">`
        }

        html += `<div class="oneExercise">`
        html += `<div class="exerciseNameFeedback">`
        html += `<p class="exerciseName">Aufgabe ${i + 1}</p>`
        html += `<div class="exerciseFeedback">`

        let additionTask = exerciseData[i].additionTask
        let bracketIndex = exerciseData[i].bracketIndex

        if (exerciseDifficulty === "light") {
            if (firstNumberAnswer !== secondNumberAnswer) {
                if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                    if ((exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                        html += `<img alt="Bild(Richtig)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                    } else {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    }
                } else {
                    if (exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                        allExercisesCorrect = false
                    }
                }
            } else {
                if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                    allExercisesCorrect = false
                } else {
                    if (exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                        allExercisesCorrect = false
                    }
                }
            }
        } else if (exerciseDifficulty === "medium") {
            if (firstNumberAnswer !== secondNumberAnswer && firstNumberAnswer !== thirdNumberAnswer && secondNumberAnswer !== thirdNumberAnswer) {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                    if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                        if ((exerciseData[i].firstNumber.toString() === thirdNumberAnswer && exerciseData[i].firstNumber.toString() !== secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                            html += `<img alt="Bild(Richtig)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                        } else {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        }
                    } else {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    }
                } else {
                    if (exerciseData[i].firstNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                            allExercisesCorrect = false
                        }
                    }
                }
            } else {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                    if (exerciseData[i].firstNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                            allExercisesCorrect = false
                        }
                    }
                } else {
                    if (exerciseData[i].firstNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                            allExercisesCorrect = false
                        }
                    }
                }
            }
        } else if (exerciseDifficulty === "hard") {
            if ((firstNumberAnswer !== secondNumberAnswer && firstNumberAnswer !== thirdNumberAnswer && secondNumberAnswer !== thirdNumberAnswer) && (fourthNumberAnswer !== fifthNumberAnswer && fourthNumberAnswer !== sixthNumberAnswer && fifthNumberAnswer !== sixthNumberAnswer)) {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                    if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                        if ((exerciseData[i].firstNumber.toString() === thirdNumberAnswer && exerciseData[i].firstNumber.toString() !== secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                                if ((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer)) {
                                    if ((exerciseData[i].firstNumber.toString() === sixthNumberAnswer && exerciseData[i].firstNumber.toString() !== fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer)) {
                                        html += `<img alt="Bild(Richtig)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                                    } else {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    }
                                } else {
                                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                    allExercisesCorrect = false
                                }
                            } else {
                                html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                allExercisesCorrect = false
                            }
                        } else {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        }
                    } else {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    }
                } else {
                    if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                        if ((exerciseData[i].firstNumber.toString() === thirdNumberAnswer && exerciseData[i].firstNumber.toString() !== secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                                if ((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer)) {
                                    if ((exerciseData[i].firstNumber.toString() === sixthNumberAnswer && exerciseData[i].firstNumber.toString() !== fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer)) {
                                        html += `<img alt="Bild(Richtig)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                                    } else {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    }
                                } else {
                                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                    allExercisesCorrect = false
                                }
                            } else {
                                html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                allExercisesCorrect = false
                            }
                        } else {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        }
                    } else {
                        if ((exerciseData[i].firstNumber.toString() === thirdNumberAnswer && exerciseData[i].firstNumber.toString() !== secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                                if ((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer)) {
                                    if ((exerciseData[i].firstNumber.toString() === sixthNumberAnswer && exerciseData[i].firstNumber.toString() !== fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer)) {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    } else {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    }
                                } else {
                                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                    allExercisesCorrect = false
                                }
                            } else {
                                html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                allExercisesCorrect = false
                            }
                        } else {
                            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                                if ((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer)) {
                                    if ((exerciseData[i].firstNumber.toString() === sixthNumberAnswer && exerciseData[i].firstNumber.toString() !== fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer)) {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    } else {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    }
                                } else {
                                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                    allExercisesCorrect = false
                                }
                            } else {
                                if ((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer)) {
                                    if ((exerciseData[i].firstNumber.toString() === sixthNumberAnswer && exerciseData[i].firstNumber.toString() !== fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer)) {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    } else {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    }
                                } else {
                                    if ((exerciseData[i].firstNumber.toString() === sixthNumberAnswer && exerciseData[i].firstNumber.toString() !== fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer)) {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    } else {
                                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                                        allExercisesCorrect = false
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                    if (exerciseData[i].firstNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                                html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                allExercisesCorrect = false
                            } else {
                                if (exerciseData[i].firstNumber.toString() === fifthNumberAnswer || exerciseData[i].secondNumber.toString() === fifthNumberAnswer || exerciseData[i].thirdNumber.toString() === fifthNumberAnswer) {
                                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                    allExercisesCorrect = false
                                } else {
                                    if (exerciseData[i].firstNumber.toString() === sixthNumberAnswer || exerciseData[i].secondNumber.toString() === sixthNumberAnswer || exerciseData[i].thirdNumber.toString() === sixthNumberAnswer) {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    } else {
                                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                                        allExercisesCorrect = false
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (exerciseData[i].firstNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                                html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                allExercisesCorrect = false
                            } else {
                                if (exerciseData[i].firstNumber.toString() === fifthNumberAnswer || exerciseData[i].secondNumber.toString() === fifthNumberAnswer || exerciseData[i].thirdNumber.toString() === fifthNumberAnswer) {
                                    html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                    allExercisesCorrect = false
                                } else {
                                    if (exerciseData[i].firstNumber.toString() === sixthNumberAnswer || exerciseData[i].secondNumber.toString() === sixthNumberAnswer || exerciseData[i].thirdNumber.toString() === sixthNumberAnswer) {
                                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                                        allExercisesCorrect = false
                                    } else {
                                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                                        allExercisesCorrect = false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        html += `</div>`
        html += `</div>`

        html += `<div class="exerciseCorrection">`
        if (exerciseDifficulty === "light") {
            if (additionTask === 1) {
                switch (bracketIndex) {
                    case 1:
                        html += `<p>(${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber}) + ${exerciseData[i].thirdNumber} = ${exerciseData[i].firstNumber} + </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        break
                    case 2:
                        html += `<p>(${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber}) + ${exerciseData[i].thirdNumber} = (${exerciseData[i].firstNumber} + </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p>) + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        break
                    case 3:
                        html += `<p>(${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber}) + ${exerciseData[i].thirdNumber} = ${exerciseData[i].firstNumber} + (</p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p>)</p>`
                        break
                }
            } else {
                switch (bracketIndex) {
                    case 1:
                        html += `<p>(${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber}) ⋅ ${exerciseData[i].thirdNumber} = ${exerciseData[i].firstNumber} ⋅ </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        break
                    case 2:
                        html += `<p>(${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber}) ⋅ ${exerciseData[i].thirdNumber} = (${exerciseData[i].firstNumber} ⋅ </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p>) ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        break
                    case 3:
                        html += `<p>(${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber}) ⋅ ${exerciseData[i].thirdNumber} = ${exerciseData[i].firstNumber} ⋅ (</p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p>)</p>`
                        break
                }
            }
        } else if (exerciseDifficulty === "medium") {
            if (additionTask === 1) {
                switch (bracketIndex) {
                    case 1:
                        html += `<p>(${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber}) + ${exerciseData[i].thirdNumber} = </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        break
                    case 2:
                        html += `<p>${exerciseData[i].firstNumber} + (${exerciseData[i].secondNumber} + ${exerciseData[i].thirdNumber}) = </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        break
                    case 3:
                        html += `<p>${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber} + ${exerciseData[i].thirdNumber} = (</p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p>) + </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        break
                }
            } else {
                switch (bracketIndex) {
                    case 1:
                        html += `<p>(${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber}) ⋅ ${exerciseData[i].thirdNumber} = </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        break
                    case 2:
                        html += `<p>${exerciseData[i].firstNumber} ⋅ (${exerciseData[i].secondNumber} ⋅ ${exerciseData[i].thirdNumber}) = </p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        break
                    case 3:
                        html += `<p>${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber} ⋅ ${exerciseData[i].thirdNumber} = (</p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p>) ⋅ </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        break
                }
            }
        } else if (exerciseDifficulty === "hard") {
            if (additionTask === 1) {
                switch (bracketIndex) {
                    case 1:
                        html += `<p>(</p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p>) + </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        html += `<p> = </p>`
                        html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
                        break
                    case 2:
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + (</p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        html += `<p>) = </p>`
                        html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
                        break
                    case 3:
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        html += `<p> = (</p>`
                        html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
                        html += `<p> + </p>`
                        html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
                        html += `<p>) + </p>`
                        html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
                        break
                }
            } else {
                switch (bracketIndex) {
                    case 1:
                        html += `<p>(</p>`
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p>) ⋅ </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        html += `<p> = </p>`
                        html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
                        break
                    case 2:
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ (</p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        html += `<p>) = </p>`
                        html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
                        break
                    case 3:
                        html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                        html += `<p> = (</p>`
                        html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
                        html += `<p> ⋅ </p>`
                        html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
                        html += `<p>) ⋅ </p>`
                        html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
                        break
                }
            }
        }
        html += `</div>`
        html += `</div>`

        if ((i + 1) / 5 === Math.round((i + 1) / 5)) {
            html += "</div>"
        }
    }

    if (allExercisesCorrect) {
        if (Math.floor(Math.random() + 0.5) === 1) {
            document.getElementById("resultRedPanda").innerHTML = `<img src="../css/img/redPanda/managedPause.png" alt="Roter Panda (Ergebnisse)">`
        } else {
            document.getElementById("resultRedPanda").innerHTML = `<img src="../css/img/redPanda/managedPerfectly.png" alt="Roter Panda (Ergebnisse)">`
        }
    } else {
        document.getElementById("resultRedPanda").innerHTML = `<img src="../css/img/redPanda/stillLearning.png" alt="Roter Panda (Ergebnisse)">`
    }

    let div = document.getElementById("exerciseResultsOut")
    div.innerHTML = html

    for (let i = 0; i < exercise.maxExerciseNumber; i++) {
        getExerciseAnswers(exerciseData, i)

        let styleElement

        if (exerciseDifficulty === "light") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)

            if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        } else if (exerciseDifficulty === "medium") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`thirdNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === thirdNumberAnswer && exerciseData[i].firstNumber.toString() !== secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        } else if (exerciseDifficulty === "hard") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`thirdNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === thirdNumberAnswer && exerciseData[i].firstNumber.toString() !== secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`fourthNumberCorrection${i}`)
            if (exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`fifthNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`sixthNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === fourthNumberAnswer && exerciseData[i].firstNumber.toString() !== thirdNumberAnswer) || (exerciseData[i].secondNumber.toString() === fourthNumberAnswer && exerciseData[i].secondNumber.toString() !== thirdNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        }
    }

    let output;
    output = document.getElementById("associativeLawExercise")
    output.style.display = "none"
    output = document.getElementById("associativeLawExerciseResults")
    output.style.display = "inherit"
}

function getExerciseAnswers(exerciseData, i) {
    firstNumberAnswer = "0"
    secondNumberAnswer = "0"
    thirdNumberAnswer = "0"
    fourthNumberAnswer = "0"
    fifthNumberAnswer = "0"
    sixthNumberAnswer = "0"

    if (exerciseData[i].answerNumbers[0] !== undefined) {
        firstNumberAnswer = exerciseData[i].answerNumbers[0].input
    }
    if (exerciseData[i].answerNumbers[1] !== undefined) {
        secondNumberAnswer = exerciseData[i].answerNumbers[1].input
    }
    if (exerciseData[i].answerNumbers[2] !== undefined) {
        thirdNumberAnswer = exerciseData[i].answerNumbers[2].input
    }
    if (exerciseData[i].answerNumbers[3] !== undefined) {
        fourthNumberAnswer = exerciseData[i].answerNumbers[3].input
    }
    if (exerciseData[i].answerNumbers[4] !== undefined) {
        fifthNumberAnswer = exerciseData[i].answerNumbers[4].input
    }
    if (exerciseData[i].answerNumbers[5] !== undefined) {
        sixthNumberAnswer = exerciseData[i].answerNumbers[5].input
    }
}