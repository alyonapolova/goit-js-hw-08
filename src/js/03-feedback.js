import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

let newData = {};

function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Всі поля мають бути заповнені!');
  }

  const newObj = {
    email: email.value,
    messasge: message.value,
  };
  console.log(newObj);

  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function onFormInput(e) {
  //     console.log(e.target.name);
  //   console.log(e.target.value);
  newData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(newData));
}

function populateTextarea() {
  const dataFromLocalStorage = localStorage.getItem('feedback-form-state');
  const savedData = JSON.parse(dataFromLocalStorage);

  //console.log(Object.keys(savedData));
  //console.log(Object.values(savedData));
  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
  //   if (savedData) {
  //     for (const key in savedData) {
  //       form[key].value = savedData[key];
  //     }
  //   }
}

populateTextarea();

// const refs = {
//   form: document.querySelector('.feedback-form'),
//   email: document.querySelector('.feedback-form input'),
//   textarea: document.querySelector('.feedback-form textarea'),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.email.addEventListener('input', throttle(onEmailInput, 500));
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

// let newData = {};

// function onFormSubmit(e) {
//   e.preventDefault();

//   e.currentTarget.reset();
//   localStorage.removeItem('feedback-form-state');
//   console.log(newData);
// }

// function onEmailInput(e) {
//   const emailValue = e.currentTarget.value;
//   newData.email = emailValue;
//   saveDataToLocalStorage();
// }

// function onTextareaInput(e) {
//   const messageValue = e.currentTarget.value;
//   newData.message = messageValue;
//   saveDataToLocalStorage();
// }

// function saveDataToLocalStorage() {
//   localStorage.setItem('feedback-form-state', JSON.stringify(newData));
// }

// function populateTextarea() {
//   const dataFromLocalStorage = localStorage.getItem('feedback-form-state');
//   const savedData = JSON.parse(dataFromLocalStorage);

//   if (savedData) {
//     newData = savedData;
//     refs.email.value = savedData.email;
//     refs.textarea.value = savedData.message;
//   }
// }

// populateTextarea();
