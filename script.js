const prices = {
    'landing-page': {
        pm: 700,
        design: 600,
        developer: 1200,
        qa: 500
    },
    'online-store': {
        pm: 1200,
        design: 900,
        developer: 2500,
        qa: 800,
    },
    'web-application': {
        pm: 2000,
        design:1100,
        developer:3000,
        qa: 1000,
    },
    'mobile-application': {
        pm: 3000,
        design: 1500,
        developer: 4000,
        qa: 1300,
    }
}

function getFormValue () {
    const websiteTypeSelect = document.querySelector('#project-type')


    const pmElem = document.querySelector('#project-managment')
    const designElem = document.querySelector('#design')
    const devElem = document.querySelector('#development')
    const qaElem = document.querySelector('#qa')

    return {
        websiteType: websiteTypeSelect.value,
        pm: pmElem.checked,
        design: designElem.checked,
        developer: devElem.checked,
        qa: qaElem.checked
    }

}

function calculateWork () {
    const values = getFormValue()

    let totalPrice = 0

    const workTypes = prices[values.websiteType]

    if (values.pm) {
        totalPrice = workTypes.pm
    }

    if (values.design) {
        totalPrice = totalPrice + workTypes.design
    }

    if (values.developer) {
        totalPrice = totalPrice + workTypes.developer
    }

    if (values.qa) {
        totalPrice = totalPrice + workTypes.qa
    }

    const summOutput = document.querySelector('#summ')
    summOutput.textContent = totalPrice
}

const modalMailSection = document.querySelector('#modal-email')

const modalMailForm = document.querySelector('#modal-mail-form')

const modalSuccessSection = document.querySelector('#modal-success')

const formElem = document.querySelector('#calculate-form')

const closeBtns = document.querySelectorAll('.modals-close-icon-btn')


formElem.addEventListener('change', calculateWork)


formElem.addEventListener('submit', (e) => {
    e.preventDefault()
    modalMailSection.classList.add('modals-active')
})

modalMailForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const userMailInput = document.querySelector('#user-mail')
    const userMailBlock = document.querySelector('.email-input-container')

    if (userMailInput.value) {

        const formData = new FormData(formElem)

        formData.append('Email', userMailInput.value)

        fetch('/', {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams(formData).toString()
        })
            .then(function () {
                modalMailSection.classList.remove('modals-active')
                modalSuccessSection.classList.add('modals-active')
            })
            .catch(() => alert('не удалось отправить форму'))

    }
     else {
        userMailBlock.classList.add('email-input-container-error')
    }
})

closeBtns.forEach(clsBtn => clsBtn.addEventListener('click', () => {
    const userMailBlock = document.querySelector('.email-input-container')
    userMailBlock.classList.remove('email-input-container-error')
    modalMailSection.classList.remove('modals-active')
    modalSuccessSection.classList.remove('modals-active')

}))

