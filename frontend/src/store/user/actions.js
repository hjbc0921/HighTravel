export const STORE_TRIP = 'STORE_TRIP';

// action for store trip list of specific user
export const storeTrip = (tripIDs,titles) => {
  console.log('action storeTrip')
  return {
    type: STORE_TRIP,
    tripIDs: tripIDs,
    titles: titles
  }
}

export const STORE_TRIP_ID = 'STORE_TRIP_ID';

// action for save trip ID in state
export const storeTripId = (tripID, tripTitle) => {
  console.log('action storeTripId')
  return {
    type: STORE_TRIP_ID,
    tripID,
    tripTitle
  }
}
