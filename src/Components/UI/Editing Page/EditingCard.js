import React, { useState } from "react";
import styles from "./EditingCard.module.css";
import { GiCancel } from "react-icons/gi";
import EditEvent from "./EditEvent";
import EditHabit from "./EditHabit";


function EditingCard(props) {
  const cancelEditHandler = () => {
    if(props.refresh)
      props.refresh();
    props.setEditPage(false);
  };

  return (
    <div className={styles.cardBlurWrapper}>
      <div className={styles.editingCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderHeading}>{props.heading}</div>
          <div onClick={cancelEditHandler} className={styles.cardHeaderCancel}>
            <GiCancel />
          </div>
        </div>
        <div className={styles.cardBody}>
          {props.heading === "Edit Event" && (
           <EditEvent data = {props.data} />
          )}
          {props.heading === "Edit Habit"&&(
            <EditHabit cancelEditHandler={cancelEditHandler} editHabitData = {props.editHabitData}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditingCard;
