import axios from "axios";

const EVENTS_URL = "https://601caf791a9c220017060c02.mockapi.io/api/v1/Events";

export const getEventsAPI = async ({ date, eventId }) => {
    try {
        let params = [];
        let url = EVENTS_URL;

        if (date) {
            params.push(`date=${date}`);
        }

        if (eventId) {
            params.push(`eventId=${eventId}`);
        }

        for (let i = 0; i < params.length; i++) {
            if (i === 0) {
                url = `${url}?${params[0]}`;
            } else {
                url = `${url}&${params[i]}`;
            }
        }

        const res = await axios.get(url);
        return res;
    } catch(error) {
        throw error;
    }
};

export const getCommentsAPI = async ({ eventId, name, comment, createdTime }) => {
    try {
        let url = `${EVENTS_URL}/${eventId}/comments`;
        let params = [];

        if (name) {
            params.push(`name=${name}`);
        }

        if (comment) {
            params.push(`comment=${comment}`);
        }

        if (createdTime) {
            params.push(`createAt=${createdTime}`);
        }

        for (let i = 0; i < params.length; i++) {
            if (i === 0) {
                url = `${url}?${params[0]}`;
            } else {
                url = `${url}&${params[i]}`;
            }
        }

        const res = await axios.get(url);
        return res;
    } catch (error) {
        throw error;
    }
};

export const addCommentAPI = async (comment) => {
    try {
        let url = `${EVENTS_URL}/${comment.EventId}/comments`;
        const res = await axios.post(url, comment);
        return res;
    }
    catch (error) {
        throw error;
    }
};

export const addRateAPI = async (rate) => {
    try {
        let url = `${EVENTS_URL}/${rate.EventId}/rates`;
        const res = await axios.post(url, rate);
        return res;
    } catch (error) {
        throw error;
    }
}

export const getAttendeesAPI = async ({ eventId }) => {
    try {
        let url = `${EVENTS_URL}/${eventId}/Attendees`;
        const res = await axios.get(url);
        return res;
    } catch (error) {
        throw error;
    }
};

export const addAttendeeAPI = async (attendee) => {
    try {
        let url = `${EVENTS_URL}/${attendee.EventId}/Attendees`;
        const res = await axios.post(url, attendee);
        return res;
    } catch (error) {
        throw error;
    }
};

export const addEventAPI = async (event) => {
    try {
        let url = EVENTS_URL;
        const res = await axios.post(url, event);
        return res;
    } catch (error) {
        throw error;
    }
};

export const editEventAPI = async (event) => {
    try {
        let url = `${EVENTS_URL}/${event.eventId}`;
        const res = await axios.put(url, event);
        return res;
    } catch (error) {
        throw error;
    }
};