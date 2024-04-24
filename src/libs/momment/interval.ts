import moment from "moment";

const interval = (datetime: string) => {
    const timeDifference = moment().diff(datetime, 'seconds');
  
    if (timeDifference >= 31536000) { // lebih dari 1 tahun
      return`${Math.floor(timeDifference / 31536000)} year${Math.floor(timeDifference / 31536000) > 1 ? 's' : ''} ago`;
    } else if (timeDifference >= 2592000) { // lebih dari 1 bulan
      return`${Math.floor(timeDifference / 2592000)} month${Math.floor(timeDifference / 2592000) > 1 ? 's' : ''} ago`;
    } else if (timeDifference >= 86400) { // lebih dari 1 hari
      return`${Math.floor(timeDifference / 86400)} day${Math.floor(timeDifference / 86400) > 1 ? 's' : ''} ago`;
    } else if (timeDifference >= 3600) { // lebih dari 1 jam
      return`${Math.floor(timeDifference / 3600)} hour${Math.floor(timeDifference / 3600) > 1 ? 's' : ''} ago`;
    } else if (timeDifference >= 60) { // lebih dari 1 menit
      return`${Math.floor(timeDifference / 60)} minute${Math.floor(timeDifference / 60) > 1 ? 's' : ''} ago`;
    } else {
      return`${timeDifference} second${timeDifference > 1 ? 's' : ''} ago`;
    }
}

export default interval