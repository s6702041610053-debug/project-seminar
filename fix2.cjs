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

// PresentationDashboard
replaceInFile(path.join(basePath, 'instructor', 'PresentationDashboard.tsx'), [
    ['return getPresentationLevelDistribution();', 'return getPresentationLevelDistribution().map(d => ({ name: d.level, value: d.count, color: d.color }));'],
    ['<BarChartComponent data={scoreDistributionData} />', '<BarChartComponent data={scoreDistributionData} xKey="name" bars={[{key: "0-49", name: "0-49", color: "#ef4444"}, {key: "50-59", name: "50-59", color: "#f97316"}, {key: "60-69", name: "60-69", color: "#eab308"}, {key: "70-79", name: "70-79", color: "#3b82f6"}, {key: "80-89", name: "80-89", color: "#22c55e"}, {key: "90-100", name: "90-100", color: "#15803d"}]} />']
]);

// ProjectTracking
replaceInFile(path.join(basePath, 'instructor', 'ProjectTracking.tsx'), [
    ['project.titleTh', 'project.title'],
    ['project.projectId', 'project.id'],
    ['project.overallProgress', 'project.progress'],
    ['project.updatedAt', '"2026-09-06"']
]);

// RiskScoreDashboard
replaceInFile(path.join(basePath, 'instructor', 'RiskScoreDashboard.tsx'), [
    [' ', ''],
    ['student.firstName', 'student.name'],
    ['item.riskScore', 'item.totalScore'],
    ['item.riskLevel', 'item.finalLevel'],
    ['summary.lowRiskCount', 'summary.lowRisk'],
    ['summary.lowRiskPercentage', 'summary.lowPercentage'],
    ['summary.mediumRiskCount', 'summary.mediumRisk'],
    ['summary.mediumRiskPercentage', 'summary.mediumPercentage'],
    ['summary.highRiskCount', 'summary.highRisk'],
    ['summary.highRiskPercentage', 'summary.highPercentage'],
    ['return getRiskLevelDistribution();', 'return getRiskLevelDistribution().map(d => ({ name: d.level, value: d.count, color: d.color }));'],
    ['<BarChartComponent data={riskFactorsData} />', '<BarChartComponent data={riskFactorsData} xKey="factor" bars={[{key: "count", name: "จำนวนนักศึกษา", color: "#ef4444"}]} />']
]);

console.log('Additional Replacements done.');
