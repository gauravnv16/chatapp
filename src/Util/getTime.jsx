export default function getTime() {
    const date = new Date();
    const day = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    return day + "," + time;
}