import React, { useState } from 'react'
import Navbar from './../components/Navbar';
import UserPanel from '../components/UserPanel';

// Dummy data for demonstration
const conversations = [
    {
        id: 1,
        name: "Romy Murray",
        lastMessage: "Audio call ended",
        time: "1:17 PM",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        messages: [
            { fromMe: false, text: "Enim reprehenderit quis Lorem esse est ad nisi ut labore...", time: "1:12 PM" },
            { fromMe: true, text: "Lorem excepteur magna voluptate exercitation dolore exercitation amet", time: "1:12 PM" },
            { fromMe: false, text: "Ad consectetur ullamco tempor...", time: "2:12 PM", attachment: { name: "JD - UX UI Designer.pdf", size: "120 KB" } },
            { fromMe: true, text: "Aliquip nulla aute voluptate fugiat...", time: "2:17 PM", attachment: { name: "CV - Jay Rutherford.pdf", size: "120 KB" } },
            { fromMe: false, text: "Audio call ended", time: "2:12 PM", call: true }
        ]
    },
    {
        id: 2,
        name: "Annie Haley",
        lastMessage: "Ullamco exercitation magna",
        time: "Mon",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        messages: [
            { fromMe: false, text: "Hi, can you share the latest CV?", time: "10:00 AM" },
            { fromMe: true, text: "Sure, attaching it here.", time: "10:01 AM", attachment: { name: "CV - Annie Haley.pdf", size: "110 KB" } },
            { fromMe: false, text: "Thanks!", time: "10:02 AM" }
        ]
    },
    {
        id: 3,
        name: "Jevon Raynor",
        lastMessage: "Velit amet enim ad deserunt",
        time: "Sun",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        messages: [
            { fromMe: false, text: "Can we schedule a call for tomorrow?", time: "3:30 PM" },
            { fromMe: true, text: "Yes, what time works for you?", time: "3:32 PM" },
            { fromMe: false, text: "11 AM is good.", time: "3:33 PM" }
        ]
    },
    {
        id: 4,
        name: "Selina Rutherford",
        lastMessage: "Duis pariatur in nostrud mollit",
        time: "Fri",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        messages: [
            { fromMe: false, text: "I have submitted the assignment.", time: "9:00 AM" },
            { fromMe: true, text: "Received, will review and get back.", time: "9:05 AM" }
        ]
    }
]

const userProfiles = {
    1: {
        name: "Romy Murray",
        title: "Hiring Manager",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        tags: ["Incididunt", "Cupidatat", "Esetion"],
        files: [
            { name: "JD - UX UI Designer.pdf", size: "120 KB" },
            { name: "CV - Jay Rutherford.pdf", size: "120 KB" }
        ]
    },
    2: {
        name: "Annie Haley",
        title: "Product Designer",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        tags: ["Design", "UI/UX"],
        files: [
            { name: "CV - Annie Haley.pdf", size: "110 KB" }
        ]
    },
    3: {
        name: "Jevon Raynor",
        title: "Frontend Developer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: ["React", "JavaScript"],
        files: []
    },
    4: {
        name: "Selina Rutherford",
        title: "QA Engineer",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        tags: ["Testing", "Automation"],
        files: []
    }
}

const Messages = () => {
    const [selectedId, setSelectedId] = useState(conversations[0].id)
    const [input, setInput] = useState("")
    const [allConversations, setAllConversations] = useState(conversations)

    const selected = allConversations.find(conv => conv.id === selectedId)
    const userProfile = userProfiles[selectedId]

    const handleSend = () => {
        if (input.trim()) {
            setAllConversations(prev =>
                prev.map(conv =>
                    conv.id === selectedId
                        ? { ...conv, messages: [...conv.messages, { fromMe: true, text: input, time: "Now" }], lastMessage: input, time: "Now" }
                        : conv
                )
            )
            setInput("")
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex" style={{ height: "calc(100vh - 80px)" }}>
                {/* Sidebar */}
                <UserPanel />
                <aside className="w-72 bg-zinc-800 border-r border-zinc-700 flex flex-col rounded-lg h-full min-h-0">
                    <div className="p-4">
                        <input
                            className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700"
                            placeholder="Search..."
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0">
                        {allConversations.map(conv => (
                            <div
                                key={conv.id}
                                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-zinc-700 transition ${selectedId === conv.id ? "bg-zinc-700" : ""}`}
                                onClick={() => setSelectedId(conv.id)}
                            >
                                <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1">
                                    <div className="font-semibold text-white">{conv.name}</div>
                                    <div className="text-xs text-zinc-400 truncate">{conv.lastMessage}</div>
                                </div>
                                <div className="text-xs text-zinc-400">{conv.time}</div>
                            </div>
                        ))}
                    </div>
                </aside>
                {/* Chat Window */}
                <section className="flex-1 flex flex-col bg-zinc-900 h-full min-h-0">
                    <div className="flex items-center gap-3 border-b border-zinc-700 px-6 py-4 flex-shrink-0">
                        <img src={selected.avatar} alt={selected.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <div className="font-semibold text-white">{selected.name}</div>
                            <div className="text-xs text-green-400">Active now</div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
                        {selected.messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.fromMe ? "bg-fuchsia-600 text-white" : "bg-zinc-800 text-zinc-200"}`}>
                                    <div>{msg.text}</div>
                                    {msg.attachment && (
                                        <div className="mt-2 flex items-center gap-2 bg-zinc-900 rounded px-2 py-1 text-xs">
                                            <span className="font-semibold">{msg.attachment.name}</span>
                                            <span className="text-zinc-400">{msg.attachment.size}</span>
                                        </div>
                                    )}
                                    {msg.call && (
                                        <div className="mt-2 text-xs text-zinc-400">Audio call ended</div>
                                    )}
                                    <div className="text-xs text-zinc-400 mt-1 text-right">{msg.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-zinc-700 p-4 flex gap-2 flex-shrink-0">
                        <input
                            className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            placeholder="Type a message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleSend() }}
                        />
                        <button
                            className="px-6 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </section>
                {/* Profile Panel */}
                <aside className="w-80 bg-zinc-800 border-l border-zinc-700 flex flex-col items-center py-8 px-6 h-full min-h-0">
                    <img src={userProfile.avatar} alt={userProfile.name} className="w-20 h-20 rounded-full object-cover mb-3" />
                    <div className="font-semibold text-xl text-white">{userProfile.name}</div>
                    <div className="text-zinc-400 mb-2">{userProfile.title}</div>
                    <div className="flex gap-2 mb-4">
                        {userProfile.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded bg-zinc-700 text-xs text-fuchsia-300">{tag}</span>
                        ))}
                    </div>
                    <div className="w-full mt-4">
                        <div className="font-semibold text-zinc-300 mb-2">Files</div>
                        <div className="space-y-2">
                            {userProfile.files.length === 0 && (
                                <div className="text-zinc-500 text-xs">No files shared</div>
                            )}
                            {userProfile.files.map(file => (
                                <div key={file.name} className="flex items-center justify-between bg-zinc-900 rounded px-3 py-2">
                                    <span className="text-zinc-200 text-sm">{file.name}</span>
                                    <span className="text-xs text-zinc-400">{file.size}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Messages