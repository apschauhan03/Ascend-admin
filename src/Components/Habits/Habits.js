import React, { useEffect, useState } from "react";
import styles from "./Habits.module.css";
import AddHabits from "../../api/AddHabits";
import GetHabits from "../../api/GetHabits";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import DatePicker from "react-datepicker";
import DeleteHabit from "../../api/DeleteHabit";
import EditingCard from "../UI/Editing Page/EditingCard";

function Habits() {
  const [scheduleTime, setScheduleTime] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    frequency: {
      type: "Daily",
    },
    displayFrom: scheduleTime.getTime()
  });
  const [habits, setHabits] = useState();
  const [refresh, setRefresh] = useState(false);
  const [editHabit, setEditHabit] = useState();
  useEffect(() => {
    const getHabitData = async () => {
      const habitData = await GetHabits();
      setHabits(habitData);
    };
    getHabitData();
  }, [refresh]);

  const handleChange = (event) => {
    if (event.target.name === "freqType") {
      const freq = {
        type: event.target.value,
      };
      setFormData((prevData) => {
        return { ...prevData, frequency: freq };
      });
    } else {
      setFormData((prevData) => {
        return { ...prevData, [event.target.name]: event.target.value };
      });
    }
  };

  const scheduleTimeChangeHandler = (date) => {
    setScheduleTime(date);
    setFormData((prevData) => {
      return { ...prevData, displayFrom: scheduleTime.getTime() };
    });
  };
  const onSubmitHandler = async () => {
    await AddHabits(formData);
    setRefresh(!refresh);
  };
  const setRefreshHandler = () =>{
    setRefresh(!refresh);
  }
  const editHabitHandler = async (eachHabit) => {
    setEditHabit(eachHabit);
  };
  const deleteHabitHandler = async (_id) => {
    await DeleteHabit(_id);
    setRefresh(!refresh);
  };
  return (
    <div className={styles.habitsPage}>
      {editHabit && (
        <EditingCard
          refresh={setRefreshHandler}
          editHabitData={editHabit}
          heading={"Edit Habit"}
          setEditPage={setEditHabit}
        />
      )}
      <div className={styles.habitsCreate}>
        <div className={styles.habitCreateHeader}>Add Habit</div>
        <div className={styles.habitsCreateTitle}>
          <label>Title : </label>
          <input name="title" onChange={handleChange}></input>
        </div>
        <div className={styles.habitsCreateTitle}>
          <label>Schedule From : </label>
          <DatePicker
            selected={scheduleTime}
            onChange={scheduleTimeChangeHandler}
            showTimeSelect
            timeFormat="HH:mm"
            className={styles.datePickerInput}
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div className={styles.dropdown}>
          <label htmlFor="dropdownSelect">Select a Frequency : </label>
          <select
            id="dropdownSelect"
            value={formData.frequency.type}
            name="freqType"
            onChange={handleChange}
          >
            <option value="Daily">Daily</option>
            <option value="WeekDay">WeekDay</option>
            <option value="WeekEnd">WeekEnd</option>
          </select>
        </div>

        <div className={styles.addHabitsButtons}>
          <button onClick={onSubmitHandler}>Add Habit</button>
        </div>
      </div>
      <div className={styles.showHabits}>
        <div className={styles.habitCreateHeader}>Habits</div>
        {habits !== undefined &&
          habits.map((eachHabit) => {
            return (
              <div className={styles.eachHabitDiv}>
                <div className={styles.eachHabitTitle}>{eachHabit.title}</div>
                <div className={styles.eachHabit}>
                  <div
                    onClick={() => editHabitHandler(eachHabit)}
                    className={styles.eachHabitEdit}
                  >
                    <CiEdit />
                  </div>
                  <div
                    onClick={() => deleteHabitHandler(eachHabit._id)}
                    className={styles.eachHabitDelete}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Habits;
