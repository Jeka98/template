document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const burger = document.querySelector('.nav__burger');
    const rangeInput = document.querySelector('.order-form__discount');
    const rangeLabel = document.querySelector('.order-form__discount-title span');
    const fileInput = document.querySelector('.order-form__file');
    const fileLabel = document.querySelector('.order-form__file-button span');
    const header = document.querySelector('.header');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');

        (burger.classList.contains('active'))
            ? menu.classList.add('active')
            : menu.classList.remove('active');
    });

    rangeInput.addEventListener('input', () => {
        const value = rangeInput.value;
        rangeLabel.textContent = `${value} %`;
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.value) {
            const arrFilePath = fileInput.value.split('\\');
            const fileName = arrFilePath[arrFilePath.length - 1];

            return fileLabel.innerText = fileName;
        }
        else {
            const fileName = "Прикрепить файл";

            return fileLabel.innerText = fileName;
        }
    });

    class Select {
        constructor(selectElement) {
            this.selectElement = selectElement;
        }

        drawList() {
            const list = document.createElement('ul');

            list.classList.add('order-form__system-choice-list');

            for (let i = 1; i < this.selectElement.children.length; i++) {
                let listItem = document.createElement('li');
                listItem.innerText = this.selectElement.children[i].innerText;
                list.appendChild(listItem);
            }

            return list;
        };
        getActiveList(buttonElement, list) {
            buttonElement.classList.toggle('active');
            list.classList.toggle('active');
        };
        deleteAllActive(el) {
            return el.classList.remove('active');
        };
        getActiveButton(el, button, items) {
            const buttonText = button.querySelector('span');

            button.classList.remove('active');
            items.classList.remove('active');
            buttonText.innerText = el.innerText;

            return button;
        };
        toggleSelectAttr(el, button) {
            return (el.innerText === button.innerText)
                ? el.setAttribute('selected', '')
                : el.removeAttribute('selected');
        };
        getActiveListElement(listItems, selectOptions, listButton) {
            listItems.addEventListener('click', (e) => {
                e.preventDefault();

                for (let c = 0; c < listItems.children.length; c++) {
                    this.deleteAllActive(listItems.children[c]);
                }

                e.target.classList.add('active');

                this.getActiveButton(e.target, listButton, listItems);

                for (let o = 0; o < selectOptions.length; o++) {
                    this.toggleSelectAttr(selectOptions[o], listButton);
                }
            });
        }
    }

    const systemChoice = document.querySelector('.order-form__system-choice-select');
    const systemField = document.querySelector('.order-form__system-choice-wrapper');
    const systemButton = document.querySelector('.order-form__system-choice');
    const systemSelect = new Select(systemChoice);

    if (systemField.appendChild(systemSelect.drawList())) {
        const systemList = document.querySelector('.order-form__system-choice-list')

        systemButton.addEventListener('click', () => systemSelect.getActiveList(systemButton, systemList));
        systemSelect.getActiveListElement(systemList, systemChoice.children, systemButton);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 250) {
            header.classList.add('fixed-header');
        } else {
            header.classList.remove('fixed-header');
        }
    });
});
