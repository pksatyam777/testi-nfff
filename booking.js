class BookingWidget {

    constructor(props) {
        this.renderConfirmations = false
        this.props = props;
        this.name = null
        this.email = null
        this.details = null
        this.selectedDateIndex = null;
        this.selectedTime = null;
        this.createStyles();
        this.fetchTimeSlots();
        this.isLoading = true;
        this.timeSlots = []
        this.container = props.container;
        // this.selectedDateIndex = null;
        this.heading = props.heading;
        this.config = props.config;

        this.bookingFormHeading = props.bookingFormHeading;
        this.meetIcon = props.meetIcon;
        this.rightArrow = props.rightArrow;
        this.closeIcon = props.closeIcon;

        this.confirmBookingHeading = props.confirmBookingHeading;
        this.greenTimefixIcon = props.greenTimefixIcon;
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
            .booking-container {
                position:relative;
                // border: 1px solid #eee;
                padding-top: 29.48px;
                padding-bottom: 32px;
                padding-left: 46px;
                padding-right: 46px;
                background:#FFFFFF;
                width: 865px;
                height: auto !important;
                border-radius: 16px;
                // margin: 40px;
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: start;
            }
            .booking-container .booking-container-days {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .booking-container h2 {
                font-weight: 500;
                font-size: 16px;
                margin-bottom:28px;
            }

            .booking-container .custom-div {
                display: flex;
                text-align: center;
                justify-content: start;
                align-items: center;
                width: 768px;
                height: 92px !important;
                // border-radius: 11px;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 8px;
                padding-right: 8px;
                // background: #EBEBF5;
                gap: 2px;
                cursor: pointer;
                border-bottom: 1px solid #8A8A8A;
                overflow-x : auto;
                overflow-y : hidden;
            }

            .booking-container .custom-div .week {
                width: 61px !important;
                height: 52px !important;
                padding-top:10px;
                padding-bottom:10px;
                padding-left:20px;
                padding-right:20px;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                line-height: 12px;
                border-radius:11px;
                gap:12px
            }
            .booking-container .custom-div .week:hover {
                background: #DADADA;
                border-radius : 11px;
            }

            .booking-container .custom-div .week1 {
                background: #7971C7;
                width: 61px !important;
                height: 52px !important;
                padding-top:10px;
                padding-bottom:10px;
                padding-left:20px;
                padding-right:20px;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                line-height: 12px;
                gap:12px;
                border-radius:11px;
                box-shadow: 0 10px 10px -2px #D4D5D6;
            }

            .booking-container .custom-div .day {
                color: #636060;
                font-size: 12px;
                font-weight: 500;
            }

            .booking-container .custom-div .date {
                color: #222222;
                font-size: 15px;
                font-weight: 600;
            }

            .booking-container .custom-div .week1 .day,
            .booking-container .custom-div .week1 .date {
                    color: #FFFFFF; 
            }

            .booking-container .time-slot-container {
                width: 768px;
                display: grid;
                text-align: center;
                height:40px !important;
                margin-top: 32px;
                gap: 8px;
                grid-template-rows : 1fr;
                grid-template-columns : repeat(30, 1fr);;
                overflow-x : auto;
            }

            .booking-container .time-slot-container .time {
                width: 94px;
                height: 30px;
                border: 1px solid #AEABCC;
                border-radius: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                font-weight: 500;
                color: #051729;
                cursor: pointer;
                background: linear-gradient(to bottom, #FFFFFF 0%, #F2F2F2 100%);
            }

            .booking-container .time-slot-container .time.selected {
                border: 1px solid #3674F2;
                // background: #eee;
            }



            // Booking form



            .booking-form-heading{
                margin-top:40px;
                margin-left:40px;
    
                color:black;
                font-weight:500;
                font-size:22px
            }
    
                .booking-form-container {
                    // margin-left:40px;
                    
                    // border: 1px solid #eee;
                    // padding: 64px;
                    background:#FFFFFF;
                    width: 840px;
                    height: auto !important;
                    border-radius: 16px;
                 margin-top:24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: start;
                }
    
                .booking-form-custom-div {
                    display: flex;
                    // justify-content: start;
                    // align-items: start;
                    width: 100% !important;
                    height: 100% !important;
                    // border-radius: 11px;
                    // padding-top: 28px;
                    // padding-bottom: 5px;
                    // padding-left: 46px;
                    // padding-right: 8px;
                    // background: #EBEBF5;
                    // gap: 2px;
                    // cursor: pointer;
                    // border-right: 1px solid #EAEAF2
                }
    
                .booking-form-meetingDetails {
                    width: 250px;
                    height:auto;
                    display:flex;
                    padding-top: 28px;
                    padding-bottom: 5px;
                    padding-left: 46px;
                    padding-right: 28px;
                    border-right: 1px solid #EAEAF2
                }
    
                .booking-form-leftContainer {
                    display: column;
                    text-align: start;
                    justify-content: start;
                    align-items: start;
                }
    
                .booking-form-week {
                    background: #7971C7;
                    width: 61px !important;
                    height: 61px !important;
                    padding-top:10px;
                    padding-bottom:10px;
                    padding-left:0px;
                    padding-right:0px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    line-height: 12px;
                    gap:12px;
                    border-radius:11px;
                    box-shadow: 0 10px 10px -2px #D4D5D6;
                }
    
                .booking-form-day {
                    color: #FFFFFF;
                    font-size: 12px;
                    font-weight: 500;
                }
    
                .booking-form-date {
                    color: #FFFFFF;
                    font-size: 15px;
                    font-weight: 600;
                }
                .booking-form-timing {
                    margin-top:24px;
                    color:#000000;
                    font-weight:400;
                    font-size:15px
                }
                .booking-form-videoconferencing{
                    display:flex;
                    gap:8px;
                    margin-top:24px
                }
                .booking-form-name{
                    color:#000000;
                    font-size:14px;
                    font-weight:400
    
                }
                .booking-form-rightContainer{
                    width:100%;
                    height:100%;
                    display:flex;
                    padding-left:52.34px;
                    padding-top:28px;
                    padding-bottom:28px;
                }
                .booking-form-userForm{
                    display:flex;
                    flex-direction:column
                }
               
                .booking-form-nameDiv{
                    display:flex;
                    flex-direction:column;
                    gap: 6px; 
                }
    
                .booking-form-emailDiv{
                    margin-top:30px;
                    display:flex;
                    flex-direction:column;
                    gap: 6px; 
                }
    
                .booking-form-detailsDiv{
                    margin-top:30px;
                    display:flex;
                    flex-direction:column;
                    gap: 6px; 
                }
                
                .booking-form-formLabel{
                    color:#344054;
                    font-weight:500;
                    font-size:14px;
                }
    
                .booking-form-nameInput{
                    border: 1px solid #D0D5DD;
                    width:335px;
                    height:44px;
                    padding: 10px 14px 10px 14px;
                    color: #000000;
                    font-size:14px;
                    font-weight:400;
                    border-radius:8px;
                    outline:none;
                }
                .booking-form-emailInput{
                    border: 1px solid #D0D5DD;
                    width:335px;
                    height:44px;
                    padding: 10px 14px 10px 14px;
                    color: #000000;
                    font-size:14px;
                    font-weight:400;
                    border-radius:8px;
                    outline:none;
                }
                
                .booking-form-detailsTextarea{
                    border: 1px solid #D0D5DD;
                    width:335px;
                    height:94px;
                    padding: 10px 14px 10px 14px;
                    color: #000000;
                    font-size:14px;
                    font-weight:400;
                    border-radius:8px;
                    outline:none;
                }
    
                .booking-form-submitDiv {
                    margin-top:22px;
                    display: flex;
                    gap: 10px;
                    justify-content: center; 
                    align-items: center;
                    text-align: center;
                    width: 117px !important;
                    height: 40px !important;
                    background: #2837A5;
                    border-radius: 4px;
                    padding: 8px 16px;
                    border: none;
                    cursor:pointer;
                }
                
                .booking-form-submitText {
                    margin: 0;
                    padding: 0;
                    color: #FFFFFF;
                    font-size: 14px;
                    font-weight: 700;
                }

                .closeIcon{
                    width:24px;
                    height:24px;
                    display:flex;
                    // justify-content:end;
                    // align-items:end;
                    margin-left:152%;
                    margin-top:-4%;
                }

            
                // confirm booking 
                
        .confirm-schedule-booking-heading{
            // margin-top:40px;
            // margin-left:40px;
            color:black;
            font-weight:500;
            font-size:22px
        }

            .confirm-schedule-booking-container {
                // margin-left:40px;
                // border: 1px solid #eee;
                background:#FFFFFF;
                width: 840px;
                height: auto !important;
                border-radius: 16px;
                margin-top:36px;
                display: flex;
                padding: 41px 40px;
                justify-content: start;
                align-items: center;
            }

           .confirm-schedule-leftContainer {
                display: flex;
                // padding: 41px 40px;
                width: 120px !important;
                height: 100% !important;
            }
            // .confirm-schedule-rightContainer{
              
            // }
            .confirm-schedule-meetingbookedWith{
                color: #000000;
                font-size:16px;
                font-weight:600;
            }
            .confirm-schedule-scheduleMeetingDetails{
                display:flex;
                gap:32px;
            }
            .confirm-schedule-duration{
                display:flex;
                gap:8px;
            }
            .confirm-schedule-scheduleDateTime{
                color: #000000;
                font-size:15px;
                font-weight:400;
            }
            .confirm-schedule-timeIST{
                color: #000000;
                font-size:15px;
                font-weight:400;
            }

            .booking-form-main-container{
                position:absolute;
                top:0;
                // left:28%;
                transition: opacity 0.9s ease-in;
                z-index:100;
            }
    
            .modalHide{
                display:none;
            }
        `;
        document.head.appendChild(styleElement);
    }

    async fetchTimeSlots() {
        try {

            const response = await fetch(`http://localhost:8000/api/v1/inboundRouter/${this.props.config.routerId}/${this.props.config.repIdentifier}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tz: "Asia/kolkata" }), // Replace with your POST data
            });

            if (!response.ok) {
                throw new Error('POST request failed');
            }

            const data = await response.json();
            if (data.success) {
                this.timeSlots = data.data;
                this.selectedDateIndex = 0;
            }
            this.isLoading = false;
            this.render();
            // Do something with the response data
        } catch (error) {
            this.isLoading = false;
            console.error('Error:', error);
        }

    }

    renderConfirmation() {
        const confirmationTitle = document.createElement("h1");
        confirmationTitle.className = 'confirm-schedule-booking-heading'
        confirmationTitle.textContent = this.confirmBookingHeading;

        const confirmBookingElementContainer = document.createElement("div");
        confirmBookingElementContainer.className = "confirm-schedule-booking-container";

        const confirmLeftContainer = document.createElement("div");
        confirmLeftContainer.className = "confirm-schedule-leftContainer";

        const greenTimefixIcon = document.createElement("img");
        greenTimefixIcon.src = this.greenTimefixIcon;

        confirmLeftContainer.appendChild(greenTimefixIcon)

        const confirmRightContainer = document.createElement("div");
        confirmRightContainer.className = "confirm-schedule-rightContainer";

        const meetingbookedWith = document.createElement('p')
        meetingbookedWith.className = 'confirm-schedule-meetingbookedWith'
        meetingbookedWith.textContent = 'You are Meeting with Anish Tripathi'

        confirmRightContainer.appendChild(meetingbookedWith)

        const scheduleMeetingDetails = document.createElement("div");
        scheduleMeetingDetails.className = "confirm-schedule-scheduleMeetingDetails";

        confirmRightContainer.appendChild(scheduleMeetingDetails);


        const scheduleDateTime = document.createElement('p')
        scheduleDateTime.className = 'confirm-schedule-scheduleDateTime'
        scheduleDateTime.textContent = 'November 6, 2023 2:00 PM'

        const duration = document.createElement("div");
        duration.className = "confirm-schedule-duration";

        scheduleMeetingDetails.appendChild(scheduleDateTime)
        scheduleMeetingDetails.appendChild(duration)

        const meetIcon = document.createElement("img");
        meetIcon.src = this.meetIcon;

        const timeIST = document.createElement('p')
        timeIST.className = 'confirm-schedule-timeIST'
        timeIST.textContent = '12:00 - 12:30, IST'

        duration.appendChild(meetIcon)
        duration.appendChild(timeIST)


        confirmBookingElementContainer.appendChild(confirmLeftContainer)
        confirmBookingElementContainer.appendChild(confirmRightContainer)
        this.container.appendChild(confirmationTitle);
        this.container.appendChild(confirmBookingElementContainer);

    }

    renderForm() {
        const bookingFormElementMainContainer = document.createElement("div");

        bookingFormElementMainContainer.className = "booking-form-main-container";

        // const title = document.createElement("h2");
        // title.className = 'booking-form-heading'
        // title.textContent = this.bookingFormHeading;

        // bookingFormElementMainContainer.appendChild(title)

        const bookingElementContainer = document.createElement("div");

        bookingElementContainer.className = "booking-form-container";

        bookingFormElementMainContainer.appendChild(bookingElementContainer)

        const daysContainer = document.createElement("div");
        daysContainer.className = "booking-form-custom-div";

        const meetingDetails = document.createElement("div");
        meetingDetails.className = "booking-form-meetingDetails";

        const leftContainer = document.createElement("div");
        leftContainer.className = "booking-form-leftContainer";

        const weekDiv = document.createElement("div");
        weekDiv.className = "booking-form-week";
        const dayHeading = document.createElement("h1");
        dayHeading.className = "booking-form-day";
        dayHeading.textContent = 'Tue';
        const dateParagraph = document.createElement("p");
        dateParagraph.className = "booking-form-date";
        dateParagraph.textContent = 25;

        const timing = document.createElement('p')
        timing.className = 'booking-form-timing'
        timing.textContent = '12:00 - 12:30, IST'

        const videoconferencing = document.createElement('div')
        videoconferencing.className = 'booking-form-videoconferencing'

        const icon = document.createElement('img')
        icon.className = 'booking-form-videoconferencing-icon'
        icon.src = this.meetIcon

        const name = document.createElement("p");
        name.className = "booking-form-videoconferencing-name";
        name.textContent = 'Google meet';

        weekDiv.appendChild(dayHeading);
        weekDiv.appendChild(dateParagraph);
        leftContainer.appendChild(weekDiv);
        leftContainer.appendChild(timing)

        videoconferencing.appendChild(icon)
        videoconferencing.appendChild(name)
        leftContainer.appendChild(videoconferencing)

        const rightContainer = document.createElement("div");
        rightContainer.className = "booking-form-rightContainer";

        const form = document.createElement("div");
        form.className = "booking-form-userForm";

        // const username = document.createElement('p')
        // username.className = 'form-username'
        // username.textContent('Name')

        const nameDiv = document.createElement("div");
        nameDiv.className = "booking-form-nameDiv";

        const closeIcon = document.createElement("img");
        closeIcon.src = this.closeIcon;
        closeIcon.className = 'closeIcon'

        nameDiv.appendChild(closeIcon)

        const title = document.createElement("h2");
        title.className = 'booking-form-heading'
        title.textContent = this.bookingFormHeading;

        nameDiv.appendChild(title)

        // Name input
        const nameLabel = document.createElement('label');
        nameLabel.className = 'booking-form-formLabel'
        nameLabel.textContent = 'Your name';
        const nameInput = document.createElement('input');
        nameInput.className = 'booking-form-nameInput'
        nameInput.type = 'text';
        nameInput.name = 'name';
        // nameLabel.appendChild(nameInput);

        nameDiv.appendChild(nameLabel)
        nameDiv.appendChild(nameInput)
        form.appendChild(nameDiv);

        const emailDiv = document.createElement("div");
        emailDiv.className = "booking-form-emailDiv";

        // Email input
        const emailLabel = document.createElement('label');
        emailLabel.className = 'booking-form-formLabel'
        emailLabel.textContent = 'Email';
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.className = 'booking-form-emailInput'
        // emailLabel.appendChild(emailInput);

        emailDiv.appendChild(emailLabel)
        emailDiv.appendChild(emailInput)
        form.appendChild(emailDiv);

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "booking-form-detailsDiv";

        // Details (textarea)
        const detailsLabel = document.createElement('label');
        detailsLabel.className = 'booking-form-formLabel'
        detailsLabel.textContent = 'Details';
        const detailsTextarea = document.createElement('textarea');
        detailsTextarea.className = 'booking-form-detailsTextarea'
        detailsTextarea.name = 'details';
        // detailsLabel.appendChild(detailsTextarea);

        detailsDiv.appendChild(detailsLabel)
        detailsDiv.appendChild(detailsTextarea)
        form.appendChild(detailsDiv);

        rightContainer.appendChild(form)

        const submitDiv = document.createElement("div");
        submitDiv.className = "booking-form-submitDiv";

        // Add a submit button
        const submitText = document.createElement('p');
        submitText.textContent = 'Confirm';
        submitText.className = 'booking-form-submitText';

        const rightArrow = document.createElement('img');
        rightArrow.src = this.rightArrow;

        submitDiv.appendChild(submitText);
        submitDiv.appendChild(rightArrow);
        form.appendChild(submitDiv);

        meetingDetails.appendChild(leftContainer);
        daysContainer.appendChild(meetingDetails);
        daysContainer.appendChild(rightContainer);
        // this.container.appendChild(title);
        bookingElementContainer.appendChild(daysContainer);
        this.container.appendChild(bookingFormElementMainContainer);

        // Add event listeners to input fields for form validation
        const nameInputValidate = document.querySelector('.booking-form-nameInput');
        const emailInputValidate = document.querySelector('.booking-form-emailInput');
        const detailsTextareaValidate = document.querySelector('.booking-form-detailsTextarea');

        nameInputValidate.addEventListener('input', handleFormValidation);
        emailInputValidate.addEventListener('input', handleFormValidation);
        detailsTextareaValidate.addEventListener('input', handleFormValidation);
        // submitDiv.addEventListener('click', handleFormValues);

        submitDiv.addEventListener("click", () => {
            console.log('Hello')
            // Handle the click event here
            // You can perform any actions you need when the submit button is clicked
            this.name = nameInput.value
            this.email = emailInput.value
            this.details = detailsTextarea.value;
            // this.renderConfirmations = true

            if (this.name && this.email && this.details) {
                console.log('Test')
                this.renderConfirmations = true
                this.renderConfirmation()
                bookingFormElementMainContainer.classList.add('modalHide')
            }
        });

        function handleFormValidation() {
            const nameValue = nameInput.value;
            const emailValue = emailInput.value;
            const detailsValue = detailsTextarea.value;

            if (nameValue.trim() && emailValue.trim() && detailsValue.trim()) {
                submitDiv.style.backgroundColor = '#2837A5';
                submitDiv.style.opacity = '100%';
            } else {
                submitDiv.style.backgroundColor = '#2837A5';
                submitDiv.style.opacity = '50%';
            }
        }
        handleFormValidation()

    }

    render() {
        this.container.innerHTML = '';
        if (this.isLoading) {
            const bookingElementContainer = document.createElement("div");

            bookingElementContainer.className = "booking-container";
            let loader = document.createElement('p');
            loader.textContent = "Loading...";
            bookingElementContainer.appendChild(loader);
            this.container.appendChild(bookingElementContainer);
        }
        else if (this.selectedDateIndex === 0 && this.selectedTime === null) {

            const bookingElementContainer = document.createElement("div");

            bookingElementContainer.className = "booking-container";

            const title = document.createElement("h2");
            title.textContent = this.heading;

            const daysContainer = document.createElement("div");
            daysContainer.className = "custom-div";


            this.timeSlots.forEach((day, index) => {
                const weekDiv = document.createElement("div");
                weekDiv.className = "week";

                if (index === this.selectedDateIndex) {
                    weekDiv.classList.add("week1");
                }

                weekDiv.addEventListener('click', () => {
                    this.selectedDateIndex = index;
                    this.render();
                });

                const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                let todayDate = new Date(day.date);
                const dayOfWeek = daysOfWeek[todayDate.getDay()];
                const dayHeading = document.createElement("h1");
                dayHeading.className = "day";
                dayHeading.textContent = dayOfWeek;

                const dateParagraph = document.createElement("p");
                dateParagraph.className = "date";
                let dayFormatted = todayDate.getDate();
                const formattedDayOfMonth = dayFormatted.toString().padStart(2, '0');
                dateParagraph.textContent = formattedDayOfMonth;

                weekDiv.appendChild(dayHeading);
                weekDiv.appendChild(dateParagraph);
                daysContainer.appendChild(weekDiv);
            });

            const timeSlotContainer = document.createElement("div");
            timeSlotContainer.className = "time-slot-container";

            if (this.selectedDate) {

            }

            this.timeSlots[this.selectedDateIndex].slots.forEach((time, index) => {
                const timeSlotDiv = document.createElement("div");
                timeSlotDiv.className = "time";
                // Add a click event listener to the time slot
                timeSlotDiv.addEventListener("click", () => {
                    this.selectedTime = time; // Update the selected time
                    this.render(); // Re-render the widget
                });
                const text = document.createElement("p");
                // text.className =''
                text.textContent = time.start_time.split(" ")[1];
                timeSlotDiv.appendChild(text);
                timeSlotContainer.appendChild(timeSlotDiv);
            });


            // append title
            bookingElementContainer.appendChild(title);
            bookingElementContainer.appendChild(daysContainer);
            bookingElementContainer.appendChild(timeSlotContainer);
            this.container.appendChild(bookingElementContainer);

        }

        else if (this.selectedTime !== null) {
            const bookingElementContainer = document.createElement("div");

            bookingElementContainer.className = "booking-container";

            const title = document.createElement("h2");
            title.textContent = this.heading;

            const daysContainer = document.createElement("div");
            daysContainer.className = "custom-div";


            this.timeSlots.forEach((day, index) => {
                const weekDiv = document.createElement("div");
                weekDiv.className = "week";

                if (index === this.selectedDateIndex) {
                    weekDiv.classList.add("week1");
                }

                weekDiv.addEventListener('click', () => {
                    this.selectedDateIndex = index;
                    this.render();
                });

                const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                let todayDate = new Date(day.date);
                const dayOfWeek = daysOfWeek[todayDate.getDay()];
                const dayHeading = document.createElement("h1");
                dayHeading.className = "day";
                dayHeading.textContent = dayOfWeek;

                const dateParagraph = document.createElement("p");
                dateParagraph.className = "date";
                let dayFormatted = todayDate.getDate();
                const formattedDayOfMonth = dayFormatted.toString().padStart(2, '0');
                dateParagraph.textContent = formattedDayOfMonth;

                weekDiv.appendChild(dayHeading);
                weekDiv.appendChild(dateParagraph);
                daysContainer.appendChild(weekDiv);
            });

            const timeSlotContainer = document.createElement("div");
            timeSlotContainer.className = "time-slot-container";

            if (this.selectedDate) {

            }

            this.timeSlots[this.selectedDateIndex].slots.forEach((time, index) => {
                const timeSlotDiv = document.createElement("div");
                timeSlotDiv.className = "time";
                // Add a click event listener to the time slot
                timeSlotDiv.addEventListener("click", () => {
                    this.selectedTime = time; // Update the selected time
                    this.render(); // Re-render the widget
                });
                const text = document.createElement("p");
                // text.className =''
                text.textContent = time.start_time.split(" ")[1];
                timeSlotDiv.appendChild(text);
                timeSlotContainer.appendChild(timeSlotDiv);
            });


            // append title
            bookingElementContainer.appendChild(title);
            bookingElementContainer.appendChild(daysContainer);
            bookingElementContainer.appendChild(timeSlotContainer);
            this.container.appendChild(bookingElementContainer);

            this.renderForm()
            console.log(this.renderConfirmations);
        }
        else if (this.name && this.email && this.details) {
            console.log('dummy')
            this.renderConfirmation()
        }

    }
}
