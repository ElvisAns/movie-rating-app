// useLocalStorage.js

export default function useLocalStorageEngine(key, initialValue) {
  // ... implementation of browser storage logic ...
  return {
    update_local_store: (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    get_full_list: () => {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue
    },
    get_meta: () => {
      return Object.values(JSON.parse(localStorage.getItem(key)) ?? [])
    },
    add_to_local_list: (list) => {
      const to_save = JSON.parse(localStorage.getItem(key)) ?? initialValue
      for (let i = 0; i < list.length; i++) {
        const existing = list[i]
        if (to_save[list[i]['imdbID']]) {
          if ('user_rating' in to_save[list[i]['imdbID']]) {
            //preserve the user rating
            existing['user_rating'] = to_save[list[i]['imdbID']]['user_rating']
          }
          if ('user_review' in to_save[list[i]['imdbID']]) {
            //preserve the user review
            existing['user_review'] = to_save[list[i]['imdbID']]['user_review']
          }
        }
        to_save[list[i]['imdbID']] = existing
      }
      return to_save
    }
  }
}
