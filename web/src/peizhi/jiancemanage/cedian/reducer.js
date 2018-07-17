


export default function reducer(state, action) {
    switch (action.type) {
        default:
          return Object.assign(
              {},
              state,
              {
                ...action.data,
              }
      )
    }
}
