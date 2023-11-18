from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/Todo_db'
db = SQLAlchemy(app)


# Define the Todo model
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(512), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Item: {self.title}"
    
    def __init__(self, title, description):
        self.title = title
        self.description = description

def format_todo(todo):
    return {
        "id": todo.id,
        "title": todo.title,
        "description": todo.description,
        "completed": todo.completed,
        "created_at": todo.created_at
    }

@app.route('/api/todos', methods=['POST'])
def create_todo():
    title = request.json['title']
    description = request.json['description']
    todo = Todo(title, description)
    db.session.add(todo)
    db.session.commit()
    return format_todo(todo)

@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.order_by(Todo.id.asc()).all()
    todo_list = []
    for todo in todos:
        todo_list.append(format_todo(todo))
    return {
        "todos": todo_list
    }

@app.route('/api/todos/<id>', methods=['DELETE'])
def delete_event(id):
    todos = Todo.query.filter_by(id=id).one()
    db.session.delete(todos)
    db.session.commit()
    return f'Deleted todo id: {id}'

@app.route('/api/todos/<id>', methods=['PUT'])
def update_todo(id):
    todo = Todo.query.filter_by(id=id).one()
    
    data = request.json
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.completed = data.get('completed', todo.completed)

    db.session.commit()
    return f'Updated todo id: {id}'

if __name__ == '__main__':
    app.run(debug=True)
