const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src', 'pages');

function replaceInFile(filePath, replacements) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        for (const [oldStr, newStr] of replacements) {
            content = content.split(oldStr).join(newStr);
        }
        fs.writeFileSync(filePath, content, 'utf-8');
    } catch (e) {
        console.error('Error processing', filePath, e);
    }
}

// 1. StudentDetail.tsx
replaceInFile(path.join(basePath, 'instructor', 'StudentDetail.tsx'), [
    ['project.projectId', 'project.id'],
    ['getScoreLevel()', 'getScoreLevel(0)'],
    ['student.academicYear', 'student.year'],
    ['project.titleTh', 'project.title'],
    ['riskData?.level', 'riskData?.finalLevel'],
    ['riskData?.score', 'riskData?.totalScore'],
    ['project.overallProgress', 'project.progress'],
    ['riskData?.level === "High"', 'riskData?.finalLevel === "high_risk"'],
    ['riskData?.level === "Medium"', 'riskData?.finalLevel === "medium_risk"']
]);

// 2. StudentList.tsx
replaceInFile(path.join(basePath, 'instructor', 'StudentList.tsx'), [
    ['project?.projectId', 'project?.id'],
    ['getScoreLevel()', 'getScoreLevel(0)'],
    ['project?.titleTh', 'project?.title'],
    ['riskData?.level', 'riskData?.finalLevel'],
    ['riskData?.trend', 'riskData?.trend']
]);

// 3. MyCalendar.tsx
replaceInFile(path.join(basePath, 'student', 'MyCalendar.tsx'), [
    ['event.time', 'event.description'],
    ['event.location', 'event.description']
]);

// 4. MyDocuments.tsx
replaceInFile(path.join(basePath, 'student', 'MyDocuments.tsx'), [
    ['doc.title', 'doc.name'],
    ["doc.type === 'report'", "doc.type === 'progress_report'"],
    ["doc.type === 'presentation'", "doc.type === 'proposal'"]
]);

// 5. MyNotifications.tsx
replaceInFile(path.join(basePath, 'student', 'MyNotifications.tsx'), [
    ["n.role === 'student' || n.role === 'all'", "n.targetRole === 'student'"],
    ["n.role === 'student'", "n.targetRole === 'student'"],
    ["n.role", "n.targetRole"]
]);

// 6. MyPresentation.tsx
replaceInFile(path.join(basePath, 'student', 'MyPresentation.tsx'), [
    ['PRESENTATION_LEVELS[assessment.status]', 'PRESENTATION_LEVELS.find(l => l.level === assessment.status)'],
    ['assessment.round', 'assessment.presentationNumber'],
    ['assessment.score', 'assessment.percentage'],
    ['assessment.date', 'assessment.assessedDate']
]);

// 7. MyProject.tsx
replaceInFile(path.join(basePath, 'student', 'MyProject.tsx'), [
    ['step.id', 'index'],
    ['step.name', 'step']
]);

// 8. MyRiskScore.tsx
replaceInFile(path.join(basePath, 'student', 'MyRiskScore.tsx'), [
    ['score.score', 'score.percentage']
]);

// 9. MyWeeklyProgress.tsx
replaceInFile(path.join(basePath, 'student', 'MyWeeklyProgress.tsx'), [
    ['score.score', 'score.percentage'],
    ['score.status', 'score.submissionStatus'],
    ['calculateWeeklyAverage(scores)', 'calculateWeeklyAverage(scores.map(s => s.percentage))'],
    ['analyzeTrend(scores)', 'analyzeTrend(scores.map(s => s.percentage))']
]);

// 10. StudentDashboard.tsx
replaceInFile(path.join(basePath, 'student', 'StudentDashboard.tsx'), [
    ['score.score', 'score.percentage'],
    ["n.role === 'student' || n.role === 'all'", "n.targetRole === 'student'"],
    ["n.role === 'student'", "n.targetRole === 'student'"],
    ["n.role", "n.targetRole"],
    ["trend === 'up'", "trend === 'improving'"],
    ["trend === 'down'", "trend === 'declining'"],
    ['analyzeTrend(scores)', 'analyzeTrend(scores.map(s => s.percentage))']
]);

// 11. StudentSettings.tsx
replaceInFile(path.join(basePath, 'student', 'StudentSettings.tsx'), [
    ['student.section', 'student.group']
]);

console.log('JS Replacements done.');
