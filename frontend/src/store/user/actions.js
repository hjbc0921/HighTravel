export const STORE_TRIP = 'STORE_TRIP';

export const storeTrip = (ownTrip) => {
  console.log('action storeTrip')
  return {
    type: STORE_TRIP,
    ownTrip: ownTrip
  }
}
