import axios from "axios"
export const HOST="http://localhost:4000";
export const fetchGenreList= async ()=>{
    const data = await axios.get(HOST+"/movies?offset=0&limit=1000")
    return data;
}