// react imports
import React from "react";

// styles imports
import "./styles.scss";

// component import
import Header from "./Header";
import Show from "./Show";
// import Form from "./Form"
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const { id, interview, interviewers, bookInterview, cancelInterview } = props;

  // states for visual mode hook
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const DESTROY = "DESTROY";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  // const CONFIRMEDIT = "CONFIRMEDIT";
  // custom visual mode hook
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer: interviewer,
    };
    transition(SAVING);
    bookInterview(id, newInterview)
      .then((res) => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING);
    cancelInterview(id)
      .then((res) => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
<<<<<<< HEAD
    <article className="appointment">
      <header><Header /></header>
=======
    <article className="appointment" key={interview}>
      <header>
        <Header />
      </header>
>>>>>>> feature/useApplicationData
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(DESTROY)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {/* {mode === CONFIRMEDIT && <Confirm onConfirm={save} onCancel={() => back()} message="Save this edit?" />} */}
      {mode === DESTROY && (
        <Confirm
          onConfirm={destroy}
          onCancel={() => back()}
          message="Are you sure you want to delete this appointment?"
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && (
        <Error message="SAVE FAILED" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="DELETE FAILED" onClose={() => back()} />
      )}
    </article>
  );
}
