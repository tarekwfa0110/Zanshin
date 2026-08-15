import { Activity } from "./Activity";

function FormModal({
  onSubmit,
  isSubmitting,
  defaultValues,
  onClose,
  error,
}: {
  onSubmit: (data: Omit<Activity, "id">) => Promise<void>;
  isSubmitting: boolean;
  defaultValues?: Activity;
  onClose: () => void;
  error?: string | null;
}) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: Omit<Activity, "id"> = {
      name: String(formData.get("name") ?? ""),
      typical_time: String(formData.get("typical_time") ?? ""),
      duration_minutes: Number(formData.get("duration_minutes") ?? 0),
      allowed_apps: String(formData.get("allowed_apps") ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      allowed_websites: String(formData.get("allowed_websites") ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    };

    await onSubmit(data);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={-1}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={defaultValues ? "Edit Activity" : "Add new activity"}
        className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => onClose()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
            aria-label="Close add activity dialog"
          >
            ×
          </button>
        </div>
        {error && (
          <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200" role="alert">
            {error}
          </p>
        )}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="name">Activity name</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              defaultValue={defaultValues?.name}
              placeholder="Activity name"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <label htmlFor="typical_time">Typical time</label>
            <input
              required
              type="time"
              name="typical_time"
              id="typical_time"
              defaultValue={defaultValues?.typical_time}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <label htmlFor="duration_minutes">Duration in minutes</label>
            <input
              required
              min={1}
              type="number"
              name="duration_minutes"
              id="duration_minutes"
              defaultValue={defaultValues?.duration_minutes}
              placeholder="Duration in minutes"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <label htmlFor="allowed_apps">Allowed apps</label>
            <input
              type="text"
              name="allowed_apps"
              id="allowed_apps"
              defaultValue={defaultValues?.allowed_apps?.join(",")}
              placeholder="Allowed apps"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <label htmlFor="allowed_websites">Allowed websites</label>
            <input
              type="text"
              name="allowed_websites"
              id="allowed_websites"
              defaultValue={defaultValues?.allowed_websites?.join(",")}
              placeholder="Allowed websites"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => onClose()}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default FormModal;
