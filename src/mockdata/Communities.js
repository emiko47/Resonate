import { genres } from "./Genres";

const communitiesData = [
    {
        name: "Calgary Rap",
        description: "The community for local rappers in Calgary",
        tags: [genres[1]],
        lastPost: Date.now()-2*1000,
        numberPosts: 55
    },
    {
        name: "2000s Pop",
        description: "2000s Pop",
        tags: [genres[0]],
        lastPost: Date.now()-15*60*1000,
        numberPosts: 367
    },
    {
        name: "The Jazz Room",
        description: "A place to discuss all things Jazz",
        tags: [genres[3], genres[4]],
        lastPost: Date.now()-25*60*60*1000,
        numberPosts: 993
    },
    {
        name: "Bob's Country Bunker",
        description: "We got both kinds, we got country and western!",
        tags: [genres[5], genres[6]],
        lastPost: 331020000,
        numberPosts: 1
    }
]

export { communitiesData };