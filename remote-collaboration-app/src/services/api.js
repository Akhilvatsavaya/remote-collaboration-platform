export const fetchTasks = async() => {
    try{
        const response = await fetch('http://localhost:5000/api/tasks');
        const data = await response.json();
        return data.tasks;
    }catch(error) {
        console.error("Error fetching tasks: ", error);
        return [];
    }
};