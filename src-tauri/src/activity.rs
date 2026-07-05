use serde::{Serialize, Deserialize};
#[derive(Debug, Clone,Serialize, Deserialize)]
pub struct Activity {
    pub id: i32,
    pub name: String,
    pub typical_time: String,      
    pub duration_minutes: u32,          
    pub allowed_apps: Vec<String>,
    pub allowed_websites: Vec<String>,
}