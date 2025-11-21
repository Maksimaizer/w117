


export function useForecastLabels(dt: number, timezone: number) {
     // переводим timestamp + timezone → локальное время
     const now = new Date((dt + timezone) * 1000);

   
     //  Формат времени (12 часов вперёд)
     const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
       hour: "2-digit",
       minute: "2-digit",
       timeZone: "UTC"
     });

     const currentTime = timeFormatter.format(now);
   
     const hours: string[] = [];
     for (let i = 0; i < 12; i++) {
       const d = new Date(now);
       d.setHours(now.getHours() + i, 0, 0, 0);
       hours.push(timeFormatter.format(d));
     }
   
     //  Формат дней (14 дней вперёд)
     const dayFormatter = new Intl.DateTimeFormat("ru-RU", {
       weekday: "short",
       day: "numeric",
       timeZone: "UTC"
     });
   
     const days: string[] = [];
     for (let i = 0; i < 14; i++) {
       const d = new Date(now);
       d.setDate(now.getDate() + i);
       const formatted = dayFormatter.format(d);
       const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
       days.push(capitalized);
     }

   
     return { hours, days, currentTime };
   }