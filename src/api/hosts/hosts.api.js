import axios from "axios";

const EVENTS_URL = "https://601caf791a9c220017060c02.mockapi.io/api/v1/Hosts";

export const getHostsAPI = async ({eventId}) => {
    try {
        let params = [];
        let url = EVENTS_URL;

        if (eventId) {
            params.push(`eventId=${eventId}`);
        }

        for (let i = 0; i < params.length; i++) {
            if (i === 0) {
                url = `${url}?${params[0]}`;
            } else {
                url = `${url}&${params[0]}`;
            }
        }

        const res = await axios.get(url);
        return res;
    } catch(error) {
        throw error;
    }
}