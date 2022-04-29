// для login.js
export const check_auth_url = 'http://194.67.109.190:82/accounts/api-token-auth/'
export const register_url = 'http://194.67.109.190:82/accounts/register/'

// user_database for database.js
export const user_database = 'http://194.67.109.190:82/api/v1/user_database/'

// post deck, + carddecks + userdeck, user_actions: post_deck
export const post_deck = 'http://194.67.109.190:82/api/v1/decks/'

// patch user_resource
export const user_resource = 'http://194.67.109.190:82/api/v1/user_resource/'

// craft card, means POST user:id, card:id
export const craft_card = 'http://194.67.109.190:82/api/v1/patchcards/craft_user_cards/'
export const mill_card = 'http://194.67.109.190:82/api/v1/patchcards/mill_user_cards/'
export const craft_leader = 'http://194.67.109.190:82/api/v1/patchleaders/craft_user_leaders/'
export const mill_leader = 'http://194.67.109.190:82/api/v1/patchleaders/mill_user_leaders/'

// для рандомного сбора уровня для страницы levels
export const all_enemies = 'http://194.67.109.190:82/api/v1/enemies/'
export const all_enemy_leaders = 'http://194.67.109.190:82/api/v1/enemy_leaders/'


// А ВОТ ЭТО ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ
// export const check_auth_url = 'http://127.0.0.1:8000/accounts/api-token-auth/'
// export const register_url = 'http://127.0.0.1:8000/accounts/register/'
// export const user_database = 'http://127.0.0.1:8000/api/v1/user_database/'
// export const post_deck = 'http://127.0.0.1:8000/api/v1/decks/'
// export const pay_resource = 'http://127.0.0.1:8000/api/v1/user_resource/'
// export const craft_card = 'http://127.0.0.1:8000/api/v1/patchcards/craft_user_cards/'
// export const mill_card = 'http://127.0.0.1:8000/api/v1/patchcards/mill_user_cards/'
// export const craft_leader = 'http://127.0.0.1:80002/api/v1/patchleaders/craft_user_leaders/'
// export const mill_leader = 'http://127.0.0.1:8000/api/v1/patchleaders/mill_user_leaders/'
// export const all_enemies = 'http://127.0.0.1:8000/api/v1/enemies/'
// export const all_enemy_leaders = 'http://127.0.0.1:8000/api/v1/enemy_leaders/'