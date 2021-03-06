Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute("value");

var MyComponent = Vue.extend({

	el: function() {
		return '#texts';
	},

	data: function() {
		return {
			texts: [],
			error: false,
			text: {
				title: '',
				content: ''
			},
			validationErrors: {
				title: '',
				content: ''
			},
			editedId: null,
			textBeforeEdit: {
				title: '',
				content: ''
			},
		};
	},

	computed: {
		editing: function() {
			return (this.editedId !== null);
		}
	},

	ready: function() {
		this.fetchTexts();
	},

	methods: {
		fetchTexts: function() {
			this.$http.get('/api/texts').then(function(response) {
				// success callback
				this.texts = response.json();
			}, function(response) {
				// error callback
				this.error = true;
			});
		},

		store: function() {
			this.$http.post('/api/texts', this.text).then(function(response) {
				this.texts.push(response.json());
				this.text = { 
					title: '', 
					content: ''
				};
				this.validationErrors = {title: '', content: ''};
			}, function(response) {
				if (response.status == 422) {
					content = response.json();
					this.validationErrors.title = content.title;
					this.validationErrors.content = content.content;
				}
			});
		},

		edit: function(item) {
			this.textBeforeEdit.title = item.title;
			this.textBeforeEdit.content = item.content;
			this.editedId = item.id;
		},

		update: function(item) {
			this.$http.put('/api/texts/' + item.id, item).then(function(response) {
				this.editedId = null;
				this.validationErrors = {title: '', content: ''};
			}, function(response) {
				if (response.status == 422) {
					content = response.json();
					this.validationErrors.title = content.title;
					this.validationErrors.content = content.content;
				} else {
					item.title = this.textBeforeEdit.title;
					item.content = this.textBeforeEdit.content;
					this.editedId = null;
				}
			});
		},

		destroy: function(item) {
			this.$http.delete('/api/texts/' + item.id).then(function(response) {
				index = this.texts.indexOf(item);
				this.texts.splice(index, 1);
			});
		},

		isEditing: function(item) {
			return (item.id === this.editedId);
		}
	}
});

var app = new MyComponent();
