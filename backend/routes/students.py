from flask import Blueprint, request, jsonify
from app.models import Student
from app import db

bp = Blueprint('students', __name__)

@bp.route('/', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in students]), 200

@bp.route('/', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_student = Student(name=name)
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": "Student added successfully", "id": new_student.id}), 201

@bp.route('/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted successfully"}), 200
