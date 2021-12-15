const exerciseDefinition = JSON.parse('[{"exerciseType": "none","exerciseDefinition": ["Du möchtest "," Personen einen Bananen-Apfel Salat machen, für jede Portion benötigst du "," Äpfel und "," Bananen.<br>Erstelle einen Term um die Menge der Früchte zu berechnen.<br>Stelle den Term um, um ihn leichter rechnen zu können."]},{"exerciseType": "addOne","exerciseDefinition": ["Um einen Kuchen für dich und "," Freunde von deiner Oma zu bekommen musst du die Zutaten besorgen. Für eine Portion benötigst du ","Gramm Bananen und ","Gramm Haferflocken.<br>Erstelle einen Term um das Gewicht deiner Einkaufstüte zu berechnen.<br>Stelle den Term um, um ihn leichter rechnen zu können."]},{"exerciseType": "dancingPanda","exerciseDefinition": ["Der rote Panda Paul, der dich bis jetzt durch die Aufgaben begleitet hat, hat einen Tanz entwickelt, um Süßigkeiten zu bekommen. Er bekommt für jeden Hüpfer und jede Rolle "," Süßigkeiten. Sein Tanz geht: ","<br>Erstelle einen Term um die Anzahl der Süßigkeiten, die er sich verdient zu berechnen.<br>Stelle den Term um, um ihn leichter rechnen zu können."]},{"exerciseType": "none","exerciseDefinition": ["Paul der Panda hebt "," Bananen und "," Nüsse bei "," Fütterungen auf um mit seiner Freundin Paula dem Panda ein Picknick zu machen.<br>Erstelle einen Term um die Anzahl von Bananen und Nüssen zu berechnen.<br>Stelle den Term um, um ihn leichter rechnen zu können."]},{"exerciseType": "addTwo","exerciseDefinition": ["Paul und Paula wollen mit "," Freunden Geburtstag feiern, jeder lädt "," Mädchen und "," Jungen ein.<br>Erstelle einen Term um die Anzahl der Gäste zu berechnen.<br>Stelle den Term um, um ihn leichter rechnen zu können."]},{"exerciseType": "none","exerciseDefinition": ["Ihr sollt für eine Gruppenarbeit "," Gruppen bilden mit jeweils "," Mädchen und "," Jungs.<br>Erstelle einen Term um die Anzahl der Personen zu berechnen.<br>Stelle den Term um, um ihn leichter rechnen zu können."]}]')

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

    let lawExerciseCorrection = document.getElementById("distributiveLawExerciseResults")
    lawExerciseCorrection.style.display = "none"
}

