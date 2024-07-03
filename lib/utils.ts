import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'

export function cn(...inputs: ClassValue[]) {//comes from shadcn
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: Date) => {//function takes a date string and formats it in three different ways:
  // Including date, time (e.g., "Mon Oct 25 2023 08:30 AM")
  // Date only (e.g., "Mon Oct 25 2023")
  // Time only (e.g., "08:30 AM")
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)//transforms a File object (such as an image file selected by a user) into a URL that can be used to preview or display the file content. creates a temporary URL from a file object, allowing you to use the file within the browser context.  URL that can be used as the src attribute of an <img> or <video> tag.

export const formatPrice = (price: string) => { //takes a price string (presumably a number) and formats it as a currency value (USD by default). ensures that prices, such as 1234.56, are formatted with commas and a dollar sign Output $1,234.56
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {//URL manipulation function Adds or updates a query parameter in the current URL and returns the modified URL Returns a string representing the modified URL.
  /*The function takes the existing query string from the URL (everything after the "?") which in this case is "?category=electronics".
You tell the function to add a new parameter named "sort" with a value of "price_asc" (meaning sort by price in ascending order).
The function rebuilds the URL, keeping the existing category information and adding the new sorting parameter. */
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) { // takes an object with URL parameters to remove and creates a new URL without those specific keys.Eg a long shopping website URL with filters for color (red) and size (medium): .
  // You want to see all colors but keep the medium size filter.
  // removeKeysFromQuery takes the query string ("?color=red&size=medium").
  // It removes "color" but keeps "size".
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const handleError = (error: unknown) => {//In a web application that interacts with external APIs or performs complex operations, errors can occur due to various reasons such as network issues, unexpected data formats, or server errors. The handleError function is crucial for managing these errors effectively. When an error occurs, handleError logs the error details to the browser's console for debugging purposes and throws an Error object with a descriptive message. This ensures that developers can quickly identify and address issues, improving the reliability and stability of the application.
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}