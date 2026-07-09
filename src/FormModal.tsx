function FormModal({ handleAddNewActivity, isSubmitting, setIsModalOpen }: { handleAddNewActivity: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; isSubmitting: boolean; setIsModalOpen: (isOpen: boolean) => void }) {
  return (
    <div>
    <form onSubmit={handleAddNewActivity} className="space-y-4">
      <input
        required
        type="text"
        name="name"
        placeholder="Activity name"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
      <input
        required
        type="time"
        name="typical_time"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
      <input
        required
        min={1}
        type="number"
        name="duration_minutes"
        placeholder="Duration in minutes"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
      <input
        type="text"
        name="allowed_apps"
        placeholder="Allowed apps"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />
      <input
        type="text"
        name="allowed_websites"
        placeholder="Allowed websites"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
      />

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
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
  );
}

export default FormModal;
