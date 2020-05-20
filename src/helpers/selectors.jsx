

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

export function getAppointmentsForDay(state, day) {

  let schedule = [];

  state.days.forEach(listedDay => {
    if (listedDay.name === day) {
      schedule = listedDay.appointments.map(apptId => state.appointments[apptId]);
    }
  })
  return schedule;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[`${interview.interviewer}`]
    }
  } else return null;
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];
  state.days.forEach(listedDay => {
    if (listedDay.name === day) {
      interviewers = listedDay.interviewers.map(interviewerId => state.interviewers[interviewerId])
    }
  })
  return interviewers;
}