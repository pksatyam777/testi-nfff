class MCQWidget {
    constructor(props) {
        this.props = props;
        this.options = props.options || [];
        this.container = props.container;
        this.heading = props.heading
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
            }
            .mcqwidget-title {
                color: #000000;
                font-weight: 400;
                font-size: 16px;
                margin-bottom: 28px;
            }
            .mcq-container {
                background: white;
                width: 400px;
            }
            .mcq-option {
                border: 1px solid #F2F2F2;
                background: #FFFFFF;
                border-radius: 10px;
                padding-left: 44px;
                display: flex;
                align-items: center;
                margin-bottom: 11px;
                width:356px;
                height:91px;
            }
            .mcq-option-text {
                color: #000000;
                font-weight: 500;
                font-size: 18px;
            }
            .mcq-selected {
                // outline: 1px solid #222222;
                border: 1px solid #222222;
                background:#F2F3F4
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
            const optionText = document.createElement("div");
            optionText.className = "mcq-option-text";
            optionText.textContent = option.text; // Display the option text
            optionDiv.appendChild(optionText);
            if (this.options[index].selected) {
                optionDiv.classList.add('mcq-selected');
            }
            mcqContainer.appendChild(optionDiv);
        });
        this.container.appendChild(mcqContainer);
    }
    toggleRadioButton(index) {
        // Unselect all options first
        this.options.forEach((option) => {
            option.selected = false;
        });
        // Select the clicked option
        this.options[index].selected = true;
        // Update the styling for the selected option
        this.render();
    }
}