function createDistributivLawExercise() {
    let exercise = createExerciseObject(window.sessionStorage.getItem("exercise"))
    let exerciseDifficulty = exercise.difficulty

    let div = document.getElementById("exercise")

    let firstNumber
    let secondNumber
    let thirdNumber

    if (exercise.exercises[exercise.exerciseNumber - 1] === undefined) {
        if (exerciseDifficulty === "light" || exerciseDifficulty === "medium") {
            firstNumber = Math.floor(Math.random() * 20 + 5)
            secondNumber = Math.floor(Math.random() * 20 + 5)
            thirdNumber = Math.floor(Math.random() * 20 + 5)

            while (secondNumber === firstNumber) {
                secondNumber = Math.floor(Math.random() * 20 + 5)
            }

            while (thirdNumber === firstNumber || thirdNumber === secondNumber) {
                thirdNumber = Math.floor(Math.random() * 20 + 5)
            }
        } else {
            firstNumber = Math.floor(Math.random() * 10 + 5)
            secondNumber = Math.floor(Math.random() * 10 + 5)
            thirdNumber = Math.floor(Math.random() * 10 + 5)

            while (secondNumber === firstNumber) {
                secondNumber = Math.floor(Math.random() * 10 + 5)
            }

            while (thirdNumber === firstNumber || thirdNumber === secondNumber) {
                thirdNumber = Math.floor(Math.random() * 10 + 5)
            }
        }

        let exerciseData = createExerciseDataObject("{}")
        exerciseData.exerciseNumber = exercise.exerciseNumber
        exerciseData.exerciseTextNumber = Math.floor(Math.random() * 6)
        exerciseData.firstNumber = firstNumber
        exerciseData.secondNumber = secondNumber
        exerciseData.thirdNumber = thirdNumber

        insertExerciseDefinition(exerciseData, exerciseDifficulty)

        exercise.exercises.push(exerciseData)
        window.sessionStorage.setItem("exercise", JSON.stringify(exercise))
    } else {
        firstNumber = exercise.exercises[exercise.exerciseNumber - 1].firstNumber
        secondNumber = exercise.exercises[exercise.exerciseNumber - 1].secondNumber
        thirdNumber = exercise.exercises[exercise.exerciseNumber - 1].thirdNumber

        insertExerciseDefinition(exercise.exercises[exercise.exerciseNumber - 1], exerciseDifficulty)

        getExerciseAnswers(exercise.exercises, exercise.exerciseNumber - 1)
    }

    let firstNumberText = ""
    let secondNumberText = ""
    let thirdNumberText = ""
    let fourthNumberText = ""
    let fifthNumberText = ""
    let sixthNumberText = ""
    let seventhNumberText = ""

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

    if (seventhNumberAnswer !== "0") {
        seventhNumberText = seventhNumberAnswer.toString()
    }

    let html = ""

    html += "<div>"
    if (exerciseDifficulty === "light") {
        html += `<p>${firstNumber} ⋅ (${secondNumber} + ${thirdNumber}) = ${firstNumber} ⋅ ${secondNumber} + </p>`
        html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
    } else if (exerciseDifficulty === "medium") {
        html += `<p>${firstNumber} ⋅ (${secondNumber} + ${thirdNumber}) = </p>`
        html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
        html += `<p>+</p>`
        html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input value="${fourthNumberText}" oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
    } else if (exerciseDifficulty === "hard") {
        html += `<input value="${firstNumberText}" oninput="getNumber(0)" class='textField' type='text' id='firstNumberAnswer' maxlength='2'/>`
        html += `<p>⋅ (</p>`
        html += `<input value="${secondNumberText}" oninput="getNumber(1)" class='textField' type='text' id='secondNumberAnswer' maxlength='2'/>`
        html += `<p>+</p>`
        html += `<input value="${thirdNumberText}" oninput="getNumber(2)" class='textField' type='text' id='thirdNumberAnswer' maxlength='2'/>`
        html += `<p>) =</p>`
        html += `<input value="${fourthNumberText}" oninput="getNumber(3)" class='textField' type='text' id='fourthNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input value="${fifthNumberText}" oninput="getNumber(4)" class='textField' type='text' id='fifthNumberAnswer' maxlength='2'/>`
        html += `<p>+</p>`
        html += `<input value="${sixthNumberText}" oninput="getNumber(5)" class='textField' type='text' id='sixthNumberAnswer' maxlength='2'/>`
        html += `<p>⋅</p>`
        html += `<input value="${seventhNumberText}" oninput="getNumber(6)" class='textField' type='text' id='seventhNumberAnswer' maxlength='2'/>`
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

        switch (exerciseDefinitionObject.exerciseType) {
            case "addOne":
                html += exerciseDefinitionObject.exerciseDefinition[0]
                html += (exerciseData.firstNumber - 1).toString()
                html += exerciseDefinitionObject.exerciseDefinition[1]
                html += exerciseData.secondNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[2]
                html += exerciseData.thirdNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[3]
                break
            case "addTwo":
                html += exerciseDefinitionObject.exerciseDefinition[0]
                html += (exerciseData.firstNumber - 2).toString()
                html += exerciseDefinitionObject.exerciseDefinition[1]
                html += exerciseData.secondNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[2]
                html += exerciseData.thirdNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[3]
                break
            case "dancingPanda":
                let jump = 0
                let role = 0

                html += exerciseDefinitionObject.exerciseDefinition[0]
                html += exerciseData.firstNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[1]

                for (let i = 0; i < exerciseData.secondNumber + exerciseData.thirdNumber; i++) {
                    if (Math.floor(Math.random() + 0.5) === 1) {
                        if (jump < exerciseData.secondNumber) {
                            html += "Hüpfer"
                            jump++
                        } else {
                            html += "Rolle"
                            role++
                        }
                    } else {
                        if (role < exerciseData.thirdNumber) {
                            html += "Rolle"
                            role++
                        } else {
                            html += "Hüpfer"
                            jump++
                        }
                    }

                    if ((i + 1) < (exerciseData.secondNumber + exerciseData.thirdNumber)) {
                        html += ", "
                    }
                }

                html += exerciseDefinitionObject.exerciseDefinition[2]
                break
            default:
                html += exerciseDefinitionObject.exerciseDefinition[0]
                html += exerciseData.firstNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[1]
                html += exerciseData.secondNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[2]
                html += exerciseData.thirdNumber.toString()
                html += exerciseDefinitionObject.exerciseDefinition[3]
        }
    }

    document.getElementById("exerciseDefinition").innerHTML = html
}

