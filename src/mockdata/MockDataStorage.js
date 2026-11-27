import { genres } from "./Genres";
import { chats } from "./Chat";
import { communitiesData } from "./Communities";
import { sampleEvents } from "./Events";
import { notificationsData } from "./Notifications";
import { usersData } from "./Users";

export const genresStorageKey = "resonate.genres";
export const chatsStorageKey = "resonate.chats";
export const communitiesStorageKey = "resonate.communities";
export const eventsStorageKey = "resonate.events";
export const notificationsStorageKey = "resonate.notifications";
export const usersStorageKey = "resonate.users";

export function setJsonItem(key, value) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

export function getJsonItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function initMockData() {
    // Check if storage has been initialized already
    const checkItem = localStorage.getItem(genresStorageKey);
    if (checkItem !== null) {
        return;
    }
    // Write all default values to storage
    setJsonItem(genresStorageKey, genres);
    setJsonItem(chatsStorageKey, chats);
    setJsonItem(communitiesStorageKey, communitiesData);
    setJsonItem(eventsStorageKey, sampleEvents);
    setJsonItem(notificationsStorageKey, notificationsData);
    setJsonItem(usersStorageKey, usersData);
}