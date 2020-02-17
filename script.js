const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const inputs = document.querySelectorAll("input");

// Show input error message

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  let small = formControl.querySelector("small");
  small.innerText = message;
}

// Show input success outline

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Another approach

// inputs.forEach(function(input) {
//   input.addEventListener("focus", function(e) {
//     const parentElement = input.parentElement;
//     parentElement.classList.add("active");
//   });
// });

// inputs.forEach(function(input) {
//   input.addEventListener("blur", function(e) {
//     const parentElement = input.parentElement;
//     parentElement.classList.remove("active");
//   });
// });

// Check email is valid or not

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check required fields

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check password match

function checkPasswordsMatch(password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, "Password do not match");
  }
}

// Check username and pass length

function checkLength(input, min, max) {
  if (input.value.length <= min) {
    showError(
      input,
      `${getFieldName(input)} must be more than ${min} characters`
    );
  } else if (input.value.length >= max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Return capitalize id of input

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners

inputs.forEach(function(input) {
  input.addEventListener("focus", function(e) {
    inputs.forEach(function(input) {
      const parentElement = input.parentElement;
      parentElement.classList.remove("active");
    });
    const parentElement = input.parentElement;
    parentElement.classList.add("active");
  });
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  if (password2.value !== "") {
    checkPasswordsMatch(password, password2);
  }
});
