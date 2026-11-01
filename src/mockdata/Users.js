import { genres } from "./Genres"

const defaultUser = {
    username: "rayanyyc",
    displayname: "Rayan",
    location: {
        x: 0,
        y: 0,
        shareLevel: "country",
        shareText: "Canada"
    },
    bio: "I'm a niche-music listener and beginner hobby DJ who mainly plays small house parties.",
    topArists: [
        "Slowdive",
        "Ride"
    ],
    genres: [
        genres[0]
    ]
}

export { defaultUser };