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

    createCommutativeLawExercise()
}

function backToNavigation() {
    let lawNavigation = document.getElementById("commutativeLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("commutativeLawExercise")
    lawExercise.style.display = "none"

    let lawExerciseCorrection = document.getElementById("commutativeLawExerciseResults")
    lawExerciseCorrection.style.display = "none"
}

function createCommutativeLawExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

    let div = document.getElementById("exercise")

    let additionTask
    let firstFree

    let firstNumber
    let secondNumber

    if (exercise.exercises[exercise.exerciseNumber - 1] === undefined) {
        firstNumber = Math.floor(Math.random() * 20 + 5)
        secondNumber = Math.floor(Math.random() * 20 + 5)

        while (secondNumber === firstNumber) {
            secondNumber = Math.floor(Math.random() * 20 + 5)
        }

        additionTask = Math.floor(Math.random() + 0.5)
        firstFree = Math.floor(Math.random() + 0.5)

        let exerciseData = createExerciseDataObject("{}")
        exerciseData.exerciseNumber = exercise.exerciseNumber
        exerciseData.firstNumber = firstNumber
        exerciseData.secondNumber = secondNumber

        exerciseData.additionTask = additionTask
        exerciseData.firstFree = firstFree

        exercise.exercises.push(exerciseData)
        window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    } else {
        firstNumber = exercise.exercises[exercise.exerciseNumber - 1].firstNumber
        secondNumber = exercise.exercises[exercise.exerciseNumber - 1].secondNumber

        additionTask = exercise.exercises[exercise.exerciseNumber - 1].additionTask
        firstFree = exercise.exercises[exercise.exerciseNumber - 1].firstFree
    }

    console.log(firstNumber)
    console.log(secondNumber)

    let html = ""

    html += "<div>"
    if (exerciseDifficulty === "light") {
        if (additionTask === 1) {
            if (firstFree === 1) {
                html += `<p>${firstNumber} + ${secondNumber} = </p>`
                html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                html += `<p> + ${firstNumber}</p>`
            } else {
                html += `<p>${firstNumber} + ${secondNumber} = ${secondNumber} + </p>`
                html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
            }
        } else {
            if (firstFree === 1) {
                html += `<p>${firstNumber} ⋅ ${secondNumber} = </p>`
                html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
                html += `<p> ⋅ ${firstNumber}</p>`
            } else {
                html += `<p>${firstNumber} ⋅ ${secondNumber} = ${secondNumber} ⋅ </p>`
                html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
            }
        }
    } else if (exerciseDifficulty === "medium") {
        if (additionTask === 1) {
            html += `<p>${firstNumber} + ${secondNumber} = </p>`
            html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
            html += `<p> + </p>`
            html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`

        } else {
            html += `<p>${firstNumber} ⋅ ${secondNumber} = </p>`
            html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
            html += `<p> ⋅ </p>`
            html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
        }
    } else if (exerciseDifficulty === "hard") {
        if (additionTask === 1) {
            html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
            html += `<p> + </p>`
            html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
            html += `<p> = </p>`
            html += `<input oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
            html += `<p> + </p>`
            html += `<input oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`

        } else {
            html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
            html += `<p> ⋅ </p>`
            html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
            html += `<p> = </p>`
            html += `<input oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
            html += `<p> ⋅ </p>`
            html += `<input oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
        }
    }
    html += "</div>"

    div.innerHTML = html
}

let firstNumberAnswer = "0"
let secondNumberAnswer = "0"
let thirdNumberAnswer = "0"
let fourthNumberAnswer = "0"

function finishExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

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
        let firstFree = exerciseData[i].firstFree

        if (exerciseDifficulty === "light") {
            if (firstFree === 1) {
                if (exerciseData[i].secondNumber.toString() === firstNumberAnswer) {
                    html += `<img alt="Bild(Falsch)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                } else {
                    html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                }
            } else {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer) {
                    html += `<img alt="Bild(Falsch)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                } else {
                    html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                }
            }
        } else if (exerciseDifficulty === "medium") {
            if (firstNumberAnswer !== secondNumberAnswer) {
                if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].firstNumber.toString() === secondNumberAnswer)) {
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                    } else {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                    }
                } else {
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer) {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                    } else {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                    }
                }
            } else {
                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
            }
        } else if (exerciseDifficulty === "hard") {
            if (firstNumberAnswer !== secondNumberAnswer && thirdNumberAnswer !== fourthNumberAnswer) {
                if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].firstNumber.toString() === secondNumberAnswer)) {
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer) {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].firstNumber.toString() === fourthNumberAnswer) {
                            if (exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                            } else {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            }
                        } else {
                            html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        }
                    } else {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                    }
                } else {
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer) {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].firstNumber.toString() === fourthNumberAnswer) {
                            if (exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            } else {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            }
                        } else {
                            html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        }
                    } else {
                        if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].firstNumber.toString() === fourthNumberAnswer) {
                            if (exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            } else {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            }
                        } else {
                            if (exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            } else {
                                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                            }
                        }
                    }
                }
            } else {
                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
            }
        }

        html += `</div>`
        html += `</div>`

        html += `<div class="exerciseCorrection">`
        if (exerciseDifficulty === "light") {
            if (additionTask === 1) {
                if (firstFree === 1) {
                    html += `<p>${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber} = </p>`
                    html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                    html += `<p> + ${exerciseData[i].firstNumber}</p>`
                } else {
                    html += `<p>${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber} = ${exerciseData[i].secondNumber} + </p>`
                    html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                }
            } else {
                if (firstFree === 1) {
                    html += `<p>${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber} = </p>`
                    html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                    html += `<p> ⋅ ${exerciseData[i].firstNumber}</p>`
                } else {
                    html += `<p>${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber} = ${exerciseData[i].secondNumber} ⋅ </p>`
                    html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                }
            }
        } else if (exerciseDifficulty === "medium") {
            if (additionTask === 1) {
                html += `<p>${exerciseData[i].firstNumber} + ${exerciseData[i].secondNumber} = </p>`
                html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                html += `<p> + </p>`
                html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`

            } else {
                html += `<p>${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber} = </p>`
                html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
            }
        } else if (exerciseDifficulty === "hard") {
            if (additionTask === 1) {
                html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                html += `<p> = </p>`
                html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                html += `<p> ⋅ </p>`
                html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
            } else {
                html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
                html += `<p> + </p>`
                html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
                html += `<p> = </p>`
                html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
                html += `<p> + </p>`
                html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
            }
        }
        html += `</div>`
        html += `</div>`

        if ((i + 1) / 5 === Math.round((i + 1) / 5)) {
            html += "</div>"
        }
    }

    let div = document.getElementById("exerciseResultsOut")
    div.innerHTML = html

    for (let i = 0; i < exercise.maxExerciseNumber; i++) {
        getExerciseAnswers(exerciseData, i)

        let firstFree = exerciseData[i].firstFree
        let styleElement

        if (exerciseDifficulty === "light") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)

            if (firstFree === 1) {
                if (exerciseData[i].secondNumber.toString() === firstNumberAnswer) {
                    styleElement.style.backgroundColor = "#00cc00"
                } else {
                    styleElement.style.backgroundColor = "#cc0000"
                }
            } else {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer) {
                    styleElement.style.backgroundColor = "#00cc00"
                } else {
                    styleElement.style.backgroundColor = "#cc0000"
                }
            }
        } else if (exerciseDifficulty === "medium") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        } else if (exerciseDifficulty === "hard") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if (exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`thirdNumberCorrection${i}`)
            if (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`fourthNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === fourthNumberAnswer && exerciseData[i].firstNumber.toString() !== thirdNumberAnswer) || (exerciseData[i].secondNumber.toString() === fourthNumberAnswer && exerciseData[i].secondNumber.toString() !== thirdNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        }
    }

    let output = document.getElementById("commutativeLawExercise")
    output.style.display = "none"
    let output1 = document.getElementById("commutativeLawExerciseResults")
    output1.style.display = "inherit"
}

function getExerciseAnswers(exerciseData, i) {
    firstNumberAnswer = "0"
    secondNumberAnswer = "0"
    thirdNumberAnswer = "0"
    fourthNumberAnswer = "0"

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
}