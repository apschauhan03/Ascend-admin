import React, { useState } from "react";
import styles from "./EditingCard.module.css";
import noImage from "../../../assets/no-image.svg";
import DatePicker from "react-datepicker";
import ImageUploader from "../../Teams/imageUploader";
import UpdateEvent from "../../../api/UpdateEvent";

function EditEvent(props) {
  const [eventData, setEventData] = useState(props.data);
  // console.log(eventData);
  // const [editTeamData, setEditTeamData] = useState({
  //   _id: props._id,
  //   name: props.name,
  //   points: props.points,
  //   logo: props.logo,
  // });
  const [startTime, setSelectedStartDate] = useState(
    new Date(eventData.startTime)
  );
  const [endTime, setSelectedEndDate] = useState(new Date(eventData.endTime));

  const [isValid, setIsValid] = useState(true);
  const validateDateRange = (start, end) => {
    setIsValid(end > start);
  };
  const startDateChangeHandler = (date) => {
    setSelectedStartDate(date);
    setEventData((prevData) => {
      return { ...prevData, startTime, endTime };
    });
    validateDateRange(date, endTime);
  };
  const endDateChangeHandler = (date) => {
    setSelectedEndDate(date);
    setEventData((prevData) => {
      return { ...prevData, startTime, endTime };
    });
    validateDateRange(startTime, date);
  };

  const formChangeHandler = (event) => {
    setEventData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  const imageUploadHandler = async (img) => {
    const formData1 = new FormData();
    formData1.append("image", img);
    // console.log("hello from image handler ,", formData1.get("image"));

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=64e26b821a87b1e73115ba89dac737b1",
      {
        method: "POST",
        body: formData1,
      }
    );
    const result = await response.json();
    const imgData = {
      display_url: result.data.display_url,
      imgUrl: result.data.url,
    };
    return imgData;
  };
  const handleImageUpload = async (acceptedFiles) => {
    const imgData = await imageUploadHandler(acceptedFiles[0]);
    const { display_url } = imgData;
    const logo_val = display_url;
    setEventData((prevData) => {
      return { ...prevData, image: logo_val };
    });
  };

  const saveEventHandler = async() => {
    if (isValid) {
      console.log(eventData);
      await UpdateEvent(eventData);
      window.location.reload();
    }
  };

  return (
    <div className={styles.editEvent}>
      <div className={styles.teamDetailsWrapper}>
        <div className={styles.teamDetails}>
          <div className={styles.leftDiv}>
            <div className={styles.teamImageDivWrapper}>
              <div className={styles.teamImage}>
                <img
                  src={eventData.image ? eventData.image : noImage}
                  alt="team logo"
                />
              </div>
            </div>
            <div className={styles.teamNameWrapper}>
              <div className={styles.teamName}>
                Event Name{" "}
                <input
                  onChange={formChangeHandler}
                  name={"name"}
                  value={eventData.name}
                />
              </div>
              <div className={styles.teamPoints}>
                Description{" "}
                <input
                  onChange={formChangeHandler}
                  name={"description"}
                  value={eventData.description}
                />
              </div>
            </div>
          </div>
          <div className={styles.dateTimeDivWrapper}>
            <div className={styles.dateTimeDiv}>
              <label>Start Date:</label>
              <DatePicker
                selected={startTime}
                onChange={startDateChangeHandler}
                showTimeSelect
                timeFormat="HH:mm"
                className={styles.datePickerInput}
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className={styles.dateTimeDiv}>
              <label>End Date:</label>
              <DatePicker
                className={styles.datePickerInput}
                selected={endTime}
                onChange={endDateChangeHandler}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className={styles.displayDate}>
              <div>Start Date: {startTime.toDateString()}</div>
              <div>End Date: {endTime.toDateString()}</div>
            </div>
            <div className={styles.displayDate}>
              <div>Start Time: {startTime.toLocaleTimeString()}</div>
              <div>End Time: {endTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        <div className={styles.logoChange}>
          <ImageUploader
            title={props.title}
            onImageUpload={handleImageUpload}
          />
        </div>
        <>
          <div className={styles.addMeetLink}>
            <label>Redirect Link:</label>
            <div className={styles.linkInput}>
              <input
                onChange={formChangeHandler}
                value={eventData.joiningLink}
                name="joiningLink"
              ></input>
            </div>
          </div>
          <div className={styles.addEventButton}>
            <button onClick={saveEventHandler}>Save Event</button>
          </div>
        </>
      </div>
    </div>
  );
}

export default EditEvent;
