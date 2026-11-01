const chats = [
    {
        username: "Friend 1",
        messages: [
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "out", message: "Abcd", time: Date.now()-2*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-1*60*60*1000},
            {direction: "out", message: "Abcd", time: Date.now()-20*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-10*60*1000}
        ]
    },
    {
        username: "Friend 2",
        messages: [
            {direction: "in", message: "Abcd", time: Date.now()-5*60*60*1000},
            {direction: "out", message: "Abcd", time: Date.now()-4*60*60*1000},
            {direction: "in", message: "Abcd", time: Date.now()-3*60*60*1000},
            {direction: "out", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", time: Date.now()-2*60*60*1000}
        ]
    }
]

export { chats };