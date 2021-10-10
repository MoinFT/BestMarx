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

    createDistributivLawExercise()
}

function backToNavigation() {
    let lawNavigation = document.getElementById("distributiveLawNavigation")
    lawNavigation.style.display = "inherit"

    let lawExercise = document.getElementById("distributiveLawExercise")
    lawExercise.style.display = "none"
}

function createDistributivLawExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

    let div = document.getElementById("exercise")

    let firstNumber
    let secondNumber
    let thirdNumber

    if (exercise.exercises[exercise.exerciseNumber - 1] === undefined) {
        firstNumber = Math.floor(Math.random() * 20 + 5)
        secondNumber = Math.floor(Math.random() * 20 + 5)

        while (secondNumber === firstNumber) {
            secondNumber = Math.floor(Math.random() * 20 + 5)
        }

        thirdNumber = Math.floor(Math.random() * 20 + 5)

        while (thirdNumber === firstNumber || thirdNumber === secondNumber) {
            thirdNumber = Math.floor(Math.random() * 20 + 5)
        }

        let exerciseData = createExerciseDataObject("{}")
        exerciseData.exerciseNumber = exercise.exerciseNumber
        exerciseData.firstNumber = firstNumber
        exerciseData.secondNumber = secondNumber
        exerciseData.thirdNumber = thirdNumber

        exercise.exercises.push(exerciseData)
        window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    } else {
        firstNumber = exercise.exercises[exercise.exerciseNumber - 1].firstNumber
        secondNumber = exercise.exercises[exercise.exerciseNumber - 1].secondNumber
        thirdNumber = exercise.exercises[exercise.exerciseNumber - 1].thirdNumber
    }

    console.log(firstNumber)
    console.log(secondNumber)
    console.log(thirdNumber)

    let html = ""

    html += "<div>"
    if (exerciseDifficulty === "light") {
        html += `<p>${firstNumber} ⋅ (${secondNumber} + ${thirdNumber}) = ${firstNumber} ⋅ ${secondNumber} + </p>`
        html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
    } else if (exerciseDifficulty === "medium") {
        html += `<p>${firstNumber} ⋅ (${secondNumber} + ${thirdNumber}) = </p>`
        html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
        html += `<p>+</p>`
        html += `<input oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
    } else if (exerciseDifficulty === "hard") {
        html += `<input oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
        html += `<p>⋅ (</p>`
        html += `<input oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
        html += `<p>+</p>`
        html += `<input oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
        html += `<p>) =</p>`
        html += `<input oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input oninput="getNumber(4)" class='textField' type='text' id='fifthNumberAnswer' maxlength='2'/>`
        html += `<p>+</p>`
        html += `<input oninput="getNumber(5)" class='textField' type='text' id='sixthNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input oninput="getNumber(6)" class='textField' type='text' id='seventhNumberAnswer' maxlength='2'/>`
    }
    html += "</div>"

    div.innerHTML = html
}

function finishExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

    let html = ""
    let exerciseData = exercise.exercises

    for (let i = 0; i < exercise.maxExerciseNumber; i++) {
        let firstNumberAnswer = "0"
        let secondNumberAnswer = "0"
        let thirdNumberAnswer = "0"
        let fourthNumberAnswer = "0"
        let fifthNumberAnswer = "0"
        let sixthNumberAnswer = "0"
        let seventhNumberAnswer = "0"

        for (let iAnswer = 0; iAnswer < exerciseData[i].answerNumbers.length; iAnswer++) {
            if (exerciseData[i].answerNumbers[iAnswer].index === 0) {
                firstNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }

            if (exerciseData[i].answerNumbers[iAnswer].index === 1) {
                secondNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }

            if (exerciseData[i].answerNumbers[iAnswer].index === 2) {
                thirdNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }

            if (exerciseData[i].answerNumbers[iAnswer].index === 3) {
                fourthNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }

            if (exerciseData[i].answerNumbers[iAnswer].index === 4) {
                fifthNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }

            if (exerciseData[i].answerNumbers[iAnswer].index === 5) {
                sixthNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }

            if (exerciseData[i].answerNumbers[iAnswer].index === 6) {
                seventhNumberAnswer = exerciseData[i].answerNumbers[iAnswer].input
            }
        }

        if (exerciseDifficulty === "light") {
            if (firstNumberAnswer !== secondNumberAnswer) {
                if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].firstNumber.toString() === secondNumberAnswer)) {
                    if ((exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer)) {
                        html += `<p> ${i}: Richtig</p>`
                    } else {
                        html += `<p> ${i}: Teilweise Falsch</p>`
                    }
                } else {
                    html += `<p> ${i}: Falsch</p>`
                }
            } else {
                html += `<p> ${i}: Falsch</p>`
            }
        } else if (exerciseDifficulty === "medium") {
            if (firstNumberAnswer !== secondNumberAnswer && thirdNumberAnswer !== fourthNumberAnswer) {
                if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].firstNumber.toString() === secondNumberAnswer) && (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].firstNumber.toString() === fourthNumberAnswer)) {
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                        if (exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                            html += `<p> ${i}: Richtig</p>`
                        } else {
                            html += `<p> ${i}: Teilweise Falsch</p>`
                        }
                    } else {
                        html += `<p> ${i}: Teilweise Falsch</p>`
                    }
                } else {
                    html += `<p> ${i}: Falsch</p>`
                }
            } else {
                html += `<p> ${i}: Falsch</p>`
            }
        } else if (exerciseDifficulty === "hard") {
            if (firstNumberAnswer !== secondNumberAnswer && firstNumberAnswer !== thirdNumberAnswer && secondNumberAnswer !== thirdNumberAnswer) {
                if (exerciseData[i].firstNumber.toString() === firstNumberAnswer) {
                    if (exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer) {
                        if (exerciseData[i].thirdNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer) {
                            if (fourthNumberAnswer !== fifthNumberAnswer && sixthNumberAnswer !== seventhNumberAnswer) {
                                if ((exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].firstNumber.toString() === fifthNumberAnswer) && (exerciseData[i].firstNumber.toString() === sixthNumberAnswer || exerciseData[i].firstNumber.toString() === seventhNumberAnswer)) {
                                    if (exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fifthNumberAnswer || exerciseData[i].secondNumber.toString() === sixthNumberAnswer || exerciseData[i].secondNumber.toString() === seventhNumberAnswer) {
                                        if (exerciseData[i].thirdNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fifthNumberAnswer || exerciseData[i].thirdNumber.toString() === sixthNumberAnswer || exerciseData[i].thirdNumber.toString() === seventhNumberAnswer) {
                                            html += `<p> ${i}: Richtig</p>`
                                        } else {
                                            html += `<p> ${i}: Teilweise Falsch</p>`
                                        }
                                    } else {
                                        html += `<p> ${i}: Teilweise Falsch</p>`
                                    }
                                } else {
                                    html += `<p> ${i}: Teilweise Falsch</p>`
                                }
                            } else {
                                html += `<p> ${i}: Teilweise Falsch</p>`
                            }
                        } else {
                            html += `<p> ${i}: Teilweise Falsch</p>`
                        }
                    } else {
                        html += `<p> ${i}: Teilweise Falsch</p>`
                    }
                } else {
                    html += `<p> ${i}: Falsch</p>`
                }
            } else {
                html += `<p> ${i}: Falsch</p>`
            }
        }
    }

    let div = document.getElementById("exercise")
    div.innerHTML = html
}