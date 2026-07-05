import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Activity } from "./Activity";


export default function AllActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    invoke<Activity[]>("get_activities")
      .then(setActivities)
      .catch(console.error);
  }, []);

  // const handleEdit = (id: number) => {
    
  // };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Overview
          </p>
          <h1 className="text-left text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            All Activities
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {activities.length}{" "}
            {activities.length === 1 ? "activity" : "activities"} registered
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:text-blue-300"
        >
          Back to home
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            No activities yet
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Add your first activity from the home page to see it here.
          </p>
        </div>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => (
            <article
              key={activity.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {activity.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Typical time: {activity.typical_time}
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  {activity.duration_minutes} min
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    Allowed Apps
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.allowed_apps.length > 0 ? (
                      activity.allowed_apps.map((app) => (
                        <span
                          key={app}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {app}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        None
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    Allowed Websites
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.allowed_websites.length > 0 ? (
                      activity.allowed_websites.map((website) => (
                        <span
                          key={website}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {website}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        None
                      </span>
                    )}
                  </div>

                  <div>
                    <button onClick={() => console.log("tbd")}>Edit</button>
                  </div>
                  
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
