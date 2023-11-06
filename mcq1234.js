class MCQWidget {
    constructor(props) {
        this.props = props;
        this.options = props.options || [];
        this.container = props.container;
        this.heading = props.heading;
        this.createStyles();
        this.render();
    }

    createStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            body {
                display: block;
                margin: 0;
                padding: 0;
                background: #F7F7F8;
            }
            .mcqwidget-title {
                color: #000000;
                font-weight: 700;
                font-size: 19px;
                padding-bottom: 46px;
                padding-top: 40px;
                padding-left: 38px;
            }
            .mcq-container {
                // margin: 40px;
                background: #FEFEFE;
                border-radius: 16px;
                padding-bottom: 28px;
                width: 410px;
                height:410px;
            }
            .mcq-option {
                border: 1px solid #F2F2F2;
                background: linear-gradient(to bottom, #FFFFFF 0%, #F2F2F2 100%);
                border-radius: 10px;
                margin-left: 24px;
                margin-right: 24px;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                // width: 362px;
                height: 62px;
                padding-left: 17px;
                cursor: pointer;
            }
            .mcq-option-text {
                color: #000000;
                font-weight: 500;
                font-size: 15px;
            }
            .mcq-selected {
                border: 1px solid #222222;
                background: #F2F3F4;
            }
            .mcq-checkbox {
                width: 20px;
                height: 20px;
                border: 1px solid #000;
                border-radius: 4px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }
            .mcq-checkbox.checked {
                background: #eee;
                color: black;
            }
        `;
        document.head.appendChild(styleElement);
    }

    render() {
        this.container.innerHTML = '';
        const mcqContainer = document.createElement("div");
        mcqContainer.className = "mcq-container";
        const title = document.createElement("h2");
        title.textContent = this.heading;
        title.className = 'mcqwidget-title';
        mcqContainer.appendChild(title);
        this.options.forEach((option, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "mcq-option";
            optionDiv.addEventListener("click", () => {
                this.toggleRadioButton(index);
            });
            if (option.selected) {
                optionDiv.classList.add('mcq-selected');
            }
            const checkbox = document.createElement("div");
            checkbox.className = "mcq-checkbox";
            if (option.selected) {
                checkbox.classList.add('checked');
                checkbox.innerHTML = "&#10003;"; // Checkmark symbol
            }
            optionDiv.appendChild(checkbox);

            const optionText = document.createElement("div");
            optionText.className = "mcq-option-text";
            optionText.textContent = option.text; // Display the option text
            optionDiv.appendChild(optionText);

            mcqContainer.appendChild(optionDiv);
        });
        this.container.appendChild(mcqContainer);
    }

    toggleRadioButton(index) {
        const checkbox = this.container.querySelectorAll('.mcq-option .mcq-checkbox')[index];
        this.options[index].selected = !this.options[index].selected;
        checkbox.classList.toggle('checked', this.options[index].selected);
        this.render();
    }
}
