import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {DateTime} from "luxon";

const birthdate = document.getElementById("birthdate");
flatpickr(birthdate, {
    maxDate: "today",
    dateFormat: "F j, Y"
});

const calculateButton = document.getElementById("calculate-button");

const result = document.getElementById("result");
calculateButton.addEventListener("click", function() {
    const birthdateValue = birthdate.value;
    if (!birthdateValue) {
        result.textContent = "Must select a birthday";
        return;
    }
    const birthDateTime = DateTime.fromFormat(
        birthdateValue,
        "LLLL d, yyyy")
        if (!birthDateTime.isValid) {
            result.textContent = "Please enter a valid birthday";
            return;
        }    

    const today = DateTime.now().startOf("day");

    if (birthDateTime > today) {
        result.textContent = "Birthday cannot be in the future";
        return;
    }
    const age = today.diff(
        birthDateTime,
        ["years", "months", "days"]
    );

    result.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old`;
});
