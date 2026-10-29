const communitiesData = [
    {
        name: "Test 1",
        description: "abcd",
        tags: ["Pop"],
        lastPost: Date.now()-2*1000,
        numberPosts: 2
    },
    {
        name: "Test 2",
        description: "abcd",
        tags: ["Rap"],
        lastPost: Date.now()-15*60*1000,
        numberPosts: 2
    },
    {
        name: "Test 3",
        description: "abcd",
        tags: ["Rock"],
        lastPost: Date.now()-12*60*60*1000,
        numberPosts: 2
    },
    {
        name: "Test 4",
        description: "abcd",
        tags: ["zzzzz", "Pop", "Long genre"],
        lastPost: Date.now()-25*60*60*1000,
        numberPosts: 2
    },
]

const defaultGenres = ["Pop", "Rap"];

export { communitiesData, defaultGenres };