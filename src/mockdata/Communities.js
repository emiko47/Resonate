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
        id: 1,
        name: "My thoughts about this song",
        username: "Someone",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: Date.now()-10*60*1000,
        numberComments: 20
    },
    {
        id: 2,
        name: "What happened to that unreleased track?",
        username: "Else",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: Date.now()-30*60*1000,
        numberComments: 20
    }
]

const commentData = [
    {
        username: "User 1",
        text: "I agree!",
        comments: [
            {
                username: "User 2",
                text: "I don't",
                comments: []
            },
            {
                username: "Someone",
                text: "Thanks!",
                comments: []
            }
        ]
    },
    {
        username: "User 3",
        text: "laboris nisi ut aliquip ex ea",
        comments: []
    },
    {
        username: "User 4",
        text: "laboris nisi ut aliquip ex ea",
        comments: [
            {
                username: "User 5",
                text: "Lorem ipsum dolor sit amet",
                comments: [
                    {
                        username: "User 6",
                        text: "consectetur adipiscing",
                        comments: [
                            {
                                username: "User 5",
                                text: "Lorem ipsum dolor sit amet",
                                comments: [
                                    {
                                        username: "User 6",
                                        text: "consectetur adipiscing",
                                        comments: [
                                            {
                                                username: "User 8",
                                                text: "This is a longer reply. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
                                                comments: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        username: "User 7",
                        text: "consectetur adipiscing",
                        comments: []
                    }
                ]
            }
        ]
    },
    {
        username: "User 8",
        text: "This is a longer reply. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
        comments: []
    },
]

export { communitiesData, commentData, postsData };