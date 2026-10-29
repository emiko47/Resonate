function formatTimeAgo(timestamp) {
  const ms = new Date() - new Date(timestamp);
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return seconds <= 30 ? "Just now" : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}


function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = ('00'+(hash & 0xFF).toString(10)).slice(-3);
  const saturation = 10 <= hue && hue <= 340 ? 80 : 60;
  const lightness = 230 <= hue && hue <= 270 ? 70 : 55;
  const colour = `hsl(${hue} ${saturation} ${lightness})`;
  // console.log(colour);
  return colour;
}


export { formatTimeAgo, stringToColour };