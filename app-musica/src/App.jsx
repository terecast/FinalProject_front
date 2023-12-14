import { Sidebar } from "./components/navigation/Sidebar";
import { Dashboard } from "./components/views/Dashboard";

function App() {
  return (
    <>
      <main class="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div class="flex items-start justify-between">
          <Sidebar />
          <Dashboard />
        </div>
      </main>
    </>
  );
}

export default App;
