function formatDate(date: any) {
  if (!date) {
    return;
  }
  const formatDate = new Date(date);

  const options: any = { year: "numeric", month: "long", day: "numeric" };

  return formatDate.toLocaleDateString("en-GB", options);
}

export default formatDate;

export const adminDateFormat = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString("en-GB", options);
};

export function formatNotificationTime(createdTime: any) {
  if (!(createdTime instanceof Date)) {
    createdTime = new Date(createdTime);
  }

  const currentTime: any = new Date();
  const timeDifference: any = currentTime - createdTime;

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutesAgo < 1) {
    return "now";
  } else if (minutesAgo < 60) {
    return `${minutesAgo} mins ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hrs ago`;
  } else {
    let formattedDate;
    if (currentTime.getFullYear() === createdTime.getFullYear()) {
      formattedDate = createdTime.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      formattedDate = createdTime.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }
    return formattedDate;
  }
}
