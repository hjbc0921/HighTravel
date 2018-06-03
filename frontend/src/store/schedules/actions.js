export const POST_SCHEDULE_REQUEST = 'POST_SCHEDULE_REQUEST';
export const POST_SCHEDULE_SUCCESS = 'POST_SCHEDULE_SUCCESS'
export const POST_SCHEDULE_FAIL = 'POST_SCHEDULE_FAIL'

// action for server communication (send POST to server)
export const postScheduleRequest = (contents,since,until) => {
console.log(contents)
   return {
     type: POST_SCHEDULE_REQUEST,
     contents,
     since,
     until
   }
}
export const postScheduleSuccess = () => {
    return{
        type : POST_SCHEDULE_SUCCESS
    }
}
export const postScheduleFail = () => {
    return{
        type : POST_SCHEDULE_FAIL
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
