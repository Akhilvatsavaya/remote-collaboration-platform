const BASE_URL = "http://localhost:5000/api";

//Fetch All Tasks
export const fetchTasks = async() => {
    try{
        const response = await fetch(`${BASE_URL}/tasks`);
        const data = await response.json();
        console.log("API Response: ", data); //Log to check structure
        return Array.isArray(data) ? data: []; //Ensure it returns an array
    }catch(error) {
        console.error("Error fetching tasks: ", error);
        return [];
    }
};


//Add a new task
export const addTask = async(task) => {
    try{
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Error adding task: ", error);
        return null;
    }
};