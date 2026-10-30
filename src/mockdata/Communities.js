import { genres } from "./Genres";

const communitiesData = [
    {
        id: "calgary-rap",
        name: "Calgary Rap",
        description: "The community for local rappers in Calgary",
        tags: [genres[1]],
        lastPost: Date.now()-2*1000,
        numberPosts: 55
    },
    {
        id: "2000s-pop",
        name: "2000s Pop",
        description: "2000s Pop",
        tags: [genres[0]],
        lastPost: Date.now()-15*60*1000,
        numberPosts: 367
    },
    {
        id: "the-jazz-room",
        name: "The Jazz Room",
        description: "A place to discuss all things Jazz",
        tags: [genres[3], genres[4]],
        lastPost: Date.now()-25*60*60*1000,
        numberPosts: 993
    },
    {
        id: "bobs-country-bunker",
        name: "Bob's Country Bunker",
        description: "We got both kinds, we got country and western!",
        tags: [genres[5], genres[6]],
        lastPost: 331020000,
        numberPosts: 1
    }
]

const postsData = [
    {
        name: "My thoughts about this song",
        username: "Someone",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: Date.now()-10*60*1000,
        numberComments: 20
    },
    {
        name: "What happened to that unreleased track?",
        username: "Else",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: Date.now()-30*60*1000,
        numberComments: 20
    }
]

export { communitiesData, postsData };