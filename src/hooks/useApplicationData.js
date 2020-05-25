import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }))

  // axios API request effect
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]) // double check where call is made to
      .then((all) => {
        const [days, appointments, interviewers] = all;
        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fuction for interview booking
  function bookInterview(id, interview) {
    const newDays = state.days.map((day) => {
      if (day.name === state.day) day.spots--;
      return day;
    });
    const days = [...state.days, newDays];
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = { ...state.appointments, [id]: appointment };
    return axios
      .put(`api/appointments/${id}`, appointment)
      .then((res) => {
        setState({ ...state, appointments, days });
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  // function for canceling interviews                                  // GUIDE TO WRITING:
  function cancelInterview(id) {
    // create a newDays array
    const newDays = state.days.map((day) => {
      if (day.name === state.day) day.spots++;
      return day;
    });
    // pass in the appointment ID
    const appointment = { ...state.appointments[id], interview: null }; // create a null interview state with this appointment ID
    const appointments = { ...state.appointments, [id]: appointment }; // create a new appointments state with our null interview (WE NEED TO DO THIS IT JUST MAKES IT MORE LEGIBLE TRUST ME
    const days = [...state.days, newDays]; // create a new days state
    return axios
      .delete(`api/appointments/${id}`) // return promise: axios delete
      .then((res) => {
        setState({ ...state, appointments, days }); // set the state on completion
        return Promise.resolve(res); // resolve the promise
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
