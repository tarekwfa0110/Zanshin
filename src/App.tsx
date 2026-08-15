import { useEffect, useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import FormModal from "./FormModal";
import type { Activity } from "./Activity";
import { Link } from "react-router-dom";

function parseTypicalTimeToMinutes(value: string) {
  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

function scoreActivity(activity: Activity) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const typicalMinutes = parseTypicalTimeToMinutes(activity.typical_time);

  const timeDistance =
    typicalMinutes === null ? 720 : Math.abs(typicalMinutes - currentMinutes);
  const wrappedTimeDistance = Math.min(timeDistance, 1440 - timeDistance);
  const timeScore = Math.max(0, 720 - wrappedTimeDistance);
  const durationScore = Math.max(0, 180 - activity.duration_minutes);

  return timeScore + durationScore;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    invoke<Activity[]>("get_activities")
      .then(setActivities)
      .catch(console.error);
  }, []);

  const featuredActivities = useMemo(
    () =>
      [...activities]
        .sort((first, second) => scoreActivity(second) - scoreActivity(first))
        .slice(0, 3),
    [activities],
  );

  const handleAddNewActivity = async (data: Omit<Activity, "id">) => {
      const nextId =
        activities.reduce((maxId, activity) => Math.max(maxId, activity.id), 0) + 1;
  
      const activity: Activity = { id: nextId, ...data };
  
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        await invoke("add_activity", { activity });
        const updated = await invoke<Activity[]>("get_activities");
        setActivities(updated);
        setIsModalOpen(false);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {featuredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex min-h-32 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center text-xl font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {activity.name}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/all-activities"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:text-white"
        >
          Show all activities
        </Link>
        <button
          type="button"
          onClick={() => {
            setSubmitError(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
        >
          Add new activity
        </button>
      </div>


        {isModalOpen && (
          <FormModal
            onSubmit={handleAddNewActivity}
            isSubmitting={isSubmitting}
            onClose={() => setIsModalOpen(false)}
            error={submitError}
          />
        )}

    </main>
  );
}

export default App;