let firstNumberAnswer = "0"
let secondNumberAnswer = "0"
let thirdNumberAnswer = "0"
let fourthNumberAnswer = "0"
let fifthNumberAnswer = "0"
let sixthNumberAnswer = "0"
let seventhNumberAnswer = "0"

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

        if (exerciseDifficulty === "light") {
            if (firstNumberAnswer !== secondNumberAnswer) {
                if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].firstNumber.toString() === secondNumberAnswer)) {
                    if ((exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer)) {
                        html += `<img alt="Bild(Richtig)" src="../css/img/feedback/good.png"><p>Richtig</p>`
                    } else {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    }
                } else {
                    if ((exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer)) {
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    } else {
                        html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                        allExercisesCorrect = false
                    }
                }
            } else {
                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                allExercisesCorrect = false
            }
        } else if (exerciseDifficulty === "medium") {
            if (firstNumberAnswer !== secondNumberAnswer && thirdNumberAnswer !== fourthNumberAnswer) {
                if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].firstNumber.toString() === secondNumberAnswer) && (exerciseData[i].firstNumber.toString() === thirdNumberAnswer || exerciseData[i].firstNumber.toString() === fourthNumberAnswer)) {
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                        if (exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
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
                    if (exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].secondNumber.toString() === thirdNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer) {
                        if (exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        }
                    } else {
                        if (exerciseData[i].thirdNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === thirdNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer) {
                            html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                            allExercisesCorrect = false
                        } else {
                            html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                            allExercisesCorrect = false
                        }
                    }
                }
            } else {
                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                allExercisesCorrect = false
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
                        html += `<img alt="Bild(Teilweise Richtig)" src="../css/img/feedback/medium.png"><p>Teilweise Richtig</p>`
                        allExercisesCorrect = false
                    }
                } else {
                    html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                    allExercisesCorrect = false
                }
            } else {
                html += `<img alt="Bild(Falsch)" src="../css/img/feedback/bad.png"><p>Falsch</p>`
                allExercisesCorrect = false
            }
        }

        html += `</div>`
        html += `</div>`

        html += `<div class="exerciseCorrection">`
        if (exerciseDifficulty === "light") {
            html += `<p>${exerciseData[i].firstNumber} ⋅ (${exerciseData[i].secondNumber} + ${exerciseData[i].thirdNumber}) = ${exerciseData[i].firstNumber} ⋅ ${exerciseData[i].secondNumber} + </p>`
            html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
            html += `<p>⋅</p>`
            html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
        } else if (exerciseDifficulty === "medium") {
            html += `<p>${exerciseData[i].firstNumber} ⋅ (${exerciseData[i].secondNumber} + ${exerciseData[i].thirdNumber}) = </p>`
            html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
            html += `<p>⋅</p>`
            html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
            html += `<p>+</p>`
            html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
            html += `<p>⋅</p>`
            html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
        } else if (exerciseDifficulty === "hard") {
            html += `<input value="${firstNumberAnswer}" class='textField' disabled="disabled" type='text' id='firstNumberCorrection${i}'/>`
            html += `<p>⋅ (</p>`
            html += `<input value="${secondNumberAnswer}" class='textField' disabled="disabled" type='text' id='secondNumberCorrection${i}'/>`
            html += `<p>+</p>`
            html += `<input value="${thirdNumberAnswer}" class='textField' disabled="disabled" type='text' id='thirdNumberCorrection${i}'/>`
            html += `<p>) =</p>`
            html += `<input value="${fourthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fourthNumberCorrection${i}'/>`
            html += `<p>⋅</p>`
            html += `<input value="${fifthNumberAnswer}" class='textField' disabled="disabled" type='text' id='fifthNumberCorrection${i}'/>`
            html += `<p>+</p>`
            html += `<input value="${sixthNumberAnswer}" class='textField' disabled="disabled" type='text' id='sixthNumberCorrection${i}'/>`
            html += `<p>⋅</p>`
            html += `<input value="${seventhNumberAnswer}" class='textField' disabled="disabled" type='text' id='seventhNumberCorrection${i}'/>`
        }
        html += `</div>`
        html += `</div>`

        if ((i + 1) / 5 === Math.round((i + 1) / 5)) {
            html += "</div>"
        }
    }

    if (allExercisesCorrect) {
        if (Math.floor(Math.random() + 0.5) === 1) {
            document.getElementById("resultRedPanda").innerHTML = `<img src="/css/img/redPanda/managedPause.png" alt="Roter Panda (Ergebnisse)">`
        } else {
            document.getElementById("resultRedPanda").innerHTML = `<img src="/css/img/redPanda/managedPerfectly.png" alt="Roter Panda (Ergebnisse)">`
        }
    } else {
        document.getElementById("resultRedPanda").innerHTML = `<img src="/css/img/redPanda/stillLearning.png" alt="Roter Panda (Ergebnisse)">`
    }

    let div = document.getElementById("exerciseResultsOut")
    div.innerHTML = html

    for (let i = 0; i < exercise.maxExerciseNumber; i++) {
        getExerciseAnswers(exerciseData, i)

        let styleElement

        if (exerciseDifficulty === "light") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        } else if (exerciseDifficulty === "medium") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer || exerciseData[i].secondNumber.toString() === firstNumberAnswer || exerciseData[i].thirdNumber.toString() === firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if (((exerciseData[i].firstNumber.toString() === secondNumberAnswer && exerciseData[i].firstNumber.toString() !== firstNumberAnswer) || (exerciseData[i].secondNumber.toString() === secondNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer) || (exerciseData[i].thirdNumber.toString() === secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer))) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`thirdNumberCorrection${i}`)
            if (((exerciseData[i].firstNumber.toString() === thirdNumberAnswer) || (exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer))) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`fourthNumberCorrection${i}`)
            if (((exerciseData[i].firstNumber.toString() === fourthNumberAnswer && exerciseData[i].firstNumber.toString() !== thirdNumberAnswer) || (exerciseData[i].secondNumber.toString() === fourthNumberAnswer && exerciseData[i].secondNumber.toString() !== firstNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer && exerciseData[i].secondNumber.toString() !== thirdNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fourthNumberAnswer && exerciseData[i].thirdNumber.toString() !== firstNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer && exerciseData[i].thirdNumber.toString() !== thirdNumberAnswer))) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        } else if (exerciseDifficulty === "hard") {
            styleElement = document.getElementById(`firstNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === firstNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`secondNumberCorrection${i}`)
            if ((exerciseData[i].secondNumber.toString() === secondNumberAnswer || exerciseData[i].thirdNumber.toString() === secondNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`thirdNumberCorrection${i}`)
            if ((exerciseData[i].secondNumber.toString() === thirdNumberAnswer && exerciseData[i].secondNumber.toString() !== secondNumberAnswer) || (exerciseData[i].thirdNumber.toString() === thirdNumberAnswer && exerciseData[i].thirdNumber.toString() !== secondNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`fourthNumberCorrection${i}`)
            if ((exerciseData[i].firstNumber.toString() === fourthNumberAnswer || exerciseData[i].secondNumber.toString() === fourthNumberAnswer || exerciseData[i].thirdNumber.toString() === fourthNumberAnswer)) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`fifthNumberCorrection${i}`)
            if (((exerciseData[i].firstNumber.toString() === fifthNumberAnswer && exerciseData[i].firstNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].secondNumber.toString() === fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer))) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`sixthNumberCorrection${i}`)
            if (((exerciseData[i].firstNumber.toString() === sixthNumberAnswer) || (exerciseData[i].secondNumber.toString() === sixthNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === sixthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer))) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }

            styleElement = document.getElementById(`seventhNumberCorrection${i}`)
            if (((exerciseData[i].firstNumber.toString() === seventhNumberAnswer && exerciseData[i].firstNumber.toString() !== sixthNumberAnswer) || (exerciseData[i].secondNumber.toString() === seventhNumberAnswer && exerciseData[i].secondNumber.toString() !== fourthNumberAnswer && exerciseData[i].secondNumber.toString() !== fifthNumberAnswer && exerciseData[i].secondNumber.toString() !== sixthNumberAnswer) || (exerciseData[i].thirdNumber.toString() === seventhNumberAnswer && exerciseData[i].thirdNumber.toString() !== fourthNumberAnswer && exerciseData[i].thirdNumber.toString() !== fifthNumberAnswer && exerciseData[i].thirdNumber.toString() !== sixthNumberAnswer))) {
                styleElement.style.backgroundColor = "#00cc00"
            } else {
                styleElement.style.backgroundColor = "#cc0000"
            }
        }
    }

    let output = document.getElementById("distributiveLawExercise")
    output.style.display = "none"
    let output1 = document.getElementById("distributiveLawExerciseResults")
    output1.style.display = "inherit"
}

function getExerciseAnswers(exerciseData, i) {
    firstNumberAnswer = "0"
    secondNumberAnswer = "0"
    thirdNumberAnswer = "0"
    fourthNumberAnswer = "0"
    fifthNumberAnswer = "0"
    sixthNumberAnswer = "0"
    seventhNumberAnswer = "0"

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
    if (exerciseData[i].answerNumbers[6] !== undefined) {
        seventhNumberAnswer = exerciseData[i].answerNumbers[6].input
    }
}