$(function() {

function randomString() {
	let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	let str = '';
	for (let i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

//...................................................

function Column(name) {
	var self = this;
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		// Create column elements
		var $column = $('<div>').addClass('column');
		var $columnHeader = $('<div>').addClass('column__header');
		var $columnTitle = $('<h2>').addClass('title').text(self.name);
		var $columnCardList = $('<ul>').addClass('card-list');
		var $columnDelete = $('<button>').addClass('btn btn-delete').text('Delete column');
		var $columnAddCard = $('<button>').addClass('btn btn-add').text('+');
		var $columnForm = $('<div>').addClass('select-wrapper');
		var $columnSelect = $('<select>').addClass('select select__add');
		var $columnOption = $('<option>').addClass('select__option');

		// Watch column creation buttons
		$columnDelete.click(function() {
			self.removeColumn();
		});
		$columnAddCard.click(function() {
			self.addCard(new Card(prompt('Enter the name of the card')));
		});

		// Append column
		$columnSelect.append($columnOption.text('High priority'))
			.append($columnOption.clone().text('Normal priority'))
			.append($columnOption.clone().text('Low priority'));
		$columnForm.append($columnSelect).append($columnAddCard);
		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnForm)
			.append($columnCardList);

		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};

//.......................................................

function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard(name) {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card__description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn btn-delete').text('x');

		$cardDelete.click(function() {
			self.removeCard();
		});

		$card.append($cardDescription)
			.append($cardDelete);
		return $card;
	}
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

//.......................................................

var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

function initSortable() {
	$('.card-list').sortable({
		connectWith: '.card-list',
		placeholder: 'card__placeholder'
	}).disableSelection();
}

$('.create-column').click(function() {
	var name = prompt('Enter a column name:');
	var column = new Column(name);
	board.addColumn(column);
});

//..............................................

var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

todoColumn.addCard(card1);
doingColumn.addCard(card2);

//................................................
//END
});