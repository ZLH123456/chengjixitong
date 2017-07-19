"use strict";
let allStudent=[];
let printStudentList=[];

const  readlineSync=require('readline-sync');
function buildTheStudent(inputStudentList) {
    let theStudent = {
        name : '',
        ID : '',
        nation : '',
        class : '',
        Math : 0,
        Chinese : 0,
        English : 0,
        Programing : 0,
        averScore : 0,
        totalScore : 0
    };
    theStudent.name = inputStudentList[0];
    theStudent.ID = inputStudentList[1];
    theStudent.nation = inputStudentList[2];
    theStudent.class = inputStudentList[3];
    for (let i = 4; i < inputStudentList.length; i ++){
        let subjectArray = inputStudentList[i].split(':');
        let subjectName = subjectArray[0];
        let subjectScore = parseInt(subjectArray[1]);
        if(subjectName === 'Math'){
            theStudent.Math = subjectScore;
        }else if(subjectName === 'Chinese'){
            theStudent.Chinese = subjectScore;
        }else if(subjectName === 'English'){
            theStudent.English = subjectScore;
        }else if(subjectName === 'Programing'){
            theStudent.Programing = subjectScore;
        }
    }
    theStudent.totalScore = theStudent.Math + theStudent.Chinese + theStudent.English + theStudent.Programing;
    theStudent.averScore = theStudent.totalScore / 4;
    allStudent.push(theStudent);

    return theStudent;
}
function caculateClassAverTotalScore() {
    let classTotalScore = 0;
    for (let i in allStudent){
        classTotalScore += allStudent[i].totalScore;
    }
    return classTotalScore / allStudent.length;
}

function caculateClassMedian() {
    let prePointList = [];
    let pointList = [];
    let classMedian = 0;
    for (let i in allStudent){
        prePointList.push(allStudent[i].totalScore);
    }
    pointList = prePointList.sort();
    let listMedian = parseInt(pointList.length / 2);
    if(pointList.length % 2 !== 0){
        classMedian = pointList[listMedian];
    }else {
        classMedian = (pointList[listMedian - 1] + pointList[listMedian]) / 2;
    }
    return classMedian;
}
function  buildPrintList(stuIDList) {
    for(let i in stuIDList){
        for(let j in allStudent){
            if(stuIDList[i]===allStudent[j].ID){
                printStudentList.push(allStudent[j])
            }
        }
    }for(let i=0;i<printStudentList.length-1;i++){
        for(let j=i+1;j<printStudentList.length;j++){
            if(printStudentList[i].ID===printStudentList[j].ID){
                printStudentList.splice(j,1);
            }
        }
    }

    return printStudentList;
}
function whetherStuIDcorrect(stuIDList) {
    buildPrintList(stuIDList);
    if(!(stuIDList.length)){
        return false;
    }
    else if(!(printStudentList.length)){
        return false;
    }
    return true;
}
function printList() {
    let str = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
========================\n`;
    for (let i in printStudentList){
        str += `${printStudentList[i].name} | ${printStudentList[i].Math} | ${printStudentList[i].Chinese} | ${printStudentList[i].English} | ${printStudentList[i].Programing} | ${printStudentList[i].averScore} | ${printStudentList[i].totalScore}\n`;
    }
    str += `========================
全班总分平均数：${caculateClassAverTotalScore()}
全班总分中位数：${caculateClassMedian()}`;
    console.log(str);
}
function  whetherInputFormCorrect(inputStudentList) {
    if(inputStudentList.length!==8){
        return false;
    }
    for(let i=4;i<inputStudentList.length;i++){
        let subjectArray=inputStudentList[i].split(':');
        let subjectName=subjectArray[0];
        let subjectScore=parseInt(subjectArray[1]);
        if(subjectArray.length!==2){
            return false;
        }else if(!(subjectName === 'Math' || subjectName === 'Chinese' || subjectName === 'English' || subjectName === 'Programing')){
            return false;
        }else if(!(subjectScore>=0&&subjectScore<=100)){
            return false;
        }
    }
    for(let j=0;j<allStudent.length;j++){
        if(inputStudentList.indexOf(allStudent[j].ID)!==-1){
            return false;
        }
    }
    return true;
}
function  index() {
console.log('1.添加学生\n2.生成成绩单\n3.退出\n输入你的选择(1~3)');
let choseNumber=readlineSync.keyIn('请输入',{limit:'$<1-3>'});
if(choseNumber==='1'){
    let inputMessage=readlineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
    let inputStudentList=inputMessage.split(',');
    if(whetherInputFormCorrect(inputStudentList)){
        buildTheStudent(inputStudentList);
        console.log(`学生${inputStudentList[0]}已经被添加`);
        index();
    }else{
        inputMessage=readlineSync.question('请按正确格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：')
        inputStudentList=inputMessage.split(',');
        if(whetherInputFormCorrect(inputStudentList)){
            buildTheStudent(inputStudentList);
            console.log(`学生${inputStudentList[0]}已经被添加`);
            index();
        }
    }
}
else if(choseNumber==='2'){
    let inputPrintedStuID=readlineSync.question( '请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    let stuIDList=inputPrintedStuID.split(',');
    if(whetherStuIDcorrect(stuIDList)){
        printList();
        index();
    }else{
        inputPrintedStuID=readlineSync.question( '请输入正确的格式（格式： 学号, 学号,...），按回车提交：');
    }
   }else if(choseNumber==='3'){

}

}
index();