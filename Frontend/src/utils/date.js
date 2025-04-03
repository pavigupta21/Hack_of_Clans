export const formatDate = (datestring) => {
    const date = new Date(datestring);
    if(isNaN(date.getTime())) {
        return "Invalid Date";
    }

    return date.toLocaleDateString("en-US",{
        year: "numeric",
        month: 'short',
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        hour12: true,
    });
};

export const formatTimeInChat = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const time = messageDate.toLocaleTimeString('en-US', options);

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    if (messageDate.toDateString() === now.toDateString()) {
        return time; // Today -> Show time
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday"; // Yesterday
    } else if (messageDate >= weekAgo) {
        return messageDate.toLocaleDateString('en-US', { weekday: 'long' }); // Within a week -> Show day name
    } else {
        return messageDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }); // Older than a week -> Show date
    }
}
