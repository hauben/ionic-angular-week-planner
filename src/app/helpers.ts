import moment from 'moment';

export function isToday(timestamp: number): boolean {
    const today = new Date();
    const date = new Date(timestamp);
    
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
}


export function secondsToHhMmSs(seconds:number) : string {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}


export function getWeekOfYear(date: Date): number {
    const momentDate = moment(date);
    return momentDate.isoWeek();
}


export function secondsToDateString(milliseconds: number): string {
    const date = new Date(milliseconds);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


export function calculateDuration(start: number, end:number) : string {
    const diff = end - start;
    return secondsToHhMmSs(Math.round(diff/1000));
}


export function isThisMonth(timestamp: number): boolean {
    const today = new Date();
    const date = new Date(timestamp);
    
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth()
    );
}


export function isThisYear(timestamp: number): boolean {
    const today = new Date();
    const date = new Date(timestamp);
    
    return (
        today.getFullYear() === date.getFullYear()
    );
}


export function isYesterday(timestamp: number): boolean {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const date = new Date(timestamp);
    return (
        yesterday.getFullYear() === date.getFullYear() &&
        yesterday.getMonth() === date.getMonth() &&
        yesterday.getDate() === date.getDate()
    );
}


export function isLastMonth(timestamp: number): boolean {
    const today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() - 1;

    if (month < 0) {
        year -= 1;
        month = 11;
    }
    const lastMonth = new Date(year, month, today.getDate());
    const date = new Date(timestamp);

    return (
        lastMonth.getFullYear() === date.getFullYear() &&
        lastMonth.getMonth() === date.getMonth()
    );
}


export function isThisWeek(timestamp: number): boolean{
    let  isEquals = false;

    const today = new Date();
    const numberOfCurrentWeek = getWeekOfYear(today)
    const numberofRefWeek     = getWeekOfYear(new Date(timestamp))

    if (numberOfCurrentWeek==numberofRefWeek){
        isEquals=true;
    }
   
    return isEquals;
}

export function isLastWeek(timestamp: number): boolean{
    // Get the start and end of the previous week
  const previousWeekStart = moment().subtract(1, 'week').startOf('week');
  const previousWeekEnd = moment().subtract(1, 'week').endOf('week');

  // Convert the given date to a Moment.js object
  const momentDate = moment(new Date(timestamp));

  // Check if the date is between the start and end of the previous week
  return momentDate.isBetween(previousWeekStart, previousWeekEnd, null, '[]');
}