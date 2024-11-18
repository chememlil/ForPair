from flask import Blueprint, jsonify
from app.models import Pairing, Student
from app import db
import random
import datetime

bp = Blueprint('pairings', __name__)

@bp.route('/', methods=['POST'])
def pair_students():
    students = Student.query.all()
    if len(students) < 2:
        return jsonify({"error": "Not enough students to create pairs"}), 400

    student_ids = [s.id for s in students]
    random.shuffle(student_ids)

    pairs = []
    while len(student_ids) >= 2:
        student1 = student_ids.pop()
        student2 = student_ids.pop()
        new_pair = Pairing(student1_id=student1, student2_id=student2, week_number=datetime.date.today().isocalendar()[1])
        db.session.add(new_pair)
        pairs.append({"student1": student1, "student2": student2})

    db.session.commit()
    return jsonify({"message": "Pairs created successfully", "pairs": pairs}), 201

@bp.route('/', methods=['GET'])
def get_pairings():
    pairings = Pairing.query.all()
    return jsonify([
        {
            "id": p.id,
            "student1_id": p.student1_id,
            "student2_id": p.student2_id,
            "week_number": p.week_number,
            "created_at": p.created_at
        }
        for p in pairings
    ]), 200
