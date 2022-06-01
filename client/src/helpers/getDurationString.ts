import { formatDuration, intervalToDuration } from 'date-fns'
import { ru } from 'date-fns/locale'

export function getDurationString(value: number) {
    const duration = intervalToDuration({
        start: 0,
        end: value,
    })
    let result = ''
    if (duration.hours) {
        result = `${duration.hours} ч ${duration.minutes} мин`
    } else if (duration.minutes) {
        result = `${duration.minutes} мин ${duration.seconds} с`
    } else {
        result = formatDuration(duration, {
            format: ['seconds'],
            locale: ru,
        })
    }
    return result
}
