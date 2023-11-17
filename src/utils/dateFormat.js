export default function dateFormat(
  timeStamp = null,
  format = 'YYYY-MM-DD HH:mm:ss'
) {
  const date = new Date(timeStamp)
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }
  for (const key in config) {
    format = format.replace(key, addZero(config[key]))
  }
  if (format.includes('NaN')) return false
  return format
}

function addZero(date) {
  return date.toString().padStart(2, 0)
}
