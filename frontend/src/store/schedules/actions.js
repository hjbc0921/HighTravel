export const POST_SCHEDULE_REQUEST = 'POST_SCHEDULE_REQUEST';

// action for server communication (send POST to server)
export const postScheduleRequest = (contents,since,until) => {
    console.log('action of post schedule')
    console.log(contents)
   return {
     type: POST_SCHEDULE_REQUEST,
     contents,
     since,
     until
   }
}

export const STORE_SCHEDULE = 'STORE_SCHEDULE'

// action for load schedules and strore them
export const storeSchedule = (schedules) => {
    console.log('action stroeSchedule')
    return {
        type: 'STORE_SCHEDULE',
        schedules: schedules
    }
}

