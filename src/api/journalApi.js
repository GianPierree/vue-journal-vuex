import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://vue-demos-acf2f-default-rtdb.firebaseio.com",
});

export default journalApi;
