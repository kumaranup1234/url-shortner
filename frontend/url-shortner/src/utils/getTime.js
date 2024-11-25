export const get = (isoDate) => {

    const date = new Date(isoDate);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;

    const formattedHours = hours % 12 || 12;
    const amOrPm = isPM ? "PM" : "AM";


    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[date.getMonth()];

    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    const formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;

    return `Created on: ${formattedDate} at ${formattedTime}`;
}