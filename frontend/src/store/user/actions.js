export const STORE_TRIP = 'STORE_TRIP';

// action for store trip list of specific user
<<<<<<< HEAD
export const storeTrip = (ownTrip) => {
  console.log('action storeTrip')
  console.log("user action executed")
=======
export const storeTrip = (mytrips) => {
>>>>>>> 5a75129ed11d868571939d06e8d32c6b56d022c9
  return {
    type: STORE_TRIP,
    mytrips : mytrips,
  }
}

export const STORE_TRIP_ID = 'STORE_TRIP_ID';

// action for save trip ID in state
export const storeTripId = (tripID, tripTitle) => {
  return {
    type: STORE_TRIP_ID,
    tripID,
    tripTitle
  }
}
