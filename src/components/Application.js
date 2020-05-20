import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList"
import InterviewerList from "components/InterviewerList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"


// not going to remove this before i'm totally sure

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];



// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];




// leftover hardcoded data, used as reference
// [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "2pm"
//   }
// ];


export default function Application(props) {


  // tracked states
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  })
  const setDay = day => setState(prev => ({ ...prev, day }))
  // const setDays = days => setState(prev => ({ ...prev, days }))


  // axios API request effect
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]) // double check where call is made to
      .then(all => {
        const [days, appointments, interviewers] = all;
        console.log(days.data)
        console.log(appointments.data)
        console.log(interviewers.data)
        setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
      })
      .then(res => console.log(state))
      .catch(err => {
        console.log(err);
      })
  }, []);

  // fuction for interview booking
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = { ...state.appointments[id], interview: { ...interview } }
    const appointments = { ...state.appointments, [id]: appointment }
    return axios.put(`api/appointments/${id}`, appointment)
      .then(res => {
        setState({ ...state, appointments })
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
      })

  }
  // appointmentList mapper for rendering
  const interviewersList = getInterviewersForDay(state, state.day)
  const appointmentList = getAppointmentsForDay(state, state.day).map(app => {
    const thisInterview = getInterview(state, app.interview)
    return <Appointment key={app.id} {...app} interview={thisInterview} interviewers={interviewersList} bookInterview={bookInterview} />
  })



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            interviews={state.interviews}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
