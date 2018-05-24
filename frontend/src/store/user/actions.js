export const STORE_TRIP = 'STORE_TRIP';

// action for store trip list of specific use
export const storeTrip = (mytrips) => {
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
