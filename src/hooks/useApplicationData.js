export const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: []
})
export const setDay = day => setState(prev => ({ ...prev, day }))
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
export function bookInterview(id, interview) {
  const appointment = { ...state.appointments[id], interview: { ...interview } }
  const appointments = { ...state.appointments, [id]: appointment }
  return axios.put(`api/appointments/${id}`, appointment)
    .then(res => {
      setState({ ...state, appointments })
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    })
}

// function for canceling interviews                                  // GUIDE TO WRITING:
export function cancelInterview(id) {                                        // pass in the appointment ID
  const appointment = { ...state.appointments[id], interview: null }  // create a null interview state with this appointment ID
  const appointments = { ...state.appointments, [id]: appointment }   // create a new appointments state with our null interview (WE NEED TO DO THIS IT JUST MAKES IT MORE LEGIBLE TRUST ME)
  return axios.delete(`api/appointments/${id}`)                       // return promise: axios delete
    .then(res => {
      setState({ ...state, appointments })                            // set the state on completion
      return Promise.resolve(res);                                    // resolve the promise
    })
    .catch(err => {
      return Promise.reject(err);
    })
}