import "./App.css";
import SchedulePreview from "./components/SchedulePreview";
import { generatedSchedule } from "./logic/mock";

function App() {
  return (
    <>
      <SchedulePreview schedule={generatedSchedule} />
    </>
  );
}

export default App;
