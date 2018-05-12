export const STORE_TRIP = 'STORE_TRIP';

// action for store trip list of specific user
export const storeTrip = (ownTrip) => {
  console.log('action storeTrip')
  return {
    type: STORE_TRIP,
    ownTrip: ownTrip
  }
}

export const STORE_TRIP_ID = 'STORE_TRIP_ID';

// action for save trip ID in state
export const storeTripId = (tripID) => {
  console.log('action storeTripId')
  return {
    type: STORE_TRIP_ID,
    tripID
  }
}
