export const POST_SCHEDULE_REQUEST = 'POST_SCHEDULE_REQUEST'
export const POST_SCHEDULE_SUCCESS = 'POST_SCHEDULE_SUCCESS'
export const POST_SCHEDULE_FAIL = 'POST_SCHEDULE_FAIL'
export const DELETE_SCHEDULE_REQUEST = 'DELETE_SCHEDULE_REQUEST'
export const CHANGE_SCHEDULE_CONTENT = "CHANGE_SCHEDULE_CONTENT"
export const PATCH_SCHEDULE_FAIL = "PATCH_SCHEDULE_FAIL"
export const PATCH_SCHEDULE_SUCCESS = "PATCH_SCHEDULE_SUCCESS"

// action for server communication (send POST to server)
export const postScheduleRequest = (contents,since,until) => {
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
    return {
        type: 'STORE_SCHEDULE',
        schedules: schedules
    }
}

// action for server communication (send Delete to server)
export const deleteScheduleRequest = (scheIDs) => {
    return {
        type: DELETE_SCHEDULE_REQUEST,
        scheIDs
    }
}

// action for patch
export const changeScheduleContent = (idUpdatedRow) => {
  return {
  type : CHANGE_SCHEDULE_CONTENT,
  idUpdatedRow
  }
}

export const patchscheduleFail = () => {
  return{
    type : PATCH_SCHEDULE_FAIL,
  }
}

export const patchscheduleSuc = () => {
  return {
    type : PATCH_SCHEDULE_SUCCESS,
  }
}
