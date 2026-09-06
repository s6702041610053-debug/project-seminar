import os

base_path = r'd:\CED13 KMUTNB\CED 3-69\project-seminar\student-project-tracking\src\pages'

def replace_in_file(path, replacements):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old, new in replacements:
            content = content.replace(old, new)
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Error processing {path}: {e}")

# 1. StudentDetail.tsx
replace_in_file(os.path.join(base_path, 'instructor', 'StudentDetail.tsx'), [
    ('project.projectId', 'project.id'),
    ('getScoreLevel()', 'getScoreLevel(0)'),
    ('student.academicYear', 'student.year'),
    ('project.titleTh', 'project.title'),
    ('studentRiskSummary?.level', 'studentRiskScore?.finalLevel'),
    ('studentRiskSummary?.score', 'studentRiskScore?.totalScore'),
    ('project.overallProgress', 'project.progress')
])

# 2. StudentList.tsx
replace_in_file(os.path.join(base_path, 'instructor', 'StudentList.tsx'), [
    ('project?.projectId', 'project?.id'),
    ('getScoreLevel()', 'getScoreLevel(0)'),
    ('project?.titleTh', 'project?.title'),
    ('risk?.level', 'risk?.finalLevel'),
    ('risk?.trend', 'risk?.trend')
])

# 3. MyCalendar.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyCalendar.tsx'), [
    ('event.time', 'event.description'),
    ('event.location', 'event.description')
])

# 4. MyDocuments.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyDocuments.tsx'), [
    ('doc.title', 'doc.name'),
    ("doc.type === 'report'", "doc.type === 'progress_report'"),
    ("doc.type === 'presentation'", "doc.type === 'proposal'")
])

# 5. MyNotifications.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyNotifications.tsx'), [
    ('n.role', 'n.targetRole')
])

# 6. MyPresentation.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyPresentation.tsx'), [
    ('PRESENTATION_LEVELS[assessment.status]', 'PRESENTATION_LEVELS.find(l => l.level === assessment.status)'),
    ('assessment.round', 'assessment.presentationNumber'),
    ('assessment.score', 'assessment.percentage'),
    ('assessment.date', 'assessment.assessedDate')
])

# 7. MyProject.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyProject.tsx'), [
    ('step.id', 'index'),
    ('step.name', 'step')
])

# 8. MyRiskScore.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyRiskScore.tsx'), [
    ('score.score', 'score.percentage')
])

# 9. MyWeeklyProgress.tsx
replace_in_file(os.path.join(base_path, 'student', 'MyWeeklyProgress.tsx'), [
    ('score.score', 'score.percentage'),
    ('score.status', 'score.submissionStatus')
])

# 10. StudentDashboard.tsx
replace_in_file(os.path.join(base_path, 'student', 'StudentDashboard.tsx'), [
    ('score.score', 'score.percentage'),
    ('n.role', 'n.targetRole'),
    ("trend === 'up'", "trend === 'improving'"),
    ("trend === 'down'", "trend === 'declining'")
])

# 11. StudentSettings.tsx
replace_in_file(os.path.join(base_path, 'student', 'StudentSettings.tsx'), [
    ('student.section', 'student.group')
])

print("Replacements done.")
