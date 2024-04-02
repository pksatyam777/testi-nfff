class BudgetRangeSlider {
    constructor(props) {
        this.props = props;
        this.container = props.container;
        this.values = props.budget;
        this.title = props.heading;
        this.selectedValue = this.values[0];
        this.createStyles();
        this.render();
    }

    createStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        .budget-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            padding-left: 20px;
            border: 1px solid #eee;
            width: 868px;
            height: 160px;
            border-radius: 16px;
            background: #fff;
        }
        .budget-widget-heading {
            color: #000000;
            font-weight: 400;
            font-size: 16px;
            margin-top: 34px;
            margin-left: 20px;
        }
        .budget-values-container {
            width: 754px;
            display: flex;
            justify-content: space-between;
            margin-top: 19px;
            margin-left: 20px;
            margin-bottom: 27px;
        }
        .budget-value-button {
            font-weight: 700;
            font-size: 14px;
            color: #000000;
            cursor: pointer;
        }
        .budget-value-button.active {
            background-color: #3674F2;
            color: white;
        }
        .budget-slider-container {
            width: 754px;
            margin-top: 25px;
            margin-left: 20px;
        }
        .budget-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 1px;
            background: #000000;
        }
        .budget-slider::-webkit-slider-thumb {
            cursor:pointer;
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: #3674F2 !important;
            border-radius: 50%;
            border: 1px solid #000000
        }
        .budget-value-text {
            font-size: 16px;
            text-align: center;
        }
        `;
        document.head.appendChild(styleElement);
    }

    render() {
        this.container.innerHTML = '';

        this.budgetContainer = document.createElement("div");
        this.budgetContainer.className = 'budget-container';
        this.container.appendChild(this.budgetContainer);

        this.heading = document.createElement("h2");
        this.heading.textContent = "What's your project budget range?";
        this.heading.className = 'budget-widget-heading';
        this.budgetContainer.appendChild(this.heading);

        this.sliderContainer = document.createElement("div");
        this.sliderContainer.className = 'budget-slider-container';
        this.budgetContainer.appendChild(this.sliderContainer);

        this.slider = document.createElement("input");
        this.slider.setAttribute("type", "range");
        this.slider.className = "budget-slider";
        this.slider.setAttribute("min", 0);
        this.slider.setAttribute("max", this.props.budget.length - 1);
        this.slider.setAttribute("step", 1);
        this.slider.value = this.values.indexOf(this.selectedValue);

        this.sliderContainer.appendChild(this.slider);

        this.valuesContainer = document.createElement("div");
        this.valuesContainer.className = "budget-values-container";

        this.values.forEach((value, index) => {
            const button = document.createElement("div");
            button.className = "budget-value-button";
            button.textContent = `$${value}`;
            button.addEventListener("click", () => {
                this.selectedValue = value;
                this.updateSelectedButtonStyle(index);
            });
            this.valuesContainer.appendChild(button);
        });

        this.budgetContainer.appendChild(this.valuesContainer);

        this.slider.addEventListener("input", () => {
            this.selectedValue = this.values[this.slider.value];
            this.updateSelectedButtonStyle(this.slider.value);
        });

        this.updateSelectedButtonStyle(this.slider.value);
    }

    updateSelectedButtonStyle(selectedIndex) {
        this.valuesContainer.querySelectorAll(".budget-value-button").forEach((button, index) => {
            if (index === selectedIndex) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }
}
