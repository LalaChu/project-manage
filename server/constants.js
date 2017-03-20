//项目和工作分类：未开始 进行中 延期 已完成／审查 审批未通过？
// 任务：未开始 进行中 待审查 已审查／完成  延期  审批未通过？

var ProjectState = {
    toBeStarted: 'TOBESTARTED',
    doing: 'DOING',
    done: 'DONE',
    toBeReviewed: 'TOBEREVIEWED',
    notPassed: 'NOTPASSED',
    delay: 'DELAY'
}

module.exports = ProjectState;
