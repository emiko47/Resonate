const postCollections = [
    {name: 'Default', items: [
        {
            id: 1,
            title: 'My review of this album',
            username: 'Rayan',
            avatar: 'https://img.icons8.com/ios/50/user.png',
            commentsCount: 100,
            time: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
            tags: ['Pop', 'Rap'],
        },
        {
            id: 2,
            title: 'My review of this album',
            username: 'Sam',
            avatar: 'https://img.icons8.com/ios/50/user.png',
            commentsCount: 100,
            time: Date.now() - 2 * 60 * 60 * 1000,
            tags: ['Pop', 'Rap'],
        },
    ]},
    {name: 'Calgary Artists', items: [
        {
            id: 3,
            title: 'My review of this album',
            username: 'Jordan',
            avatar: 'https://img.icons8.com/ios/50/user.png',
            commentsCount: 100,
            time: Date.now() - 2 * 60 * 60 * 1000,
            tags: ['Pop', 'Rap'],
        }
    ]}
]

const eventCollections = [
    {name: 'Default', items: []},
    {name: 'Out of town', items: [
        {
            id: 'sf',
            title: 'Performance at Steven Ave',
            image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
            day: 'Saturday',
            time: '7 pm',
            reason: 'Because you follow DJ',
        },
        {
            id: 'dj',
            image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
            title: 'Performance at Steven Ave',
            day: 'Saturday',
            time: '7 pm',
            reason: 'Because you follow DJ',
        },
    ]}
]

const userCollections = [
    {name: 'Default', items: [
        {
            username: 'abcd'
        }
    ]},
    {name: 'DJs', items: [
        {
            username: 'abcd'
        },
        {
            username: 'abcd'
        }
    ]}
]

export { postCollections, eventCollections, userCollections };