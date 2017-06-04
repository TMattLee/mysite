export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_UP = 'MOVE_UP';
export const LOAD_MAP = 'LOAD_MAP';
export const MAP_UPDATE = 'MAP_UPDATE';


export const DAMAGE_PLAYER = 'DAMAGE_PLAYER';
export const DAMAGE_ENEMY = 'DAMAGE_ENEMY';

export const DELETE_ITEM = 'DELETE_ITEM';

export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_ENEMY = 'ADD_ENEMY';
export const ADD_ITEM = 'ADD_ITEM';
export const PICK_UP_ITEM = 'PICK_UP_ITEM';
export const ADD_MAP = 'ADD_MAP';

export const RESET_GAME = 'RESET_GAME';
export const TOGGLE = 'TOGGLE';


export const load_map = () =>({
  type: 				LOAD_MAP,
})

export const moveRight = (prev) => ({
	type: 				MOVE_RIGHT,
	prev_i:				prev[0],
	prev_j:				prev[1],
});
export const moveLeft = (prev) => ({
	type: 				MOVE_LEFT,
	prev_i:				prev[0],
	prev_j:				prev[1],
});
export const moveDown = (prev) => ({
	type: 				MOVE_DOWN,
	prev_i:				prev[0],
	prev_j:				prev[1],
});

export const moveUp = (prev) => ({
	type: 				MOVE_UP,
	prev_i:				prev[0],
	prev_j:				prev[1],
});

export const damageEnemy = (enemyId, i, j) => ({
	type: 				DAMAGE_ENEMY,
	id:						enemyId,
	pos_i:						i,
	pos_j:						j,
});



export const damagePlayer = (enemyId) => ({
	type:					DAMAGE_PLAYER,
	id: 					enemyId,
});

export const addEnemy = (enemyId, i, j, kind) => ({
	type: 			  ADD_ENEMY,
	id:						enemyId,
	health: 			50,
	position: 		[i,j],
	kind:					kind,
	level:				Math.floor(Math.random()*3 + 1),
	exp:					20,
});

export const addItem = (itemId, i, j, item) => ({
	type:					ADD_ITEM,
	health: 			1,
	id:						itemId,
	name: 				item.name,
	label:				item.label,
	attack: 			item.attack,
	position: 		[i,j],
	kind: 				item.kind,
});

export const pickUpItem = (itemId, i, j) => ({
	type: 				PICK_UP_ITEM,
	id:						itemId,
	pos_i:						i,
	pos_j:						j,
});

export const deleteItem = (itemId) => ({
	type: 				DELETE_ITEM,
	id:						itemId,
});

export const addMap = (mapArr) => ({
	type: 				ADD_MAP,
	map:			  	mapArr,
});

export const resetGame = () => ({
	type:					RESET_GAME,
});


export const toggle = () => ({
	type:					TOGGLE,
});

export const mapUpdate = (i, j, kind) => ({
	type:					MAP_UPDATE,
	kind:					kind,
	position:			[i,j],
});

