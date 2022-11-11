const API_URL = process.env.VUE_APP_API_URL

// для login.js
export const check_auth_url = `${API_URL}/accounts/api-token-auth/`
export const register_url = `${API_URL}/accounts/register/`

// user_database for database.js
export const user_database = `${API_URL}/api/v1/user_database/`

// post deck, + carddecks + userdeck, user_actions: post_deck
export const post_deck = `${API_URL}/api/v1/decks/`

// patch user_resource
export const user_resource = `${API_URL}/api/v1/user_resource/`

// craft card, means POST user:id, card:id
export const craft_card = `${API_URL}/api/v1/patchcards/craft_user_cards/`
export const mill_card = `${API_URL}/api/v1/patchcards/mill_user_cards/`
export const craft_leader = `${API_URL}/api/v1/patchleaders/craft_user_leaders/`
export const mill_leader = `${API_URL}u/api/v1/patchleaders/mill_user_leaders/`

// для получения новостей
export const all_news = `${API_URL}/api/v1/news/`

// PATCH запрос - пришло finished_levels - открытие уровней, не пришло - сброс (нужен id записи UserLevel)
export const patch_levels = `${API_URL}/api/v1/unlock_levels/`
