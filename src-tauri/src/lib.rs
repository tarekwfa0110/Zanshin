mod activity;
use activity::Activity;
use std::{fs, path::PathBuf};
use tauri::{AppHandle, Manager};

const DEFAULT_ACTIVITIES_JSON: &str = include_str!("activities.json");

fn activities_file(app: &AppHandle) -> Result<PathBuf, String> {
    let mut path = app
        .path()
        .app_data_dir()
        .map_err(|err| format!("failed to resolve app data dir: {err}"))?;

    fs::create_dir_all(&path).map_err(|err| format!("failed to create app data dir: {err}"))?;

    path.push("activities.json");

    if !path.exists() {
        fs::write(&path, DEFAULT_ACTIVITIES_JSON)
            .map_err(|err| format!("failed to initialize activities.json: {err}"))?;
    }

    Ok(path)
}

fn read_activities(app: &AppHandle) -> Result<Vec<Activity>, String> {
    let path = activities_file(app)?;
    let contents = fs::read_to_string(&path)
        .map_err(|err| format!("failed to read activities.json: {err}"))?;

    serde_json::from_str(&contents).map_err(|err| format!("failed to parse activities.json: {err}"))
}

fn write_activities(app: &AppHandle, activities: &[Activity]) -> Result<(), String> {
    let path = activities_file(app)?;
    let json = serde_json::to_string(activities)
        .map_err(|err| format!("failed to serialize activities.json: {err}"))?;

    fs::write(&path, json).map_err(|err| format!("failed to write activities.json: {err}"))
}

#[tauri::command]
fn get_activities(app: AppHandle) -> Result<Vec<Activity>, String> {
    read_activities(&app)
}

#[tauri::command]
fn add_activity(activity: Activity, app: AppHandle) -> Result<(), String> {
    let mut activities = read_activities(&app)?;
    activities.push(activity);
    write_activities(&app, &activities)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_activities, add_activity])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
