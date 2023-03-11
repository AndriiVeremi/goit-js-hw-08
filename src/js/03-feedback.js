import throttle from 'lodash.throttle';

const LOCAL_STOR = 'feedback-form-state';
let formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onInputData, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFeedbackForm();

function onInputData(e) {
    formData = {
        email: refs.input.value.trim(),
        message: refs.textarea.value.trim(),
    };
   
    localStorage.setItem(LOCAL_STOR, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();

    const { email, message } = e.currentTarget.elements;
    console.log({ email: email.value.trim(), message: message.value.trim() });

    if (localStorage.getItem(LOCAL_STOR)) {
        localStorage.removeItem(LOCAL_STOR);
    }
    
    e.currentTarget.reset();
    formData = {};
}

function populateFeedbackForm() {
    let dataMessage = localStorage.getItem(LOCAL_STOR);
    if (!dataMessage) return;
    formData = JSON.parse(dataMessage);
    refs.input.value = formData.email ?? '';
    refs.textarea.value = formData.message ?? '';
}
