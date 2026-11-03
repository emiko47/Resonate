function formatTimeAgo(timestamp) {
  const ms = new Date() - new Date(timestamp);
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return "just now";
}


function formatTimeAgoOrDate(timestamp) {
  const ms = new Date() - new Date(timestamp);
  if (false && Math.floor(ms / 86400000) === 0) {
    return formatTimeAgo(timestamp)
  } else {
    return new Date(timestamp).toLocaleDateString("en-CA", {year: 'numeric', month: 'long', day: 'numeric'});
  }
}


function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colours = ['#FFE0C7', '#EEE8DA', '#F4EEDC', '#E2DFD5', '#FFD0AD'];
  const colour = colours[Math.abs(hash) % colours.length];
  return colour;
}


function calculateDropdownPosition(event) {
  const newPosition = {};
  const targetX = event.pageX;
  if (targetX < document.documentElement.scrollWidth*0.75) {
    newPosition.left = `${targetX}px`;
  } else {
    newPosition.right = `${document.documentElement.scrollWidth-targetX}px`;
  }
  const targetY = event.pageY;
  if (targetY < document.documentElement.scrollHeight*0.75) {
    newPosition.top = `${targetY}px`;
  } else {
    newPosition.bottom = `${document.documentElement.scrollHeight-targetY}px`;
  }
  return newPosition;
}


export { formatTimeAgo, formatTimeAgoOrDate, stringToColour, calculateDropdownPosition };
