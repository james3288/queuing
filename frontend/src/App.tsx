import JobOrderQueue from "./components/JobOrderQueue";
import Notifications from "./components/Notifications";

function App() {
  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Queue System</h1>
        <Notifications />
      </header>
      <JobOrderQueue />
    </div>
  );
}

export default App;
