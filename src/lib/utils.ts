import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string) {
  // Convert the input date string to a JavaScript Date object
  const date = new Date(dateString)

  // Get the current date and time
  const now = new Date()

  // Calculate the time difference in milliseconds
  const timeDiff = Number(now) - Number(date)

  // Calculate the time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  // Format the result based on the time difference
  if (days > 1) {
    return days + ' days ago'
  } else if (hours > 1) {
    return hours + ' hours ago'
  } else if (minutes > 1) {
    return minutes + ' minutes ago'
  } else {
    return seconds + ' seconds ago'
  }
}
